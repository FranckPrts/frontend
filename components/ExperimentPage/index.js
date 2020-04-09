import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';
import {
  StyledExperiment,
  StyledButtons,
  StyledLink,
  StyledCustomExperiments,
  StyledCustomExperimentLine,
} from './styles';
import { ContainerOnlyForNoProfile } from '../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../Permissions/Profile/index';
import { ContainerOnlyForStudents } from '../Permissions/Student/index';
import { ContainerOnlyForParticipants } from '../Permissions/Participant/index';

import HiddenTokenSignup from '../Sign/Token/hidden';
import TokenSignup from '../Sign/Token/index';
import EmptyTokenSignup from '../Sign/Token/empty';

class ExperimentPage extends Component {
  state = {
    under18: false,
    parentConsent: false,
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  };

  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { exp } = this.props;
    const isCustom = !!(exp.data && exp.data.length);
    const { customExperiments } = exp;
    return (
      <div>
        <StyledExperiment>
          <Head>
            <title>mindHIVE | {exp.title}</title>
          </Head>
          <h2>{exp.title}</h2>
          <p>{exp.description}</p>

          <ContainerOnlyForNoProfile>
            <h3>
              Please
              <Link
                href={{
                  pathname: '/sign/token',
                }}
              >
                <StyledLink> sign up </StyledLink>
              </Link>
              as a participant or just
              <Link
                href={{
                  pathname: '/login/token',
                }}
              >
                <StyledLink> log in here </StyledLink>
              </Link>
              with your username.
            </h3>
            <p>
              You can also participate as a guest (we will assign you a
              different random username each time you participate).
            </p>
            <HiddenTokenSignup redirect={exp.id} isCustom={isCustom} />
          </ContainerOnlyForNoProfile>

          <ContainerOnlyForStudents>
            {exp.title === 'Risk taking task' && (
              <div>
                <h2>Instructions</h2>
                You are are not only a study participant but also a student of
                this research study. To learn how to design a study yourself,
                pay attention to the following:
                <ol>
                  <li>
                    <strong>Actions:</strong> What kinds of actions can you as a
                    participant take?
                  </li>
                  <li>
                    <strong>Sequence of questions and tasks:</strong> Is there a
                    pattern in the sequence of questions and tasks you go
                    through as a participant?
                  </li>
                  <li>
                    <strong>Displayed information:</strong> What are all the
                    pieces of information and visualizations that you see as you
                    go through the experiment?
                  </li>
                </ol>
              </div>
            )}
            {exp.title === 'Rating task' && (
              <div>
                <h2>Instructions</h2>
                You are are not only a study participant but also a student of
                this research study. To learn how to design a study yourself,
                pay attention to the following:
                <ol>
                  <li>
                    <strong>Phrasing:</strong> How are the questions phrased,
                    and what is common between them?
                  </li>
                  <li>
                    <strong>Sequence of questions and information:</strong> Is
                    there a pattern in the sequence of questions and information
                    displayed?
                  </li>
                </ol>
              </div>
            )}
          </ContainerOnlyForStudents>

          <ContainerOnlyForProfile>
            <div>
              <fieldset>
                <h3>How would you like us to use your data?</h3>
                <div>
                  <label htmlFor="useDataForScience">
                    <input
                      type="radio"
                      id="useDataForScience"
                      name="data"
                      value="science"
                      onChange={this.updateState}
                      checked={this.state.data === 'science'}
                    />
                    You can use my data for science
                  </label>
                </div>
                <div>
                  <label htmlFor="educationalUse">
                    <input
                      type="radio"
                      id="educationalUse"
                      name="data"
                      value="education"
                      onChange={this.updateState}
                      checked={this.state.data === 'education'}
                    />
                    I want my data to be saved for educational use only (e.g.,
                    for demonstrations in class etc.)
                  </label>
                </div>
                <div>
                  <label htmlFor="doNotRecord">
                    <input
                      type="radio"
                      id="doNotRecord"
                      name="data"
                      value="no"
                      onChange={this.updateState}
                      checked={this.state.data === 'no'}
                    />
                    Don't record my data at all (note that this means it won't
                    be included in class demonstrations)
                  </label>
                </div>
                {this.state.data === 'science' && (
                  <div>
                    <label htmlFor="under18">
                      <input
                        type="checkbox"
                        id="under18"
                        name="under18"
                        onChange={this.saveToState}
                        checked={this.state.under18}
                      />
                      I am under the age of 18
                    </label>
                  </div>
                )}
                {this.state.data === 'science' && this.state.under18 && (
                  <div>
                    <label htmlFor="parentConsent">
                      Please ask your parent or guardian to check the box below
                      that they consent to your participation in this study.
                      <div>
                        <input
                          type="checkbox"
                          name="parentConsent"
                          id="parentConsent"
                          onChange={this.saveToState}
                          checked={this.state.parentConsent}
                        />
                        I consent
                      </div>
                    </label>
                  </div>
                )}

                <StyledButtons>
                  <Link
                    href={{
                      pathname: `${isCustom ? '/e' : '/exp/run'}`,
                      query: { id: exp.id, data: this.state.data },
                    }}
                  >
                    <button
                      disabled={
                        !this.state.data ||
                        (this.state.data === 'science' &&
                          this.state.under18 &&
                          !this.state.parentConsent)
                      }
                    >
                      <a>
                        <h2>
                          {!this.state.data ||
                          (this.state.data === 'science' &&
                            this.state.under18 &&
                            !this.state.parentConsent)
                            ? 'Please answer on the question above'
                            : 'I am ready to participate in this study'}{' '}
                        </h2>
                      </a>
                    </button>
                  </Link>
                </StyledButtons>
              </fieldset>
            </div>
          </ContainerOnlyForProfile>

          {!isCustom && (
            <ContainerOnlyForStudents>
              <fieldset>
                <h3>
                  If you’ve already participated in this study, you can proceed
                  to the next step – creating your own research study. (If
                  you’re in a class, don’t proceed until the teacher has given
                  the green light)
                </h3>
                <StyledButtons>
                  <Link
                    href={{
                      pathname: '/bank/customize',
                      query: { id: exp.id },
                    }}
                  >
                    <button>
                      <a>
                        <h2>I am ready to create my own study</h2>
                      </a>
                    </button>
                  </Link>
                </StyledButtons>
              </fieldset>
            </ContainerOnlyForStudents>
          )}
        </StyledExperiment>

        {customExperiments && customExperiments.length > 0 && (
          <StyledCustomExperiments>
            <h2>The experiments designed on the basis of {exp.title}</h2>
            {customExperiments.map(parameter => (
              <StyledCustomExperimentLine key={parameter.id}>
                <Link
                  href={{
                    pathname: '/custom',
                    query: { id: parameter.id },
                  }}
                >
                  <a>
                    <h3>{parameter.title}</h3>
                  </a>
                </Link>
                <div>
                  <div>
                    Created by <em>{parameter.author.username} </em>
                  </div>
                  <div>{moment(parameter.updatedAt).fromNow()}</div>
                </div>
                <Link
                  href={{
                    pathname: '/custom',
                    query: { id: parameter.id },
                  }}
                >
                  <button>
                    <a>
                      <h2>Experiment page</h2>
                    </a>
                  </button>
                </Link>
              </StyledCustomExperimentLine>
            ))}
          </StyledCustomExperiments>
        )}
      </div>
    );
  }
}

export default ExperimentPage;

// <Link
//   href={{
//     pathname: '/e',
//     query: { id: parameter.id },
//   }}
// >
//   <button>
//     <a>
//       <h2>Participate</h2>
//     </a>
//   </button>
// </Link>
