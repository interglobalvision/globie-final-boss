import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Accounts } from 'meteor/accounts-base';

import { Projects } from '/imports/collections/projects.js';
import { addProject } from '/imports/api/projectsMethods.js';

if (Meteor.isServer) {
  describe('Projects', () => {
    describe('methods', () => {

      beforeEach(() => {
        // Delete all Projects
        Projects.remove({});

        // Delete all users
        Meteor.users.remove({});
      });

      it('admin user can add new project', () => {
        // Create admin user
        const userId = Accounts.createUser({
          username: 'testAdmin',
          email: 'test@interglobal.vision',
          password: '123',
        });

        // Add admin user to `admin` role
        Roles.addUsersToRoles(userId, 'admin');

        // Find the internal implementation of the Projects add method so we can
        // test it in isolation
        const addProject = Meteor.server.method_handlers['Projects.methods.add'];

        // Set up fake project data
        const newProject = {
          name: 'Project Name',
          url: 'http://project.com',
          customer: 'Customer Name',
          minDays: 1,
          maxDays: 2,
          rate: 4000,
          currency: 'MXN',
          minQuote: 4000,
          maxQuote: 8000,
        };

        // Run the method with `this` set to the fake invocation
        addProject.apply({ userId }, [newProject]);

        // Verify that the method does what we expected
        assert.equal(Projects.find({
          name: 'Project Name',
        }).count(), 1);

      });

      it('not logged user can\'t add new project', () => {
        // Find the internal implementation of the Projects add method so we can
        // test it in isolation
        const addProject = Meteor.server.method_handlers['Projects.methods.add'];

        // Set up fake project data
        const newProject = {
          name: 'Project Name',
          url: 'http://project.com',
          customer: 'Customer Name',
          minDays: 1,
          maxDays: 2,
          rate: 4000,
          currency: 'MXN',
          minQuote: 4000,
          maxQuote: 8000,
        };

        // Verify that the method does what we expected
        expect(addProject.apply.bind({}, [newProject])).to.throw(Error);

      });
    });
  });
}
