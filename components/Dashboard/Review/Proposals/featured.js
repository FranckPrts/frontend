import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';

import ReviewLine from '../ReviewBoard/line';

const StyledReviewHeader = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: 300px 200px 120px 120px 200px;
  grid-gap: 5px;
  font-weight: bold;
  .centered {
    text-align: center;
  }
`;

// write a query here, later refactor it in a separate file if it is used elsewhere
const FEATURED_PROPOSALS_FOR_REVIEW_QUERY = gql`
  query FEATURED_PROPOSALS_FOR_REVIEW_QUERY {
    proposalsFeaturedStudies {
      id
      slug
      title
      createdAt
      isSubmitted
      reviews {
        id
        stage
      }
      study {
        title
        slug
      }
      author {
        id
        studentIn {
          id
          title
        }
        teacherIn {
          id
          title
        }
      }
    }
  }
`;

class FeaturedProposals extends Component {
  render() {
    return (
      <Query
        query={FEATURED_PROPOSALS_FOR_REVIEW_QUERY}
        variables={{ classes: this.props.networkClassIds }}
      >
        {({ data, error, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const { proposalsFeaturedStudies } = data;

          if (proposalsFeaturedStudies.length === 0) {
            return (
              <>
                <h3>There are no studies to review yet.</h3>
                <p>
                  Once there will be a study to review, it will appear here.
                </p>
                <div className="navigationHeader"></div>
              </>
            );
          }
          return (
            <>
              <div className="navigationHeader"></div>

              <StyledReviewHeader>
                <div>Study title</div>
                <div className="centered">Reviews</div>
                <div>Actions</div>
              </StyledReviewHeader>

              {proposalsFeaturedStudies.map(proposal => (
                <ReviewLine
                  proposal={proposal}
                  key={proposal.id}
                  openReview={this.props.openReview}
                  openSynthesize={this.props.openSynthesize}
                />
              ))}
            </>
          );
        }}
      </Query>
    );
  }
}

export default FeaturedProposals;
