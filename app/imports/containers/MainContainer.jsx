import { Meteor } from 'meteor/meteor';

import { compose } from 'react-komposer';

import { MainLayout } from '/imports/components/MainLayout.jsx';

const composer = (props, onData) => {

  let user = Meteor.user() || null;
  Session.set('User',user);

  onData(null, { user });

};

export const MainContainer = compose(composer)(MainLayout);
