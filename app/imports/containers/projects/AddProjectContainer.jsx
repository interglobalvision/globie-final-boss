import { Meteor } from 'meteor/meteor';

import { compose } from 'react-komposer';

import { Customers } from '/imports/collections/customers.js';

import { AddProject } from '/imports/components/projects/AddProject.jsx';

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

  const subscription = Meteor.subscribe('dashboard.customers.all');

  if (subscription.ready()) {

    let customers = Customers.find({}).fetch();

    onData(null, { customers });

  }

};

export const AddProjectContainer = compose(getTrackerLoader(reactiveMapper))(AddProject);
