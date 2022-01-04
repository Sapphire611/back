const app = require('./app');
const axios = require('axios');
const config = require('config');

const main = async () => {
	await app.open();
};

const cleanup = async signal => {
	console.log(`============= cleanup ${signal}`);
	await app.close();
	process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

process.on('uncaughtException', (err, origin) => {
	console.log('============= uncaughtException Fatal', { err, origin });
});

process.on('unhandledRejection', (reason, promise) => {
	console.log('============= unhandledRejection Fatal', promise, 'reason:', reason);
});

process.on('beforeExit', code => {
	console.log('============= Process beforeExit event with code: ', code);
});

process.on('exit', code => {
	console.log(`============= About to exit with code: ${code}`);
});

main().catch(error => {
	console.log('============= main catched error:', error);
	process.exit(1);
});
