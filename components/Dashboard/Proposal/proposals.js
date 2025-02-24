import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';

import styled from 'styled-components';
import ProposalRow from './ProposalList/index';
import { StyledDasboard, StyledClassesDasboard } from '../styles';

import { MY_PROPOSALS_QUERY } from '../../Queries/Proposal';

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
`;

const StyledProposalHeader = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  cursor: pointer;
  font-weight: bold;
`;

class Proposals extends Component {
  render() {
    return (
      <StyledDasboard>
        <StyledClassesDasboard>
          <h1>My proposals</h1>

          <Query query={MY_PROPOSALS_QUERY}>
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const { proposalBoards } = data;
              if (proposalBoards.length === 0) {
                return (
                  <>
                    <h3>You haven’t created any proposals yet.</h3>
                    <p>Once you create a proposal, it will appear here.</p>
                    <div className="navigationHeader">
                      <div></div>
                      <div>
                        <button onClick={this.props.addProposal}>
                          Create Proposal Board
                        </button>
                      </div>
                    </div>
                    <div>
                      <p>
                        Use the proposal builder to create proposal templates.
                      </p>
                    </div>
                  </>
                );
              }
              return (
                <>
                  <div className="navigationHeader">
                    <div></div>
                    <div>
                      <button onClick={this.props.addProposal}>
                        Create Proposal Board
                      </button>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>
                        Use the proposal builder to create proposal templates.
                      </p>
                    </div>
                  </div>
                  <div>
                    <StyledRow>
                      <StyledProposalHeader>
                        <div>Proposal name</div>
                        <div>Number of sections</div>
                        <div>Date created</div>
                        <div>Template</div>
                      </StyledProposalHeader>
                      <div></div>
                    </StyledRow>

                    {proposalBoards.map(myproposal => (
                      <ProposalRow
                        myproposal={myproposal}
                        key={myproposal.id}
                        openProposal={this.props.openProposal}
                      />
                    ))}
                  </div>
                </>
              );
            }}
          </Query>
        </StyledClassesDasboard>
      </StyledDasboard>
    );
  }
}

export default Proposals;
