import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { MainContainer } from '/imports/containers/MainContainer.jsx';
import { UserLogin } from '/imports/components/user/login.jsx';

// Public Routes
const publicRoutes = FlowRouter.group({
  name: 'public',
});

publicRoutes.route('/', {
  name: 'home',
  action() {
    mount(MainContainer, {
      content: <UserLogin />,
    });
  },
});

publicRoutes.route('/logout', {
  name: 'logout',
  action() {
    Meteor.logout(() => {
      FlowRouter.go('/');
    });
  },
});

publicRoutes.route('/not-found', {
  name: 'not-found',
  action() {
    mount(MainContainer, {
      content: <Page404 />,
    });
  },
});

publicRoutes.route('/unauthorized', {
  name: 'unauthorized',
  action() {
    mount(MainContainer, {
      content: <Page401 />,
    });
  },
});
