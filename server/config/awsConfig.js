AWS.config.update({
  region: "eu-central-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const s3 = new AWS.S3();

// Function to upload a file to S3
const uploadFile = async (bucketName, fileName, fileContent) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
  };

  try {
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully at ${data.Location}`);
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Function to download a file from S3
const downloadFile = async (bucketName, fileName) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
  };

  try {
    const data = await s3.getObject(params).promise();
    console.log(`File downloaded successfully: ${fileName}`);
    return data.Body;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};

module.exports = {
  uploadFile,
  downloadFile,
};
