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
  }).validator(),

  run({name, url}) {
    Projects.insert({
      name,
      url,
    });
  }
});
