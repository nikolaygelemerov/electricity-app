import { GraphQLObjectType, GraphQLString } from 'graphql';

import { getUserFromSession } from '~/data/auth.server';
import { readJSONLines } from '~/data/gcloud.server';

import { ElectricityDataType } from './electricity-data-type';
import { UserType } from './user-type';

export const RootQueryType = new GraphQLObjectType({
  fields: () => ({
    electricityData: {
      args: {
        from: { type: GraphQLString },
        meteringPointId: { type: GraphQLString },
        to: { type: GraphQLString }
      },
      async resolve(parentValue, { from, meteringPointId, to }) {
        const result = await readJSONLines({
          from,
          meteringPointId,
          to
        });

        return result;
      },
      type: ElectricityDataType
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
