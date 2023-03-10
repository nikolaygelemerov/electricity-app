import { GraphQLObjectType, GraphQLString } from 'graphql';
import Bigint from 'graphql-type-bigint';

export const ElectricityUsageType = new GraphQLObjectType({
  fields: {
    kwh: { type: GraphQLString },
    timestamp: { type: Bigint }
  },
  name: 'ElectricityUsageType'
});
