import type { DownloadResponse } from '@google-cloud/storage';
import { Storage } from '@google-cloud/storage';

import { GCLOUD_TOKI_BUCKET_NAME, GcloudModel } from '~/services';
import type { ElectricityPriceData, ElectricityUsageData, ReadJSONLinesParams } from '~/types';

/*
bucket
  .getFiles()
  .then((results) => {
    const files = results[0];

    console.log(`Files in bucket ${GCLOUD_TOKI_BUCKET_NAME}:`);
    files.forEach((file) => {
      console.log(file.name);
    });
  })
  .catch((err) => {
    console.error(`Error listing files in bucket: ${err}`);
  });
  */

const storage = new Storage({
  credentials: JSON.parse(process.env.GCLOUD_CONFIG as string),
  timeout: 120000
});

const bucket = storage.bucket(GCLOUD_TOKI_BUCKET_NAME);

export const readJSONLines = async ({ from, meteringPointId, to }: ReadJSONLinesParams) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const promiseData: {
    electricityPrice: Promise<DownloadResponse | void>[];
    electricityUsage: Promise<DownloadResponse | void>[];
  } = { electricityPrice: [], electricityUsage: [] };

  const data: {
    electricityPrice: ElectricityPriceData[];
    electricityUsage: ElectricityUsageData[];
  } = { electricityPrice: [], electricityUsage: [] };

  for (let date = fromDate; date <= toDate; date.setDate(date.getDate() + 1)) {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const priceFilePath = GcloudModel.buildPriceFilePath({ day, meteringPointId, month, year });

    let priceFile;

    if (priceFilePath) {
      priceFile = bucket.file(priceFilePath);
    }

    if (priceFile) {
      promiseData.electricityPrice.push(
        priceFile.download().catch((err) => {
          if (err.code !== 404) {
            throw err;
          }
        })
      );
    }

    const usageFilePath = GcloudModel.buildUsageFilePath({ day, meteringPointId, month, year });

    let usageFile;

    if (usageFilePath) {
      usageFile = bucket.file(usageFilePath);
    }

    if (usageFile) {
      promiseData.electricityUsage.push(
        usageFile.download().catch((err) => {
          if (err.code !== 404) {
            throw err;
          }
        })
      );
    }
  }

  (await Promise.all(promiseData.electricityPrice)).forEach((priceFileContent) => {
    let priceData;

    if (priceFileContent && priceFileContent[0]) {
      priceData = priceFileContent[0].toString();
    }

    if (priceData) {
      const formattedData = `[${priceData.replace(/\}\n\{/g, '}, {')}]`;

      data.electricityPrice.push(...JSON.parse(formattedData));
    }
  });

  (await Promise.all(promiseData.electricityUsage)).forEach((usageFileContent) => {
    let usageData;

    if (usageFileContent && usageFileContent[0]) {
      usageData = usageFileContent[0].toString();
    }

    if (usageData) {
      const formattedData = `[${usageData.replace(/\}\n\{/g, '}, {')}]`;

      data.electricityUsage.push(...JSON.parse(formattedData));
    }
  });

  return data;
};
