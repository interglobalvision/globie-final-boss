import React, { Component } from 'react';

import { ListWorkersItem } from '/imports/components/workers/ListWorkersItem.jsx';

export class ListWorkers extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.workers) {
      return(
        <section id="workers">
          <div className='grid-row'>
            <div className='grid-item item-s-12'>
              <h2>Workers</h2>
            </div>
          </div>

          {this.props.workers.map((worker) => (
            <ListWorkersItem worker={worker} key={worker._id} />
          ))}
        </section>
      );
    }
  }
};
