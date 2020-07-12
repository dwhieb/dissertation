import Azure             from '@azure/storage-blob';
import createSpinner     from 'ora';
import { fileURLToPath } from 'url';
import path              from 'path';

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

  try {

    if (!process.env.AZURE_STORAGE_KEY) {
      await import(`../constants/credentials.js`);
    }

    const uploadOptions = {
      blobHTTPHeaders: {
        blobContentType: `application/pdf`,
      },
    };

    const credential   = new SharedKeyCredential(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_KEY);
    const pipeline     = StorageURL.newPipeline(credential);
    const url          = `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`;
    const serviceURL   = new ServiceURL(url, pipeline);
    const containerURL = ContainerURL.fromServiceURL(serviceURL, `publications`);
    const aborter      = Aborter.none;
    const filePath     = path.join(currentDir, `../../../dissertation.pdf`);
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, filePath);

    await uploadFileToBlockBlob(aborter, filePath, blockBlobURL, uploadOptions);

  } catch (e) {

    spinner.fail(e.message);
    throw e;

  }

  spinner.succeed(`PDF uploaded`);

}();
