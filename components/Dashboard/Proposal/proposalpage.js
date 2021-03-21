import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';

import Head from 'next/head';
import moment from 'moment';
import { Menu } from 'semantic-ui-react';
import Error from '../../ErrorMessage/index';

import ProposalHeader from './ProposalPage/proposalHeader';
import ProposalBoard from './Board/board';

import { StyledDasboard, StyledDevelopDasboard } from '../styles';

const PROPOSAL_BOARD_QUERY = gql`
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
          content
          section {
            id
          }
        }
      }
    }
  }
`;

class ProposalPage extends Component {
  state = {};

  render() {
    const proposalId = this.props.proposal.id;

    return (
      <StyledDasboard>
        <StyledDevelopDasboard>
          <>
            <div className="goBackBtn">
              <span style={{ cursor: 'pointer' }} onClick={this.props.goBack}>
                ← Back
              </span>
            </div>
          </>
          <Query query={PROPOSAL_BOARD_QUERY} variables={{ id: proposalId }}>
            {({ error, loading, data }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading</p>;
              if (!data?.proposalBoard)
                return <p>No proposal found for {proposalId}</p>;
              const proposal = data.proposalBoard;
              return (
                <div>
                  <Head>
                    <title>mindHIVE | {proposal.title}</title>
                  </Head>
                  <ProposalHeader proposal={proposal} />
                  <ProposalBoard id={proposal.id} />
                </div>
              );
            }}
          </Query>
        </StyledDevelopDasboard>
      </StyledDasboard>
    );
  }
}

export default ProposalPage;
export { PROPOSAL_BOARD_QUERY };
