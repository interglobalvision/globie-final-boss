import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { ListProjectsContainer } from '/imports/containers/projects/ListProjectsContainer.jsx';

import { ListWorkersContainer } from '/imports/containers/ListWorkersContainer.jsx';
import { AddWorker } from '/imports/components/workers/AddWorker.jsx';

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
      <section id='dashboard-main'>
        <div className='grid-row margin-bottom-basic'>
          <section className='grid-item item-s-12'>
            <h1>{this.greeting()}</h1>
          </section>
        </div>
        <ListProjectsContainer />
        <div className='grid-row'>
          <section className='grid-item item-s-12'>
            <div className='pt-button-group'>
              <a href={FlowRouter.path('addProject')} className='pt-button'>Add Project</a>
            </div>
          </section>
        </div>
      </section>
    );
  }
};
