import { Meteor } from 'meteor/meteor';

import { compose } from 'react-komposer';

import { Projects } from '/imports/collections/projects.js';

import { ListProjects } from '/imports/components/projects/ListProjects.jsx';

function getTrackerLoader(reactiveMapper) {
  return (props, onData, env) => {
    let trackerCleanup = null;
    const handler = Tracker.nonreactive(() => {
      return Tracker.autorun(() => {
        // assign the custom clean-up function.
        trackerCleanup = reactiveMapper(props, onData, env);
      });
    });

    return () => {
      if(typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };
};

function reactiveMapper(props, onData) {

  const subscription = Meteor.subscribe('dashboard.projects.all');

  if (subscription.ready()) {

    let projects = Projects.find(
      {},
      { sort: {
        createdAt: 1,
      } }).fetch();

    onData(null, { projects });

  }

};

export const ListProjectsContainer = compose(getTrackerLoader(reactiveMapper))(ListProjects);
