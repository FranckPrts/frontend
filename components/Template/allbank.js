import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Link from 'next/link';
// import { Center, TemplatesList, StyledLink } from './styles';
import TemplateCard from './card';

import { StyledBoard, List, NavigationButtons } from '../Styles/Boards';

// write a query here, later refactor it in a separate file if it is used elsewhere
const ALL_TEMPLATES_QUERY = gql`
  query ALL_TEMPLATES_QUERY {
    templates {
      id
      title
      shortDescription
      description
      author {
        id
      }
    }
  }
`;

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-@apollo/client/react/components-2-1-199e9e2bd01e
class AllTemplates extends Component {
  render() {
    return (
      <StyledBoard>
        <h1>Public templates</h1>
        <NavigationButtons>
          <Link
            href={{
              pathname: '/templates/add',
            }}
          >
            <a>
              <button>
                <h2>Add new template</h2>
              </button>
            </a>
          </Link>
          <Link
            href={{
              pathname: '/templates/my',
            }}
          >
            <a>
              <button>
                <h2>My templates</h2>
              </button>
            </a>
          </Link>
        </NavigationButtons>
        <Query query={ALL_TEMPLATES_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <List>
                {data.templates.map(template => (
                  <TemplateCard template={template} key={template.id} />
                ))}
              </List>
            );
          }}
        </Query>
      </StyledBoard>
    );
  }
}

export default AllTemplates;
export { ALL_TEMPLATES_QUERY };
