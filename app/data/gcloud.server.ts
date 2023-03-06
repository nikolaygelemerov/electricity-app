/* eslint-disable @typescript-eslint/no-shadow */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { File } from '@google-cloud/storage';
import { Storage } from '@google-cloud/storage';
import JSONStream from 'JSONStream';
import MultiStream from 'multistream';
import type internal from 'stream';

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

  const data: {
    electricityPrice: ElectricityPriceData[];
    electricityUsage: ElectricityUsageData[];
  } = { electricityPrice: [], electricityUsage: [] };

  const files: {
    electricityPrice: File[];
    electricityUsage: File[];
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
      files.electricityPrice.push(priceFile);
    }

    const usageFilePath = GcloudModel.buildUsageFilePath({ day, meteringPointId, month, year });

    let usageFile;

    if (usageFilePath) {
      usageFile = bucket.file(usageFilePath);
    }

    if (usageFile) {
      files.electricityUsage.push(usageFile);
    }
  }

  const streamPromises: {
    electricityPrice: Promise<ElectricityPriceData | null>[];
    electricityUsage: Promise<ElectricityUsageData | null>[];
  } = { electricityPrice: [], electricityUsage: [] };

  const streams: internal.Readable[] = [];

  files.electricityPrice.forEach((file) => {
    streamPromises.electricityPrice.push(
      new Promise(async (resolve) => {
        const exists = await file.exists();

        if (!exists[0]) {
          resolve(null);
        } else {
          streams.push(file.createReadStream());

          resolve(null);
        }
      })
    );
  });

  files.electricityUsage.forEach((file) => {
    streamPromises.electricityUsage.push(
      new Promise(async (resolve) => {
        const exists = await file.exists();

        if (!exists[0]) {
          resolve(null);
        } else {
          streams.push(file.createReadStream());

          resolve(null);
        }
      })
    );
  });

  await Promise.all(streamPromises.electricityPrice);
  await Promise.all(streamPromises.electricityUsage);

  const stream = new MultiStream(streams);

  const priceData: ElectricityPriceData[] = [];
  const usageData: ElectricityUsageData[] = [];

  await new Promise((resolve) => {
    stream
      .pipe(JSONStream.parse('*'))
      .on('data', (data: any) => {
        console.log('data: ', data);

        if (data) {
          if (typeof data.price !== 'undefined') {
            priceData.push(data as ElectricityPriceData);
          } else if (typeof data.kwh !== 'undefined') {
            usageData.push(data as ElectricityUsageData);
          }
        }

        resolve(null);
      })
      .on('error', (err: any) => {
        console.error(err);
      })
      .on('end', () => {
        console.log('Finished reading price data');
      });
  });

  console.log('DDATTA: ', { electricityPrice: priceData, electricityUsage: usageData });

  return {
    electricityPrice: priceData,
    electricityUsage: usageData
  };
};
