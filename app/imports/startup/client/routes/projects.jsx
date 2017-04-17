import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { MainContainer } from '/imports/containers/MainContainer.jsx';

import { AddProjectContainer } from '/imports/containers/projects/AddProjectContainer.jsx';

const projectRoutes = FlowRouter.group({
  name: 'projects',
  prefix: '/project',
});

projectRoutes.route('/add', {
  name: 'addProject',
  action() {
    mount(MainContainer, {
      content: <AddProjectContainer />,
    });
  },
});
