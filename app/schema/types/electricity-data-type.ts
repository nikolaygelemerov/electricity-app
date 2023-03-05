import { GraphQLList, GraphQLObjectType } from 'graphql';

import { ElectricityPriceType } from './electricity-price-type';
import { ElectricityUsageType } from './electricity-usage-type';

export const ElectricityDataType = new GraphQLObjectType({
  fields: {
    electricityPrice: {
      async resolve(parentValue) {
        return parentValue?.electricityPrice;
      },
      type: new GraphQLList(ElectricityPriceType)
    },
    electricityUsage: {
      async resolve(parentValue) {
        return parentValue?.electricityUsage;
      },
      type: new GraphQLList(ElectricityUsageType)
    }
  },
  name: 'ElectricityDataType'
});
