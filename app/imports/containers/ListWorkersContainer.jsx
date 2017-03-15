import { Meteor } from 'meteor/meteor';
import { compose } from 'react-komposer';

import { ListWorkers } from '/imports/components/workers/ListWorkers.jsx';

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

  if (Meteor.subscribe('users.workers').ready()) {

    const user = !!Meteor.user() ? Meteor.user() : null;

    if (Roles.userIsInRole(user._id, [ 'admin' ])) {

      let workers = Roles.getUsersInRole('worker');

      onData(null, { workers });

    }
  };

}

export const ListWorkersContainer = compose(getTrackerLoader(reactiveMapper))(ListWorkers);
