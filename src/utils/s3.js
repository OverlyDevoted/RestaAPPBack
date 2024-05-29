const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

//function for uploading a file to s3

module.exports.uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
};


module.exports.getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME
  }
  return s3.getObject(downloadParams).createReadStream()
}
// a function for downloading a file from s3

module.exports.deleteObject = (fileKey) => {
  const deleteParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME
  }
  return s3.deleteObject(deleteParams).promise()
}