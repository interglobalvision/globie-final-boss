import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { MainLayout } from '/imports/components/mainLayout.jsx';

import { UserLogin } from '/imports/components/user/login.jsx';

import { PageFrontpage } from '/imports/components/pages/frontpage.jsx';
import { Page401 } from '/imports/components/pages/page401.jsx';
import { Page404 } from '/imports/components/pages/page404.jsx';

import { AdminDashboard } from '/imports/components/admin/dashboard.jsx';

// Public Routes
const publicRoutes = FlowRouter.group({
  name: 'public'
});

publicRoutes.route('/', {
  name: 'home',
  action () {

    // >>> duplicate code here and login needs consolidation
    if (Meteor.userId() && Roles.subscription.ready() && FlowRouter._initialized) {
      if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
        return FlowRouter.go('/dashboard/admin');
      } else if (Roles.userIsInRole(Meteor.userId(), 'worker')) {
        return FlowRouter.go('/dashboard/worker');
      } else if (Roles.userIsInRole(Meteor.userId(), 'client')) {
        return FlowRouter.go('/dashboard/client');
      }
    }

    mount(MainLayout, {
      content: <PageFrontpage />,
    });
  },
});

publicRoutes.route('/login', {
  name: 'login',
  action() {

    if (Meteor.userId() && Roles.subscription.ready() && FlowRouter._initialized) {
      if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
        return FlowRouter.go('/dashboard/admin');
      } else if (Roles.userIsInRole(Meteor.userId(), 'worker')) {
        return FlowRouter.go('/dashboard/worker');
      } else if (Roles.userIsInRole(Meteor.userId(), 'client')) {
        return FlowRouter.go('/dashboard/client');
      }
    }

    mount(MainLayout, {
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
    mount(MainLayout, {
      content: <Page404 />,
    });
  },
});

publicRoutes.route('/unauthorized', {
  name: 'unauthorized',
  action() {
    mount(MainLayout, {
      content: <Page401 />,
    });
  },
});

// Admin Routes
const adminRoutes = FlowRouter.group({
  name: 'authenticated',
});

adminRoutes.route('/dashboard/admin', {
  name: 'admin-dashboard',
  action() {
    mount(MainLayout, {
      content: <AdminDashboard />,
    });
  },
});

// Other Routes stuff
FlowRouter.wait();

Tracker.autorun(() => {
  if (Roles.subscription.ready() && !FlowRouter._initialized) {
    FlowRouter.initialize();
  }
});

// Scroll to top on route change
const scrollToTop = () => {
  $('html, body').stop().animate({ scrollTop: 0 }, 300);
};

FlowRouter.triggers.enter([scrollToTop]);

// Not found routes
FlowRouter.notFound = {
  action() {
    return FlowRouter.go('/not-found');
  },
};