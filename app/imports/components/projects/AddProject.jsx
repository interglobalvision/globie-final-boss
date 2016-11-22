import React, { Component } from 'react';

import { SingleInput } from '/imports/components/inputs/SingleInput.jsx';
import { addProject } from '/imports/api/projectsMethods.js';

export class AddProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      url: 'http://',
      client: '',
      days: 0,
      rate: 0,
      currency: 'MXN',
      quote: 0,
    };

    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onClientChange = this.onClientChange.bind(this);
    this.onDaysChange = this.onDaysChange.bind(this);
    this.onRateChange = this.onRateChange.bind(this);
    this.onCurrencyChange = this.onCurrencyChange.bind(this);
    this.cleanForm = this.cleanForm.bind(this);
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

  onDaysChange(e) {
    this.setState({
      days: e.target.value,
      quote: e.target.value * this.state.rate,
    });
  }

  onRateChange(e) {
    this.setState({
      rate: e.target.value,
      quote: e.target.value * this.state.days,
    });
  }

  onCurrencyChange(e) {
    this.setState({
      currency: e.target.value,
    });
  }

  cleanForm() {
    this.setState({
      name: '',
      url: 'http://',
      client: '',
      days: 0,
      rate: 0,
      currency: 'MXN',
      quote: 0,
    });
  }

  onSubmitHandle(event) {
    event.preventDefault();

    const project = {
      name: this.state.name,
      url: this.state.url,
      client: this.state.client,
      days: this.state.days,
      rate: this.state.rate,
      currency: this.state.currency,
      quote: this.state.quote,
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
            <label className='pt-label'>
              Title
              <input className='pt-input' type='text' name='project-name-input' onChange={this.onNameChange} value={this.state.name} placeholder='Project title' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-4'>
            <label className='pt-label'>
              URL
              <input className='pt-input' type='text' name='project-url-input' onChange={this.onUrlChange} value={this.state.url} placeholder='URL' />
            </label>
          </div>
        </div>

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-4'>
            <label className='pt-label'>
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
            <label className='pt-label'>
              Quote Days
              <input className='pt-input' type='text' name='project-time-input' onChange={this.onDaysChange} value={this.state.days} placeholder='Days' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-4'>
            <label className='pt-label'>
              Quote Rate
              <input className='pt-input' type='text' name='project-rate-input' onChange={this.onRateChange} value={this.state.rate} placeholder='Rate' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-4'>
            <label className='pt-label'>
              Quote Currency
              <select className='pt-input' name='project-currency-input' onChange={this.onCurrencyChange} value={this.state.currency}>
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
            <label className='pt-label'>
              <div className='pt-inline'>Total quote</div>
              <input className='pt-input' type='text' name='project-total-client' value={this.state.quote} disabled='true'></input>
            </label>
          </div>
        </div>

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-4'>
            <button type='submit' className='pt-button pt-large'>Add Project</button>
          </div>
        </div>

      </form>
    );
  }
};
