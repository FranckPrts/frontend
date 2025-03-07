import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import { StyledNavigation } from './styles';

import { USER_DASHBOARD_QUERY } from '../../../Queries/User';
import {
  COMPONENT_QUERY,
  COMPONENT_TO_CLONE_QUERY,
} from '../../../Queries/Component';

import { CREATE_COMPONENT, UPDATE_COMPONENT } from '../../../Mutations/Task';

class Navigation extends Component {
  render() {
    const {
      task,
      isAuthor,
      testId,
      onShowPreview,
      createNewComponent,
      updateMyComponent,
      closeModal,
    } = this.props;

    const taskType =
      task?.taskType === 'TASK'
        ? 'Task'
        : task?.taskType === 'BLOCK'
        ? 'Block'
        : 'Survey';

    return (
      <StyledNavigation>
        <div className="firstLine">
          <div className="taskTitle">
            <h1>{task?.title}</h1>
          </div>

          <div className="navButtons">
            {task?.template?.script && (
              <button
                className="secondaryBtn"
                onClick={() => onShowPreview(task)}
              >
                Preview
              </button>
            )}

            <button className="secondaryBtn" onClick={() => closeModal()}>
              Close without saving
            </button>

            {isAuthor ? (
              <div>
                <Mutation
                  mutation={UPDATE_COMPONENT}
                  refetchQueries={[
                    {
                      query: COMPONENT_QUERY,
                      variables: {
                        id: task.id,
                      },
                    },
                    {
                      query: COMPONENT_TO_CLONE_QUERY,
                      variables: {
                        id: task.id,
                      },
                    },
                  ]}
                >
                  {(updateTask, { loading, error }) => (
                    <div>
                      <button
                        type="button"
                        className="primaryBtn"
                        disabled={loading}
                        onClick={async () => {
                          await updateMyComponent(updateTask, 'updateTask');
                          closeModal();
                        }}
                      >
                        {loading ? 'Saving ...' : `Save & Close`}
                      </button>
                    </div>
                  )}
                </Mutation>
              </div>
            ) : (
              <div>
                <Mutation
                  mutation={CREATE_COMPONENT}
                  refetchQueries={[{ query: USER_DASHBOARD_QUERY }]}
                >
                  {(createTask, { loading, error }) => (
                    <div>
                      <button
                        type="button"
                        className="primaryBtn"
                        disabled={loading}
                        onClick={async () => {
                          await createNewComponent(createTask, 'createTask');
                          closeModal();
                        }}
                      >
                        {loading ? 'Saving ...' : `Save & Close`}
                      </button>
                    </div>
                  )}
                </Mutation>
              </div>
            )}
          </div>
        </div>

        <div className="secondLine">
          <p>
            {taskType} ID: {testId}
          </p>
        </div>
      </StyledNavigation>
    );
  }
}

export default Navigation;
