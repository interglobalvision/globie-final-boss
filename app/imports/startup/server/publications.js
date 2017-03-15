import { Meteor } from 'meteor/meteor';

import { Projects } from '/imports/collections/projects.js';

Meteor.publish('dashboard.projects.all', function() {

  return Projects.find({});

});