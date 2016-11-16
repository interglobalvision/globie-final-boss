import React, { Component } from 'react';

import { ProjectForm } from '/imports/components/projects/ProjectForm.jsx';
import { SingleInput } from '/imports/components/inputs/SingleInput.jsx';

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

  onSubmitHandle(event) {
    event.preventDefault();

    const project = {
      name: this.state.name,
      url: this.state.url,
    };

    console.log(project);
  }

  render() {
    return(
      <form onSubmit={this.onSubmitHandle}>
        <SingleInput  inputType='text' title='Project Name' name='project-name-input' controlFunc={this.onNameChange} content={this.state.name} placeholder='Project name/title' />
        <SingleInput  inputType='text' title='URL' name='project-url-input' controlFunc={this.onUrlChange} content={this.state.url} placeholder='URL' />
        <input type="submit" value="Submit" />
      </form>
    );
  }
};
