import '../constants/credentials.js';
import Azure             from '@azure/storage-blob';
import { createRequire } from 'module';
import createSpinner     from 'ora';
import path              from 'path';
import rootDir           from '../constants/rootDir.js';

const {
  Aborter,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  SharedKeyCredential,
  StorageURL,
  uploadFileToBlockBlob,
} = Azure;

const account       = process.env.AZURE_STORAGE_ACCOUNT;
const containerName = `publications`;
const key           = process.env.AZURE_STORAGE_KEY;
const require       = createRequire(import.meta.url);

async function upload() {

  const spinner = createSpinner(`Uploading PDF`);
  spinner.start();

  const uploadOptions = {
    blobHTTPHeaders: {
      blobContentType: `application/pdf`,
    },
  };

  try {

    const credential   = new SharedKeyCredential(account, key);
    const pipeline     = StorageURL.newPipeline(credential);
    const url          = `https://${account}.blob.core.windows.net`;
    const serviceURL   = new ServiceURL(url, pipeline);
    const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    const aborter      = Aborter.none;
    const filePath     = path.join(rootDir, `dissertation.pdf`);
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, filePath);

    await uploadFileToBlockBlob(aborter, filePath, blockBlobURL, uploadOptions);

  } catch (e) {

    spinner.fail(e.message);

  }

  spinner.succeed(`PDF uploaded`);

}

if (require.main === undefined) upload();

export default upload;
