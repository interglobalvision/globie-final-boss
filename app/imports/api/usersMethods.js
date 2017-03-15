import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import { WorkerSchema } from '/imports/schemas/WorkerSchema.js';

export const addWorker = new ValidatedMethod({
  name: 'Users.methods.addWorker',
  validate: WorkerSchema.validator(),

  run({username, name, email}) {
    if (Meteor.isServer) {

      // Check if user is logged in
      if (!Meteor.userId()) {
        throw new Meteor.Error('Users.methods.addWorker.not-logged-in', 'Must be logged in to create a Worker.');
      }

      // Check if user is admin
      if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
        throw new Meteor.Error('Users.methods.addWorker.not-allowed', 'Must be Admin to do this.');
      }

      // Check if user email exists
      if (Accounts.findUserByEmail(email)) {
        throw new Meteor.Error('Users.methods.addWorker.already-exists', 'User email ' + email + ' already exists.');
      }

      let newUser = Accounts.createUser({
        username: username,
        email: email,
        profile: {
          name: name,
        }
      });

      Roles.addUsersToRoles(newUser, 'worker');
    }
  }
});

export const removeWorker = new ValidatedMethod({
  name: 'Users.methods.removeWorker',
  validate: new SimpleSchema({
    workerId: {
      type: String
    },
  }).validator(),

  run({workerId}) {
    if (Meteor.isServer) {
      // Check if user is logged in
      if (!Meteor.userId()) {
        throw new Meteor.Error('Users.methods.removeWorker.not-logged-in', 'Must be logged in to remove a Worker.');
      }

      // Check if user is admin
      if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
        throw new Meteor.Error('Users.methods.removeWorker.not-allowed', 'Must be Admin to do this.');
      }

      Meteor.users.remove(workerId);
    }
  }
});
