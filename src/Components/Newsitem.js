import React, { Component } from 'react'


export default class Newsitem extends Component {
  render(props) {

    let  {title, description,Urlimage,Urlread}= this.props;
    return (
      
          <div className="card" >
  <img src={Urlimage} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={Urlread} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
  </div>
</div>
      
    
    )
  }
}
