const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();

async function main() {
  console.log("Azure Blob storage v12 - JavaScript quickstart sample");

  // Quick start code goes here
  const AZURE_STORAGE_CONNECTION_STRING =
    process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error("Azure Storage Connection string not found");
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );

  // Create the container
  const containerName = "quickstart" + uuidv1();
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const createContainerResponse = await containerClient.create();
  console.log(
    "\nContainer was created successfully. requestId: ",
    createContainerResponse.requestId
  );

  // Upload blobs to a container
  const blobName = "quickstart" + uuidv1() + ".txt";
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const data = "Hello, World!";
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
  console.log(
    "\nBlob was uploaded successfully. requestId: ",
    uploadBlobResponse.requestId
  );

  // List the blob(s) in the container.
  console.log("\nListing blobs...");
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log("\t", blob.name);
  }
}

main()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
