import React, { Component } from 'react';

import { EditableText } from '@blueprintjs/core';
import { SingleInput } from '/imports/components/inputs/SingleInput.jsx';
import { addWorker } from '/imports/api/usersMethods.js';
import { WorkerSchema } from '/imports/schemas/WorkerSchema.js';

export class AddWorker extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitalState();

    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.cleanForm = this.cleanForm.bind(this);
  }

  getInitalState() {
    return {
      username: '',
      name: '',
      email: '',
      validationError: undefined,
    };
  }

  getCurrentCleanState() {
    return this.cleanObject({
      username: this.state.username,
      name: this.state.name,
      email: this.state.email,
    });
  }

  cleanObject(object) {
    let cleanObject = Object.assign({}, object);
    for (let property in object) {
      if (object.hasOwnProperty(property)) {
        let val = object[property];

        if (val === 0 || val === '') {
          cleanObject[property] = undefined;
        } else {
          cleanObject[property] = val;
        }
      }
    }

    return cleanObject;
  }

  onUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  validate(data) {
    // Validate worker data
    WorkerSchema.validate(data);
  }

  cleanForm() {
    this.setState(this.getInitalState());
  }

  onSubmitHandle(event) {
    event.preventDefault();

    this.setState({
      validationError: undefined,
    });

    let isValid = true;

    const worker = this.getCurrentCleanState();

    try {
      this.validate(worker);
    } catch(err) {
      if (err) {
        isValid = false;

        this.setError(err);
      }
    }

    if (isValid) {
      addWorker.call(worker, (err, res) => {
        if (err) {
          console.error(err);
        } else {
          this.cleanForm();
          console.log('success');
        }
      });
    }
  }

  setError(err) {
    this.setState({
      validationError: err.reason,
    });
  }

  render() {
    return(
      <form onSubmit={this.onSubmitHandle}>
        <div className='grid-row'>
          <div className='grid-item item-s-12'>
            <h2>Add Worker</h2>
          </div>
        </div>

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-4'>
            <label className='grid-column margin-bottom-small'>
              Username
              <input className='pt-input margin-top-micro' type='text' name='worker-username-input' onChange={this.onUsernameChange} value={this.state.username} placeholder='Username' />
            </label>
          </div>

          <div className='grid-item item-s-12 item-m-4'>
            <label className='grid-column margin-bottom-small'>
              Legal Name
              <input className='pt-input margin-top-micro' type='text' name='worker-name-input' onChange={this.onNameChange} value={this.state.name} placeholder='Name' />
            </label>
          </div>

          <div className='grid-item item-s-12 item-m-4'>
            <label className='grid-column margin-bottom-small'>
              Email
              <input className='pt-input margin-top-micro' type='text' name='worker-email-input' onChange={this.onEmailChange} value={this.state.email} placeholder='Email' />
            </label>
          </div>
        </div>

        { this.state.validationError &&
        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-4 margin-bottom-small'>
            <div className="pt-callout pt-intent-danger">
              <h5>Validation Error</h5>
              {this.state.validationError}
            </div>
          </div>
        </div> }

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-4'>
            <button type='submit' className='pt-button pt-large'>Add Worker</button>
          </div>
        </div>
      </form>
    );
  }
};
