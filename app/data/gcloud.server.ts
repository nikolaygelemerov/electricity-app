import { Storage } from '@google-cloud/storage';
import JSONStream from 'JSONStream';

import { GCLOUD_TOKI_BUCKET_NAME, GcloudModel } from '~/services';
import type {
  ElectricityCategory,
  ElectricityCustomerOptions,
  ElectricityUsageOptions
} from '~/types';

// Creates a client from a Google service account key
const storage = new Storage({ credentials: JSON.parse(process.env.GCLOUD_CONFIG as string) });

const bucket = storage.bucket(GCLOUD_TOKI_BUCKET_NAME);

export const readJSONLines = async <T = ElectricityCategory>(
  category: T,
  options: T extends 'usage' ? ElectricityUsageOptions : ElectricityCustomerOptions
) => {
  const fileName =
    category === 'usage'
      ? GcloudModel.buildUsageFilePath(options)
      : GcloudModel.buildCustomerFilePath(options as ElectricityCustomerOptions);

  const file = bucket.file(fileName);

  const readStream = file.createReadStream();

  const jsonLinesStream = JSONStream.parse();

  return new Promise((resolve, reject) => {
    readStream
      .pipe(jsonLinesStream)
      .on('data', function (data: unknown) {
        resolve(data);
      })
      .on('error', function (err: unknown) {
        reject(err);
      })
      .on('end', function () {
        resolve('End');
      });
  });
};
