import React, { Component } from 'react';

export class ListProjectsItem extends Component {
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
          {this.props.project.customer}
        </div>
        <div className='grid-item item-s-3'>
          *deadline*
        </div>
      </div>
    )
  }
}
