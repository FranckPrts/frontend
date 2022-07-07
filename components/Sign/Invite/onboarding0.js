import React, { Component } from 'react';
import { Query, Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import { SimpleForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../Queries/User';
import { ALL_CLASSES_QUERY } from '../../Class/All/index';
import { REVIEW_CLASS_QUERY } from '../../Class/Review/index';

import { StyledInterestItem, StyledOtherInterestItem } from './styles';

const INVITE_SIGNUP_MUTATION = gql`
  mutation INVITE_SIGNUP_MUTATION(
    $username: String!
    $invitedIn: ID!
    $image: String
    $largeImage: String
    $info: Json
  ) {
    inviteSignUp(
      username: $username
      invitedIn: $invitedIn
      image: $image
      largeImage: $largeImage
      info: $info
    ) {
      id
      username
      permissions
    }
  }
`;

class OnboardingSignupWithClassInvite extends Component {
  state = {
    username: '',
    image: '',
    largeImage: '',
    info: {
      interests: [],
      other1: '',
      other2: '',
      other3: '',
      other4: '',
    },
  };

  handleInfoChange = e => {
    const { name, type, value } = e.target;
    let val = type === 'number' ? parseFloat(value) : value;
    if (type === 'checkbox') {
      const { interests } = this.state.info;
      const { id } = e.target;
      if (interests.includes(id)) {
        interests.splice(interests.indexOf(id), 1);
      } else {
        interests.push(id);
      }
      val = interests;
    }
    this.setState({
      info: {
        ...this.state.info,
        [name]: val,
      },
    });
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  // method for uploading images
  uploadImage = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'mindhive');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/mindhive/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };

  render() {
    return (
      <Query query={ALL_CLASSES_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const { classes } = data;
          return (
            <>
              <Mutation
                mutation={INVITE_SIGNUP_MUTATION}
                variables={this.state}
                refetchQueries={[
                  { query: CURRENT_USER_RESULTS_QUERY },
                  {
                    query: REVIEW_CLASS_QUERY,
                    variables: { id: this.state.invitedIn },
                  },
                ]}
              >
                {(inviteSignUp, { error, loading }) => (
                  <SimpleForm
                    method="post"
                    onSubmit={async e => {
                      e.preventDefault();
                      const res = await inviteSignUp();
                      this.setState({ username: '' });
                      Router.push({
                        pathname: '/lessons',
                      });
                    }}
                  >
                    <fieldset disabled={loading} aria-busy={loading}>
                      <Error error={error} />

                      <div>
                        Let’s start with the most important part: pick a
                        username and profile picture! This information will be
                        visible to other people who visit the platform. For
                        privacy reasons, don’t use your own name or a picture of
                        your face. Instead, use an alias and pick an avatar. You
                        can pick your (science) hero or come up with your own
                        name. Feel free to discuss with your peers! [5 mins]
                      </div>

                      <label htmlFor="invitedIn">
                        Class
                        <select
                          type="text"
                          name="invitedIn"
                          placeholder="invitedIn"
                          value={this.state.invitedIn}
                          onChange={this.handleChange}
                          required
                        >
                          <option value=""> --- Choose your class --- </option>
                          {classes.map(schoolclass => (
                            <option value={schoolclass.id} key={schoolclass.id}>
                              {schoolclass.title}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label htmlFor="username">
                        Alias
                        <input
                          type="text"
                          name="username"
                          value={this.state.username}
                          onChange={this.handleChange}
                          required
                        />
                      </label>
                      <label htmlFor="image">
                        Avatar
                        <input
                          type="file"
                          id="image"
                          name="image"
                          placeholder="Upload an image"
                          onChange={this.uploadImage}
                        />
                        {this.state.image && (
                          <img
                            src={this.state.image}
                            width="200"
                            alt="Upload avatar"
                          />
                        )}
                      </label>

                      <div>
                        <strong>
                          We’d also like to know a bit more about your
                          interests.
                        </strong>
                        “Brain and behavior” is a very large research field and
                        there are a lot of subfields. What are you curious
                        about? Check all that apply and add any topics that are
                        not listed here.
                      </div>

                      <label htmlFor="interests">
                        {[
                          'Emotion',
                          'Learning',
                          'Memory',
                          'Language',
                          'Social groups',
                          'Music',
                          'Intelligence',
                          'Ageing',
                          'Sleep',
                          'Food',
                          'Exercise',
                          'Consciousness',
                          'Brain disorders/disability',
                        ].map(item => (
                          <StyledInterestItem key={item}>
                            <input
                              type="checkbox"
                              name="interests"
                              id={item}
                              onChange={this.handleInfoChange}
                              value={this.state.info.interests.includes(item)}
                            />
                            <label htmlFor={item}>{item}</label>
                          </StyledInterestItem>
                        ))}
                      </label>

                      <label htmlFor="otherInterests">
                        {['other1', 'other2', 'other3', 'other4'].map(item => (
                          <StyledOtherInterestItem key={item}>
                            <input
                              type="checkbox"
                              name="interests"
                              id={item}
                              onChange={this.handleInfoChange}
                              value={this.state.info.interests.includes(item)}
                            />
                            <label htmlFor={item}>Other</label>
                            <input
                              type="text"
                              name={item}
                              value={this.state.info[item]}
                              onChange={this.handleInfoChange}
                            />
                          </StyledOtherInterestItem>
                        ))}
                      </label>

                      <button type="submit">Enter</button>
                    </fieldset>
                  </SimpleForm>
                )}
              </Mutation>
            </>
          );
        }}
      </Query>
    );
  }
}

export default OnboardingSignupWithClassInvite;
