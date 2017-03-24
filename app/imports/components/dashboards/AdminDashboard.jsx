import React, { Component } from 'react';

import { ListWorkersContainer } from '/imports/containers/ListWorkersContainer.jsx';
import { AddWorker } from '/imports/components/workers/AddWorker.jsx';

export class AdminDashboard extends Component {
  render() {
    return(
      <section id="dashboard">
        <div className="grid-row">
          <div className="grid-item item-s-12">
            <h1>Admin Dashboard</h1>
          </div>
        </div>

        <ListWorkersContainer />

        <AddWorker />
      </section>
    );
  }
};
