import React, { Component } from 'react';

import { Roles } from 'meteor/alanning:roles';

export class Header extends Component {
  render() {
    return (
      <nav id='header' className='pt-navbar pt-dark margin-bottom-basic'>
        <div className='pt-navbar-group pt-align-left'>
          <div className='pt-navbar-heading'>Final Boss</div>
        </div>
        <div className='pt-navbar-group pt-align-right'>
          {Roles.userIsInRole(Meteor.userId(), ['admin']) &&
            <a href={FlowRouter.path('adminDashboard')} className='pt-button pt-minimal pt-icon-office' role='button'>Admin</a>
          }
          <a href={FlowRouter.path('mainDashboard')} className='pt-button pt-minimal pt-icon-home' role='button'>Home</a>
          <span className='pt-navbar-divider'></span>
          <button className='pt-button pt-minimal pt-icon-cog'></button>
        </div>
      </nav>
    );
  }
};