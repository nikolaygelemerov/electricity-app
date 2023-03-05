import { gql } from '@apollo/client';

export default gql`
  query electricityData($from: String!, $meteringPointId: String!, $to: String!) {
    electricityData(from: $from, meteringPointId: $meteringPointId, to: $to) {
      electricityUsage {
        kwh
        timestamp
      }

      electricityPrice {
        currency
        price
        timestamp
      }
    }
  }
`;
