import { GraphQLObjectType } from 'graphql';

import { getUserFromSession } from '~/data/auth.server';
import { readJSONLines } from '~/data/gcloud.server';

import { ElectricityUsageType } from './electricity-usage-type';
import { UserType } from './user-type';

export const RootQueryType = new GraphQLObjectType({
  fields: () => ({
    electricityUsage: {
      async resolve() {
        const result = await readJSONLines('usage', {
          day: '01',
          month: '01',
          year: '2022'
        } as any);

        console.log('RRRresult: ', result);

        return result;
      },
      type: ElectricityUsageType
    },
    user: {
      async resolve(parentValue, args, { req }) {
        const user = await getUserFromSession(req);

        return user;
      },
      type: UserType
    }
  }),
  name: 'RootQueryType'
});
