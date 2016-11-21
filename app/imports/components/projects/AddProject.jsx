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
        <label className='pt-label pt-inline'>
          Name
          <input className='pt-input' type='text' name='project-name-input' onChange={this.onNameChange} value={this.state.name} placeholder='Project name/title' />
        </label>
        <label className='pt-label pt-inline'>
          URL
          <input className='pt-input' type='text' name='project-url-input' onChange={this.onUrlChange} value={this.state.url} placeholder='URL' />
        </label>
        <button type='submit' className='pt-button pt-large'>Add Project</button>
      </form>
    );
  }
};
