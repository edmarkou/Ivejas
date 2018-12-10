import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withTracker } from 'meteor/react-meteor-data';

import { Customers } from '../api/customers.js';
import Customer from "./Customer";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      addEmail: '',
      addFirstName: '',
      addLastName: '',
      addAge: ''
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAddClose = () => {
    Customers.insert({
      firstName: this.state.addFirstName,
      lastName: this.state.addLastName,
      email: this.state.addEmail,
      age: this.state.addAge,
      status: false,
      addedAt: new Date()
    });

    this.setState({
      open: false,
      addEmail: '',
      addFirstName: '',
      addLastName: '',
      addAge: '' });
  };

  removeCustomer = id => {
    Customers.remove(id);
  };

  handleAddInputChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  };

  render(){
    return(
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          <div style={{width: 200, borderRightStyle: 'solid', borderRightColor: 'grey', borderRightWidth: 1}}>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active">Account</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Customer</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">About</a>
              </li>
            </ul>
          </div>
          <div style={{width: 1000, height: 500, margin: 'auto', marginTop: 20, backgroundColor: 'white',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
            <h1 style={{marginLeft: 10}}>Customers</h1>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Avatar style={{marginRight: 20, background: 'pink', border: 'none'}} component={'button'} onClick={this.handleClickOpen}>
                <AddIcon/>
              </Avatar>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle>Add new customer</DialogTitle>
                <input value={this.state.addFirstName}
                       id={'addFirstName'} onChange={this.handleAddInputChange} placeholder={"First name"} style={{width: 150, margin: 10}}/>
                <input value={this.state.addLastName}
                       id={'addLastName'} onChange={this.handleAddInputChange} placeholder={"Last name"} style={{width: 150, margin: 10}}/>
                <input value={this.state.addEmail}
                       id={'addEmail'} onChange={this.handleAddInputChange} placeholder={"Email"} style={{width: 150, margin: 10}}/>
                <input value={this.state.addAge}
                       id={'addAge'} onChange={this.handleAddInputChange} placeholder={"Age"} style={{width: 150, margin: 10}}/>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleAddClose} color="primary">
                    Add
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div style={{borderBottomStyle: 'solid', borderBottomWidth: 0.5}}>
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
            <ul style={{listStyleType: 'none', paddingLeft: 10, height: 232, overflow: 'hidden', overflowY: 'scroll'}}>
              {this.props.customers.map((customer, index) => {
                return <Customer key={index} customer={customer} removeCustomer={this.removeCustomer}/>
              })}
            </ul>
          </div>
      </div>
    );
  }
}
export default withTracker(() => {
  return {
    customers: Customers.find({}, { sort: { addedAt: -1 } }).fetch(),
  };
})(App);