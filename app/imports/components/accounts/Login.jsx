import React, { Component } from 'react';

import { Accounts } from '/imports/components/accounts/AccountsFix.jsx';

export class UserLogin extends Component {
  render() {
    return(
      <div className="grid-row">
        <section className="grid-item item-s-12 item-m-9">
          <h3>Login</h3>
          <Accounts.ui.LoginForm />
        </section>
      </div>
    );
  }
};
