import React from 'react';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { MainContainer } from '/imports/containers/MainContainer.jsx';

import { MainDashboard } from '/imports/components/dashboards/MainDashboard.jsx';
import { AdminDashboard } from '/imports/components/dashboards/AdminDashboard.jsx';

// Dashboard Routes
const dashboardRoutes = FlowRouter.group({
  name: 'dashboards',
  prefix: '/dashboard',
});

dashboardRoutes.route('/', {
  name: 'mainDashboard',
  action() {
    mount(MainContainer, {
      content: <MainDashboard />,
    });
  },
});

dashboardRoutes.route('/admin', {
  name: 'adminDashboard',
  action() {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      mount(MainContainer, {
        content: <AdminDashboard />,
      });
    } else {
      FlowRouter.go('/');
    }
  },
});