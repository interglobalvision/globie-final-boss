import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { PageFrontpage } from '/imports/components/pages/Frontpage.jsx';
import { Page401 } from '/imports/components/pages/Page401.jsx';
import { Page404 } from '/imports/components/pages/Page404.jsx';

import { MainContainer } from '/imports/containers/MainContainer.jsx';
import { UserLogin } from '/imports/components/accounts/Login.jsx';

// Public Routes
const publicRoutes = FlowRouter.group({
  name: 'public',
});

publicRoutes.route('/', {
  name: 'home',
  action() {
    if (Meteor.userId()) {
      return FlowRouter.go('/dashboard');
    }

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
