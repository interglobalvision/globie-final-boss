import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { MainContainer } from '/imports/containers/MainContainer.jsx';

import { AddProject } from '/imports/components/projects/AddProject.jsx';

const projectRoutes = FlowRouter.group({
  name: 'projects',
  prefix: '/projects',
});

projectRoutes.route('/add', {
  name: 'addProject',
  action() {
    mount(MainContainer, {
      content: <AddProject />,
    });
  },
});

