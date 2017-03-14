import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { MainContainer } from '/imports/containers/MainContainer.jsx';

import { MainDashboard } from '/imports/components/dashboards/MainDashboard.jsx';

// Dashboard Routes
const dashboardRoutes = FlowRouter.group({
  name: 'dashboards',
  prefix: '/dash',
});

dashboardRoutes.route('/main', {
  name: 'mainDashboard',
  action() {
    mount(MainContainer, {
      content: <MainDashboard />,
    });
  },
});
