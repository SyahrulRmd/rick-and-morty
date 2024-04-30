import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id,
        name,
        status,
        species,
        image
      },
    }
  }
`;

export const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
        id,
        name,
        status,
        species,
        image
    }
  }
`