import React, { Component } from 'react';

export class ListProjects extends Component {

  render() {
    return(
      <section id='projects-list'>
        <div className='grid-row margin-bottom-small'>
          <section className='grid-item item-s-12'>
            <h2>Projects</h2>
          </section>
        </div>
        {this.props.projects.map((project, key) => (
          <ListProject project={project} key={project._id} />
        ))}
      </section>
    )
  }

}

export class ListProject extends Component {
  render() {
    return(
      <div className='grid-row margin-bottom-small'>
        <div className='grid-item item-s-3'>
          {this.props.project.name}
        </div>
        <div className='grid-item item-s-4'>
          {this.props.project.url}
        </div>
        <div className='grid-item item-s-2'>
          {this.props.project.client}
        </div>
        <div className='grid-item item-s-3'>
          *deadline*
        </div>
      </div>
    )
  }
}