import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import { WorkerSchema } from '/imports/schemas/WorkerSchema.js';

export const addWorker = new ValidatedMethod({
  name: 'Users.methods.addWorker',
  validate: WorkerSchema.validator(),

  run({username, name, email}) {
    if (Meteor.isServer) {

      debugger;
      // Check if user is logged in
      if (!this.userId) {
        throw new Meteor.Error('Users.methods.addWorker.not-logged-in', 'Must be logged in to create a Worker.');
      }

      // Check if user is admin
      if (!Roles.userIsInRole(this.userId, 'admin')) {
        throw new Meteor.Error('Users.methods.addWorker.not-allowed', 'Must be admin to do this.');
      }

      // Check if user email exists
      if (Accounts.findUserByEmail(email)) {
        throw new Meteor.Error('Users.methods.addWorker.already-exists', 'User email ' + email + ' already exists.');
      }

      Accounts.createUser({
        username: username,
        email: email,
        profile: {
          name: name,
        }
      });

      let newUser = Accounts.findUserByEmail(email);

      Roles.addUsersToRoles(newUser._id, 'worker');
    }
  }
});
