import { gql } from '@apollo/client';

export default gql`
  {
    electricityUsage {
      currency
      price
      timestamp
    }
  }
`;
