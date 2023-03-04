import type { ElectricityCustomerOptions, ElectricityUsageOptions } from '~/types';

export class GcloudModel {
  static buildUsageFilePath = ({ day, month, year }: ElectricityUsageOptions) =>
    `prices/${year}/${month}/${day}.jsonl`;

  static buildCustomerFilePath = ({
    day,
    meteringPointId,
    month,
    year
  }: ElectricityCustomerOptions) => `/usage/${year}/${month}/${day}/${meteringPointId}.jsonl`;
}
