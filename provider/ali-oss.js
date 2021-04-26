const OSS = require('ali-oss');

let client = new OSS({
  region: "oss-cn-shanghai",
  accessKeyId: "LTAI5tScSjQ6QioWRXJ6VCQp",
  accessKeySecret: "woSOgJBcRek50szm8zgE8iHq5Uy0dl",
});

client.useBucket("sshome");

exports.listBuckets = async function listBuckets() {
  try {
    let result = await client.listBuckets();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

exports.list = async function list() {
  try {
    let result = await client.list({
      "max-keys": 5,
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

exports.put = async function put(name,location) {
  try {
    // 名字 + 路径
    let result = await client.put(name, location);
    // console.log(result.url);
    return result.url;
  } catch (err) {
    console.log(err);
  }
}

exports.get = async function get() {
  try {
    let result = await client.get("exampleobject");
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}


