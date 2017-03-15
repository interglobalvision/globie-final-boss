import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { ListProjectsContainer } from '/imports/containers/projects/ListProjectsContainer.jsx';

export class MainDashboard extends Component {
  constructor(props) {
    super(props);
  }

  greeting() {
    const greetings = [
      'Tungjatjeta',
      'Hi',
      'Degemer mad',
      'Hola',
      'Hello',
      'Holi',
      'Bok',
      'Hej',
      'Selam',
      'Namaskaar',
      'Doumo',
      'Ahn nyeong',
      'Sat sri akal',
      'Xin chào',
      'Kóyo',
      'Silaw',
      'Um waynuma?',
      'Nano toka',
      'Saluton',
    ];

    const user = Session.get('User');

    return greetings[_.random(0, greetings.length)] + ' ' + user.emails[0].address;
  }

  render() {
    return(
      <section id="dashboard-main">
        <div className="grid-row">
          <section className="grid-item item-s-12">
            <h3>{this.greeting()}</h3>
          </section>
        </div>
        <ListProjectsContainer />
        <div className="grid-row">
          <section className="grid-item item-s-12">
            <h3>Actions</h3>
            <ul>
              <li><a href={FlowRouter.path('addProject')} className="button">Add Project</a></li>
            </ul>
          </section>
        </div>
      </section>
    );
  }
};
