import React, { Component } from 'react';
import styled from 'styled-components';

const StyledClassRow = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: 300px 200px 120px 120px 300px;
  grid-gap: 5px;
  background: white;
  .buttons {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr;
    cursor: pointer;
    a {
      font-size: 1.5rem;
    }
  }
  .centered {
    text-align: center;
  }
`;

class ReviewRow extends Component {
  render() {
    const { proposal, showProposalTitle, showClass, showStatus } = this.props;

    let theClass;
    if (proposal?.study?.classes?.length) {
      theClass = proposal?.study?.classes[0].title;
    }
    // if (
    //   proposal?.author?.teacherIn &&
    //   proposal?.author?.teacherIn.length &&
    //   proposal?.author?.teacherIn[0].title
    // ) {
    //   theClass = proposal?.author?.teacherIn[0].title;
    // }
    // if (
    //   proposal?.author?.studentIn &&
    //   proposal?.author?.studentIn.length &&
    //   proposal?.author?.studentIn[0].title
    // ) {
    //   theClass = proposal?.author?.studentIn[0].title;
    // }

    return (
      <StyledClassRow>
        {showProposalTitle ? (
          <div>
            {proposal?.study?.title} ({proposal?.title})
          </div>
        ) : (
          <div>{proposal?.study?.title}</div>
        )}

        {showClass && <div>{theClass}</div>}
        {showStatus && (
          <div className="centered">{proposal?.isSubmitted ? 'Yes' : 'No'}</div>
        )}

        <div className="centered">
          {
            proposal?.reviews?.filter(review => review.stage === 'INDIVIDUAL')
              .length
          }
        </div>
        <div className="buttons">
          <div>
            <a
              href={`https://mindhive.science/studies/${proposal?.study?.slug}`}
              target="_blank"
              rel="noreferrer"
            >
              Participate
            </a>
          </div>
          <div onClick={() => this.props.openReview(proposal.id)}>Review</div>
          <div onClick={() => this.props.openSynthesize(proposal.id)}>
            Synthesize
          </div>
        </div>
      </StyledClassRow>
    );
  }
}

export default ReviewRow;
export { StyledClassRow };
