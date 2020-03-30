import Link from 'next/link';
import { Mutation } from 'react-apollo';
import NavStyles from './styles';
import User from '../User/index';
// import Signout from '../Signout/index';

import { TOGGLE_DASHBOARD_MUTATION } from '../Dashboard/index';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/onboarding">
          <a>Onboarding</a>
        </Link>

        {true && (
          <Link href="/bank">
            <a>Experiments</a>
          </Link>
        )}

        {me && (
          <>
            <Mutation mutation={TOGGLE_DASHBOARD_MUTATION}>
              {toggleDashboard => (
                <button onClick={toggleDashboard}>Dashboard</button>
              )}
            </Mutation>
          </>
        )}

        {!me && false && (
          <>
            <Link href="/signup">
              <a>Signup</a>
            </Link>

            <Link href="/login">
              <a>Login</a>
            </Link>
          </>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;

// <Link href="/me">
//   <a>Me</a>
// </Link>
// <Signout />
