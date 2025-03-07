import gql from 'graphql-tag';

export const MY_PROPOSALS_QUERY = gql`
  query MY_PROPOSALS_QUERY {
    proposalBoards {
      id
      title
      description
      creator {
        id
        username
      }
      sections {
        id
      }
      isTemplate
      createdAt
    }
  }
`;

export const PROPOSAL_BOARD_QUERY = gql`
  query PROPOSAL_BOARD_QUERY($id: ID!) {
    proposalBoard(where: { id: $id }) {
      id
      title
      slug
      description
      sections {
        id
        title
        description
        position
        cards {
          id
          title
          position
          section {
            id
          }
        }
      }
      study {
        author {
          id
          username
        }
        collaborators {
          id
          username
        }
      }
      isSubmitted
      checklist
      isTemplate
      settings
    }
  }
`;

export const BOARD_QUERY = gql`
  query BOARD_QUERY($id: ID!) {
    proposalBoard(where: { id: $id }) {
      id
      title
      slug
      description
      sections {
        id
        title
        description
        position
        cards {
          id
          title
          position
          section {
            id
          }
          settings
          assignedTo {
            username
            publicReadableId
          }
        }
      }
    }
  }
`;

export const GET_CARD_TITLES_OF_PROPOSAL_QUERY_BY_ID = gql`
  query GET_CARD_TITLES_OF_PROPOSAL_QUERY_BY_ID($id: ID!) {
    proposalBoard(where: { id: $id }) {
      id
      sections {
        id
        position
        cards {
          id
          title
          position
        }
      }
    }
  }
`;

export const PROPOSAL_TEMPLATES_QUERY = gql`
  query PROPOSAL_TEMPLATES_QUERY {
    proposalBoards(where: { isTemplate: true }) {
      id
      title
      description
      sections {
        id
        title
        description
        position
        cards {
          id
          title
          position
          section {
            id
          }
        }
      }
    }
  }
`;

export const COPY_PROPOSAL_MUTATION = gql`
  mutation COPY_PROPOSAL_MUTATION($id: ID!, $study: ID) {
    copyProposalBoard(id: $id, study: $study) {
      id
      title
      slug
      description
      sections {
        id
        title
        description
        position
        cards {
          id
          title
          position
          section {
            id
          }
        }
      }
    }
  }
`;

export const GET_CARD_CONTENT = gql`
  query GET_CARD_CONTENT($id: ID!) {
    proposalCard(where: { id: $id }) {
      id
      title
      description
      content
      comment
      settings
      assignedTo {
        id
        username
        publicReadableId
      }
    }
  }
`;
