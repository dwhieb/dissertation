import Azure             from '@azure/storage-blob';
import createSpinner     from 'ora';
import credentials       from '../constants/credentials.js';
import { fileURLToPath } from 'url';
import path              from 'path';

const {
  AZURE_STORAGE_ACCOUNT: account,
  AZURE_STORAGE_KEY: key,
} = credentials;

const {
  Aborter,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  SharedKeyCredential,
  StorageURL,
  uploadFileToBlockBlob,
} = Azure;

const currentDir = path.dirname(fileURLToPath(import.meta.url));

void async function upload() {

  const spinner = createSpinner(`Uploading PDF`).start();

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
    const containerURL = ContainerURL.fromServiceURL(serviceURL, `publications`);
    const aborter      = Aborter.none;
    const filePath     = path.join(currentDir, `../../dissertation.pdf`);
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, filePath);

    await uploadFileToBlockBlob(aborter, filePath, blockBlobURL, uploadOptions);

  } catch (e) {

    spinner.fail(e.message);

  }

  spinner.succeed(`PDF uploaded`);

}();
