import { Meteor } from 'meteor/meteor'

import { Customers } from '/imports/collections/customers.js';
import { CustomerSchema } from '/imports/schemas/CustomerSchema.js';

export const addCustomer = new ValidatedMethod({
  name: 'Customers.methods.add',
  validate: CustomerSchema.validator(),

  run({name}) {

    // Check if user is logged in
    if (!this.userId) {
      throw new Meteor.Error('Customers.methods.insert.not-logged-in', 'Must be logged in to create an application.');
    }

    // Check if user is admin
    if (!Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('Customers.methods.insert.not-allowed', 'Must be admin to do this.');
    }

    if (Customers.findOne({'name': name})) {
      throw new Meteor.Error('Customers.methods.insert.exists', 'Customer name already exists.');
    }

    return Customers.insert({
      name,
    });
  }
});
