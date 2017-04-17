import { Meteor } from 'meteor/meteor';

import '/imports/startup/server/publications.jsx';
import '/imports/startup/server/accounts.jsx';

// Methods

import '/imports/api/projectsMethods.js';
import '/imports/api/customersMethods.js';
import '/imports/api/usersMethods.js';

Meteor.startup(() => {
  // code to run on server at startup
});
