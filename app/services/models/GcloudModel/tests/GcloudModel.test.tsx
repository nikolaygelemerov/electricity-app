import { describe, expect, it } from 'vitest';

import type { ElectricityUsageOptions } from '~/types';

import { GcloudModel } from '../GcloudModel';

describe('GcloudModel', () => {
  it('buildUsageFilePath', () => {
    const test: { expected: string; input: ElectricityUsageOptions }[] = [
      { expected: 'prices/2023/02/01.jsonl', input: { day: '01', month: '02', year: '2023' } }
    ];

    test.forEach(({ expected, input }) =>
      expect(GcloudModel.buildUsageFilePath(input)).toBe(expected)
    );
  });
});
