import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Accounts } from 'meteor/accounts-base';

import { Customers } from '/imports/collections/customers.js';
import { addCustomer } from '/imports/api/customersMethods.js';

if (Meteor.isServer) {
  describe('Customers', () => {
    describe('methods', () => {

      beforeEach(() => {
        // Delete all Projects
        Customers.remove({});

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
        const addCustomer = Meteor.server.method_handlers['Customers.methods.add'];

        // Set up fake customer data
        const newCustomer = {
          name: 'Customer Name',
        };

        // Run the method with `this` set to the fake invocation
        addCustomer.apply({ userId }, [newCustomer]);

        // Verify that the method does what we expected
        assert.equal(Customers.find({
          name: 'Customer Name',
        }).count(), 1);

      });

      it('not logged user can\'t add new project', () => {
        // Find the internal implementation of the Projects add method so we can
        // test it in isolation
        const addCustomer = Meteor.server.method_handlers['Customers.methods.add'];

        // Set up fake customer data
        const newCustomer = {
          name: 'Customer Name',
        };

        // Verify that the method does what we expected
        expect(addCustomer.apply.bind({}, [newCustomer])).to.throw(Error);

      });

      it('admin user can\'t add duplicate customer name', () => {
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
        const addCustomer = Meteor.server.method_handlers['Customers.methods.add'];

        // Set up fake customer data
        const newCustomer = {
          name: 'Customer Name',
        };

        Customers.insert(newCustomer);

        // Run the method with `this` set to the fake invocation
        addCustomer.apply({ userId }, [newCustomer]);

        // Verify that the method does what we expected
        expect(addCustomer.apply.bind({}, [newCustomer])).to.throw(Error);

      });
    });
  });
}
