const mongoose = require('mongoose');
const config = require('config');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');

class Mongodb {
	constructor({
		host, user, password, dbName, authenticationDatabase,
	}) {
		this.mongoose = mongoose;
		this.host = host;
		this.user = user;
		this.password = password;
		this.dbName = dbName;
		this.authenticationDatabase = authenticationDatabase;
	}

	async open() {
		await mongoose.connect(config.db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}

	async close() {
		await mongoose.connection.close();
		await mongoose.disconnect();
	}

	async drop() {
		await mongoose.connection.dropDatabase();
	}

	set(config) {
		const {
			host, user, password, dbName, authenticationDatabase,
		} = config;
		this.host = host;
		this.user = user;
		this.password = password;
		this.dbName = dbName;
		this.authenticationDatabase = authenticationDatabase;
	}

	backup() {
		if (!this.dbName) throw new Error('dbName is required and can not be null!');

		const filepath = `${config.backup}/s365-db-${moment().format('YYYYMMDDHHmmss')}.archive`;
		const command = `mongodump${this.host ? ` -h ${this.host}` : ''}${this.user ? ` -u ${this.user}` : ''}${this.password ? `-p ${this.password}` : ''}${this.user && this.password ? ` --authenticationDatabase ${this.authenticationDatabase}` : ''} -d ${this.dbName} --gzip --archive=${path.normalize(filepath)}`;

		const isExist = fs.existsSync(config.backup);
		if (!isExist) {
			fs.mkdirSync(config.backup);
		}

		childProcess.execSync(command, (err, stdout, stderr) => {
			if (err) {
				console.log(err);
				throw Error('backup failed!');
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
	}

	restore(filename) {
		if (!this.dbName) throw new Error('dbName is required and can not be null!');
		if (!filename) throw new Error('filename is required and can not be null!');

		const filepath = `${config.backup}/${filename}`;
		const command = `mongorestore${this.host ? ` -h ${this.host}` : ''}${this.user ? ` -u ${this.user}` : ''}${this.password ? ` -p ${this.password}` : ''}${this.user && this.password ? ` --authenticationDatabase ${this.authenticationDatabase}` : ''} -d ${this.dbName} --drop --gzip --archive=${path.normalize(filepath)}`;

		childProcess.execSync(command, (err, stdout, stderr) => {
			if (err) {
				console.log(err);
				throw Error('restore failed!');
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
	}
}

module.exports = new Mongodb(config);
