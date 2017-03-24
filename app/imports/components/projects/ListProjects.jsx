import React, { Component } from 'react';

import { ListProjectsItem } from '/imports/components/projects/ListProjectsItem.jsx';

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
          <ListProjectsItem project={project} key={project._id} />
        ))}
      </section>
    )
  }

}