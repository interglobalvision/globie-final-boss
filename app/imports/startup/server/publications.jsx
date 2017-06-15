import { Meteor } from 'meteor/meteor';

import { Projects } from '/imports/collections/projects.js';
import { Customers } from '/imports/collections/customers.js';

Meteor.publish('dashboard.projects.all', function() {

  if (Roles.userIsInRole(this.userId, ['worker', 'admin'])) {
    return Projects.find({});
  } else {
    this.stop();
    return;
  }

});

Meteor.publish('dashboard.customers.all', function() {

  if (Roles.userIsInRole(this.userId, ['worker', 'admin'])) {
    return Customers.find({});
  } else {
    this.stop();
    return;
  }

});

Meteor.publish('users.workers', function() {

  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Roles.getUsersInRole('worker');
  } else {
    this.stop();
    return;
  }

});
