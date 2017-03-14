import { Accounts } from 'meteor/std:accounts-ui';

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
  loginPath: '/',
  onSignedInHook: () => FlowRouter.go('/dashboard/main'),
  onSignedOutHook: () => FlowRouter.go('/'),
});

Meteor.users.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
