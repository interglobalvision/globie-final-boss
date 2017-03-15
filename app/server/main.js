import { Meteor } from 'meteor/meteor';

import '/imports/startup/server/accounts.jsx';

import '/imports/startup/server/publications.js';
// Methods
import '/imports/api/projectsMethods.js';

Meteor.startup(() => {
  // code to run on server at startup
});
