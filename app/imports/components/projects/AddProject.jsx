import React, { Component } from 'react';

import { EditableText } from '@blueprintjs/core';
import { SingleInput } from '/imports/components/inputs/SingleInput.jsx';
import { addProject } from '/imports/api/projectsMethods.js';
import { ProjectSchema } from '/imports/schemas/ProjectSchema.js';

export class AddProject extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitalState();

    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onClientChange = this.onClientChange.bind(this);
    this.onMinDaysChange = this.onMinDaysChange.bind(this);
    this.onMaxDaysChange = this.onMaxDaysChange.bind(this);
    this.onRateChange = this.onRateChange.bind(this);
    this.onCurrencyChange = this.onCurrencyChange.bind(this);
    this.cleanForm = this.cleanForm.bind(this);
  }

  getInitalState() {
    return {
      name: '',
      url:  '',
      client: '',
      minDays: 0,
      maxDays: 0,
      rate: 0,
      currency: 'MXN',
      minQuote: 0,
      maxQuote: 0,
      validationError: undefined,
    };
  }

  getCurrentCleanState() {
    return this.cleanObject({
      name: this.state.name,
      url: this.state.url,
      client: this.state.client,
      minDays: this.state.minDays,
      maxDays: this.state.maxDays,
      rate: this.state.rate,
      currency: this.state.currency,
      minQuote: this.state.minQuote,
      maxQuote: this.state.maxQuote,
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

  calculateTotalQuote() {
    this.setState({
      minQuote: this.state.minDays * this.state.rate,
      maxQuote: this.state.maxDays * this.state.rate,
    });
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onUrlChange(e) {
    this.setState({
      url: e.target.value,
    });
  }

  onClientChange(e) {
    this.setState({
      client: e.target.value,
    });
  }

  onMinDaysChange(e) {
    // this.calculateTotalQuote is being passes as a callback that executes
    // after the state mutation has happened
    this.setState({
      minDays: parseInt(e.target.value),
    }, this.calculateTotalQuote);
  }

  onMaxDaysChange(e) {
    // this.calculateTotalQuote is being passes as a callback that executes
    // after the state mutation has happened
    this.setState({
      maxDays: parseInt(e.target.value),
    }, this.calculateTotalQuote);
  }

  onRateChange(e) {
    // this.calculateTotalQuote is being passes as a callback that executes
    // after the state mutation has happened
    this.setState({
      rate: parseInt(e.target.value),
    }, this.calculateTotalQuote);

    this.calculateTotalQuote();
  }

  onCurrencyChange(e) {
    this.setState({
      currency: e.target.value,
    });
  }

  validate(data) {
    // Validate project data
    ProjectSchema.validate(data);
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

    const project = this.getCurrentCleanState();

    try {
      this.validate(project);
    } catch(err) {
      if (err) {
        isValid = false;

        this.setError(err);
      }
    }

    if (isValid) {
      addProject.call(project, (err, res) => {
        if (err) {
          console.error(err.error);
        } else {
          this.cleanForm();
        }
      });
    }
  }

  setError(err) {
    debugger
    this.setState({
      validationError: err.reason,
    });
  }

  render() {
    return(
      <form onSubmit={this.onSubmitHandle}>

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-4'>
            <label className='grid-column margin-bottom-small'>
              Name
              <input className='pt-input margin-top-micro' type='text' name='project-name-input' onChange={this.onNameChange} value={this.state.name} placeholder='Project title' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-4'>
            <label className='grid-column margin-bottom-small'>
              URL
              <input className='pt-input margin-top-micro' type='text' name='project-url-input' onChange={this.onUrlChange} value={this.state.url} placeholder='http://' />
            </label>
          </div>
        </div>

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-4'>
            <label className='grid-column margin-bottom-small'>
              Client
              <input className='pt-input margin-top-micro' type='text' name='project-client-input' onChange={this.onClientChange} value={this.state.client} placeholder='Client' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-4 grid-row align-items-end margin-bottom-small'>
            <button className='pt-button margin-top-micro'>Add New Client</button>
          </div>
        </div>

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-3'>
            <label className='grid-column margin-bottom-small'>
              Quote Days (min)
              <input className='pt-input margin-top-micro' type='number' name='project-time-min-input' onChange={this.onMinDaysChange} value={this.state.minDays} placeholder='Min' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-3'>
            <label className='grid-column margin-bottom-small'>
              Quote Days (max)
              <input className='pt-input margin-top-micro' type='number' name='project-time-max-input' onChange={this.onMaxDaysChange} value={this.state.maxDays} placeholder='Max' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-3'>
            <label className='grid-column margin-bottom-small'>
              Quote Rate
              <input className='pt-input margin-top-micro' type='number' name='project-rate-input' onChange={this.onRateChange} value={this.state.rate} placeholder='Rate' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-3'>
            <label className='grid-column margin-bottom-small'>
              Quote Currency
              <select className='pt-input margin-top-micro' name='project-currency-input' onChange={this.onCurrencyChange} value={this.state.currency}>
                <option value='MXN'>MXN</option>
                <option value='USD'>USD</option>
                <option value='GBP'>GBP</option>
                <option value='EUR'>EUR</option>
              </select>
            </label>
          </div>
        </div>

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-4'>
            <p>Total quote</p>
            <p>{this.state.minQuote} - {this.state.maxQuote} {this.state.currency}</p>
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
            <button type='submit' className='pt-button pt-large'>Add Project</button>
            <a type='submit' className='pt-button pt-large' onClick={this.cleanForm.bind(this)}>Reset Project</a>
          </div>
        </div>

      </form>
    );
  }
};
