import React, { Component } from 'react';
import smartSearch from 'smart-search';
import _ from 'lodash';

import { SingleInput } from '/imports/components/inputs/SingleInput.jsx';
import { addProject } from '/imports/api/projectsMethods.js';
import { ProjectSchema } from '/imports/schemas/ProjectSchema.js';

import { addCustomer } from '/imports/api/customersMethods.js';

export class AddProject extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitalState();

    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onCustomerChange = this.onCustomerChange.bind(this);
    this.onCustomerFocus = this.onCustomerFocus.bind(this);
    this.onCustomerBlur = this.onCustomerBlur.bind(this);
    this.onCustomerClick = this.onCustomerClick.bind(this);
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
      customer: '',
      customerId: '',
      minDays: 0,
      maxDays: 0,
      rate: 0,
      currency: 'MXN',
      minQuote: 0,
      maxQuote: 0,
      customerResults: {},
      customerFocus: false,
      validationError: undefined,
    };
  }

  getCurrentCleanState() {
    return this.cleanObject({
      name: this.state.name,
      url: this.state.url,
      customer: this.state.customer,
      customerId: this.state.customerId,
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

  onCustomerChange(e) {
    if (this.props.customers) {
      this.setCustomerResults(e.target.value);
    }

    this.setState({
      customer: e.target.value,
    });
  }

  onCustomerFocus() {
    this.clearCustomerTimer();
    this.setState({
      customerFocus: true,
    });
  }

  onCustomerBlur() {
    var _this = this;

    this.customerTimer = setTimeout(function() {
      _this.clearCustomerTimer();
      _this.setState({
        customerFocus: false,
      });
    }, 100);
  }

  clearCustomerTimer() {
    if(typeof this.customerTimer == "number") {
      clearTimeout(this.customerTimer);
      delete this.customerTimer;
    }
  }

  setCustomerResults(query) {
    let results = smartSearch(this.props.customers, query, {name: true});

    let customerResults = {};

    if (results !== undefined) {
      customerResults = results;
    }

    this.setState({
      customerResults: customerResults,
    });
  }

  onCustomerClick(e) {
    this.setState({
      customer: e.target.firstChild.nodeValue,
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

  validateProject() {
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

  onSubmitHandle(event) {
    event.preventDefault();

    let customerIndex = _.findIndex(this.props.customers, { name: this.state.customer });

    if (customerIndex === -1) {
      // Customer does not exist in props array of customers
      let customer = { name: this.state.customer };

      addCustomer.call(customer, (err, res) => {
        if (err) {
          console.error(err.error);
        } else {
          this.setState({
            // set customer ID from method return value
            customerId: res,
          }, () => {
            // after state set, validate project
            this.validateProject();
          });
        }
      });

    } else {
      // Customer exists
      this.setState({
        // set customer ID from array of customers in props
        customerId: this.props.customers[customerIndex]._id,
      }, () => {
        // after state set, validate project
        this.validateProject();
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
          <div className='grid-item item-s-12 item-m-4 margin-bottom-small'>
            <label className='grid-column'>
              Name
              <input className='pt-input margin-top-micro' type='text' name='project-name-input' autoComplete='off' onChange={this.onNameChange} value={this.state.name} placeholder='Project title' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-4 margin-bottom-small'>
            <label className='grid-column'>
              URL
              <input className='pt-input margin-top-micro' type='text' name='project-url-input' autoComplete='off' onChange={this.onUrlChange} value={this.state.url} placeholder='http://' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-4 margin-bottom-small'>
            <label className='grid-column'>
              Customer
              <input className='pt-input margin-top-micro' type='text' name='project-customer-input' autoComplete='off' onChange={this.onCustomerChange} onFocus={this.onCustomerFocus} onBlur={this.onCustomerBlur} value={this.state.customer} placeholder='Customer' />
            </label>
            {this.state.customerResults.length > 0 && this.state.customerFocus &&
            <div id='customer-search-holder'>
              <div id='customer-search-results' className='pt-popover pt-minimal'>
                <div className='pt-popover-content'>
                  <ul className='pt-menu'>
                    {this.state.customerResults.map((customer) => {
                      return <li className='pt-menu-item' onClick={this.onCustomerClick} key={customer.entry._id}>{customer.entry.name}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>
            }
          </div>
        </div>

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-3 margin-bottom-small'>
            <label className='grid-column'>
              Quote Days (min)
              <input className='pt-input margin-top-micro' type='number' name='project-time-min-input' onChange={this.onMinDaysChange} value={this.state.minDays} placeholder='Min' min='1' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-3 margin-bottom-small'>
            <label className='grid-column'>
              Quote Days (max)
              <input className='pt-input margin-top-micro' type='number' name='project-time-max-input' onChange={this.onMaxDaysChange} value={this.state.maxDays} placeholder='Max' min='1' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-3 margin-bottom-small'>
            <label className='grid-column'>
              Quote Rate
              <input className='pt-input margin-top-micro' type='number' name='project-rate-input' onChange={this.onRateChange} value={this.state.rate} placeholder='Rate' />
            </label>
          </div>
          <div className='grid-item item-s-12 item-m-3 margin-bottom-small'>
            <label className='grid-column'>
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
          </div>
        </div>

      </form>
    );
  }
};
