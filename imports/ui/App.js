import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';

import { withTracker } from 'meteor/react-meteor-data';

import { Customers } from '../api/customers.js';

class App extends Component{

  componentDidMount() {
    console.log(this.props.customers);
  }

  render(){
    return(
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          <div style={{width: 200, borderRightStyle: 'solid', borderRightColor: 'grey', borderRightWidth: 1}}>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active">Account</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Item</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Item</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Item</a>
              </li>
            </ul>
          </div>
          <div style={{width: 1000, height: 500, margin: 'auto', marginTop: 20, backgroundColor: 'white',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
            <h1 style={{marginLeft: 10}}>Customers</h1>
            <div style={{borderBottomStyle: 'solid', borderBottomWidth: 0.5, marginTop: 25}}>
              <span style={{marginLeft: 100}}>First name</span>
              <span style={{marginLeft: 150}}>Last name</span>
              <span style={{marginLeft: 150}}>Email</span>
              <span style={{marginLeft: 200}}>Age</span>
              <span style={{marginLeft: 50}}>Status</span>
            </div>
            <div style={{marginTop: 5}}>
              <input style={{marginLeft: 100, width: 150, marginBottom: 10}}/>
              <input style={{marginLeft: 65, width: 150, marginBottom: 10}}/>
              <input style={{marginLeft: 65, width: 150, marginBottom: 10}}/>
              <button type="button" className="btn btn-secondary" style={{marginLeft: 230}}>Reset</button>
            </div>
            <ul style={{listStyleType: 'none', paddingLeft: 10}}>
              <li style={{borderTopStyle: 'solid', borderTopColor: 'grey', borderTopWidth: 0.5}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <Avatar style={{margin: 10, color: '#fff'}}>N</Avatar>
                  <span style={{marginLeft: 30, display: 'inline-block', width: 150}}>Annsddsda</span>
                  <span style={{marginLeft: 65, display: 'inline-block', width: 150}}>Anna</span>
                  <span style={{marginLeft: 65, display: 'inline-block', width: 200}}>Anna</span>
                  <span style={{marginLeft: 35, display: 'inline-block', width: 30}}>21</span>
                  <span style={{marginLeft: 60, display: 'inline-block', width: 20}}>X</span>
                  <Avatar style={{marginLeft: 25, color: '#fff', border: 'none'}} component={'button'}>
                    <FolderIcon />
                  </Avatar>
                  <Avatar style={{marginLeft: 5, color: '#fff', border: 'none'}} component={'button'}>
                    <FolderIcon />
                  </Avatar>
                </div>
              </li>
              <li style={{borderTopStyle: 'solid', borderTopColor: 'grey', borderTopWidth: 0.5}}>
                <Avatar style={{margin: 10, color: '#fff'}}>N</Avatar>
              </li>
              <li style={{borderTopStyle: 'solid', borderTopColor: 'grey', borderTopWidth: 0.5}}>
                <Avatar style={{margin: 10, color: '#fff'}}>N</Avatar>
              </li>
              <li style={{borderTopStyle: 'solid', borderTopColor: 'grey', borderTopWidth: 0.5}}>
                <Avatar style={{margin: 10, color: '#fff'}}>N</Avatar>
              </li>
            </ul>
          </div>
      </div>
    );
  }
}
export default withTracker(() => {
  return {
    customers: Customers.find({}).fetch(),
  };
})(App);