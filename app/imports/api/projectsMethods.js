import { Meteor } from 'meteor/meteor'

import { Projects } from '/imports/collections/projects.js';
import { ProjectSchema } from '/imports/schemas/ProjectSchema.js';

export const addProject = new ValidatedMethod({
  name: 'Projects.methods.add',
  validate: ProjectSchema.validator(),

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
