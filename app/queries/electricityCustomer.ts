import { gql } from '@apollo/client';

export default gql`
  {
    electricityCustomer {
      currency
      price
      timestamp
    }
  }
`;
