import React, { Component } from 'react';

import { Accounts } from '/imports/components/accounts.jsx';

export class UserLogin extends Component {
  render() {
    return(
      <div className="row">
        <section className="fluid-col s-12 m-9">
          <h3>Login</h3>
          <Accounts.ui.LoginForm />
        </section>
      </div>
    );
  }
};
