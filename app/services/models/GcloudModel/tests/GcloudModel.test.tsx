import { describe, expect, it } from 'vitest';

import type { ElectricityQueryOptions } from '~/types';

import { GcloudModel } from '../GcloudModel';

describe('GcloudModel', () => {
  it('buildUsageFilePath', () => {
    const test: { expected: string; input: ElectricityQueryOptions }[] = [
      {
        expected: 'usage/2023/02/01/1234.jsonl',
        input: { day: '01', meteringPointId: '1234', month: '02', year: '2023' }
      }
    ];

    test.forEach(({ expected, input }) =>
      expect(GcloudModel.buildUsageFilePath(input)).toBe(expected)
    );
  });
});
