import { Meteor } from 'meteor/meteor';

Meteor.publish('users.workers', function() {

  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Roles.getUsersInRole('worker');
  } else {
    this.stop();
    return;
  }

});
