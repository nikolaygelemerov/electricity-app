import type { ElectricityQueryOptions } from '~/types';

export class GcloudModel {
  static buildPriceFilePath = ({ day, month, year }: ElectricityQueryOptions) =>
    `prices/${year}/${month}/${day}.jsonl`;

  static buildUsageFilePath = ({ day, meteringPointId, month, year }: ElectricityQueryOptions) =>
    `usage/${year}/${month}/${day}/${meteringPointId}.jsonl`;
}
