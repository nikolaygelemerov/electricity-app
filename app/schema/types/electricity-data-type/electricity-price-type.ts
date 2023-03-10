import { GraphQLFloat, GraphQLObjectType, GraphQLString } from 'graphql';
import Bigint from 'graphql-type-bigint';

export const ElectricityPriceType = new GraphQLObjectType({
  fields: {
    currency: { type: GraphQLString },
    price: { type: GraphQLFloat },
    timestamp: { type: Bigint }
  },
  name: 'ElectricityPriceType'
});
