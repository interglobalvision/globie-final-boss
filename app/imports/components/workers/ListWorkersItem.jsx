import React, { Component } from 'react';

import { RemoveWorker } from '/imports/components/workers/RemoveWorker.jsx';

export class ListWorkersItem extends Component {
  render() {
    return (
      <div className='grid-row'>
        <div className='grid-item item-s-12 item-m-4'>
          {this.props.worker.username}
        </div>
        <div className='grid-item item-s-12 item-m-4'>
          {this.props.worker.emails[0].address}
        </div>
        <div className='grid-item item-s-12 item-m-4'>
          <RemoveWorker workerId={this.props.worker._id} />
        </div>
      </div>
    );
  }
};
