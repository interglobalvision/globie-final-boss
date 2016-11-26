import { Meteor } from 'meteor/meteor'

import { Projects } from '/imports/collections/projects.js';

export const addProject = new ValidatedMethod({
  name: 'Projects.methods.add',
  validate: new SimpleSchema({
    name: {
      type: String,
    },
    url: {
      type: SimpleSchema.RegEx.Url,
    },
    client: {
      type: String,
    },
    minDays: {
      type: Number,
    },
    maxDays: {
      type: Number,
    },
    rate: {
      type: Number,
    },
    currency: {
      type: String,
    },
    minQuote: {
      type: Number,
    },
    maxQuote: {
      type: Number,
    },
  }).validator(),

  run({name, url, client, minDays, maxDays, rate, currency, minQuote, maxQuote}) {

    // Check if user is logged in
    if (!this.userId) {
      throw new Meteor.Error('Projects.methods.insert.not-logged-in', 'Must be logged in to create an application.');
    }

    // Check if user is admin
    if (!Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('Projects.methods.insert.not-allowed', 'Must be admin to do this.');
    }

    Projects.insert({
      name,
      url,
      client,
      minDays,
      maxDays,
      rate,
      currency,
      minQuote,
      maxQuote,
    });
  }
});
