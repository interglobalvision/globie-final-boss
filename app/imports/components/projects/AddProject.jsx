import React, { Component } from 'react';

import { SingleInput } from '/imports/components/inputs/SingleInput.jsx';
import { addProject } from '/imports/api/projectsMethods.js';

export class AddProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      url: 'http://',
    };

    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
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

  cleanForm() {
    this.setState({
      name: '',
      url: 'http://',
    });
  }

  onSubmitHandle(event) {
    event.preventDefault();

    const project = {
      name: this.state.name,
      url: this.state.url,
    };

    addProject.call(project, (err, res) => {
      if (err) {
        console.error(err.error);
      } else { 
        this.cleanForm();
      }
    });
  }

  render() {
    return(
      <form onSubmit={this.onSubmitHandle}>

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-4'>
            <label className='pt-label pt-inline'>
              Title
              <input className='pt-input' type='text' name='project-name-input' onChange={this.onNameChange} value={this.state.name} placeholder='Project title' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-4'>
            <label className='pt-label pt-inline'>
              URL
              <input className='pt-input' type='text' name='project-url-input' onChange={this.onUrlChange} value={this.state.url} placeholder='URL' />
            </label>
          </div>
        </div>

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-4'>
            <label className='pt-label pt-inline'>
              Client
              <input className='pt-input' type='text' name='project-client-input' onChange={this.onClientChange} value={this.state.client} placeholder='Client' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-4'>
            <button className='pt-button pt-large'>Add New Client</button>
          </div>
        </div>

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-4'>
            <label className='pt-label pt-inline'>
              Country
              <input className='pt-input' type='text' name='project-country-input' onChange={this.onCountryChange} value={this.state.country} placeholder='Country' />
            </label>
          </div>
        </div>

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-4'>
            <label className='pt-label pt-inline'>
              Quote time
              <input className='pt-input' type='text' name='project-time-input' onChange={this.onTimeChange} value={this.state.time} placeholder='Time' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-4'>
            <label className='pt-label pt-inline'>
              Quote rate
              <input className='pt-input' type='text' name='project-rate-input' onChange={this.onRateChange} value={this.state.rate} placeholder='Rate' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-4'>
            <label className='pt-label pt-inline'>
              Currency
              <input className='pt-input' type='text' name='project-currency-input' onChange={this.onCurrencyChange} value={this.state.currency} placeholder='Currency' />
            </label>
          </div>
        </div>

        <div className='grid-row'>
          <button type='submit' className='pt-button pt-large'>Add Project</button>
        </div>
      </form>
    );
  }
};
