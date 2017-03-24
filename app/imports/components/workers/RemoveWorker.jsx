import React, { Component } from 'react';

import { removeWorker } from '/imports/api/usersMethods.js';

export class RemoveWorker extends Component {
  constructor(props) {
    super(props);

    this.onRemoveWorker = this.onRemoveWorker.bind(this);
  }

  onRemoveWorker() {
    removeWorker.call({
      workerId: this.props.workerId,
    });
  }

  render() {
    return (
      <button className='pt-button' onClick={this.onRemoveWorker}>
        Remove Worker
      </button>
    );
  }
};
