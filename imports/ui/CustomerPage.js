import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withTracker } from 'meteor/react-meteor-data';

import { Customers } from '../api/customers.js';
import Customer from "./Customer";

const styles = {
  container: {
    width: 1100,
    height: 500,
    margin: 'auto',
    marginTop: 20,
    backgroundColor: 'white',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  addButton: {
    marginRight: 20,
    background: 'pink'
  },
  addIcon: {
    color: 'fff'
  },
  addInput: {
    width: 150,
    margin: 10
  },
  searchInput: {
    marginLeft: 65,
    width: 150,
    marginBottom: 10
  },
  list: {
    listStyleType: 'none',
    paddingLeft: 10,
    height: 300,
    overflow: 'hidden',
    overflowY: 'scroll'
  }
};

class CustomerPage extends Component {
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
    if (this.state.addEmail && this.state.addFirstName && this.state.addLastName && this.state.addAge) {
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
    }
  };

  removeCustomer = id => {
    Customers.remove(id);
  };

  handleAddInputChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  };

  render() {
    return(
      <div style={styles.container}>
        <h1 style={{marginLeft: 10}}>Customers</h1>
        <div style={styles.buttons}>
          <Fab size={'small'}
               style={styles.addButton}
               disabled={!this.props.currentUser}
               onClick={this.handleClickOpen}
          >
            <AddIcon style={styles.addIcon}/>
          </Fab>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle>Add new customer</DialogTitle>
            <input value={this.state.addFirstName}
                   id={'addFirstName'}
                   onChange={this.handleAddInputChange}
                   placeholder={"First name"}
                   style={styles.addInput}
            />
            <input value={this.state.addLastName}
                   id={'addLastName'}
                   onChange={this.handleAddInputChange}
                   placeholder={"Last name"}
                   style={styles.addInput}
            />
            <input value={this.state.addEmail}
                   id={'addEmail'}
                   onChange={this.handleAddInputChange}
                   placeholder={"Email"}
                   style={styles.addInput}
            />
            <input value={this.state.addAge}
                   id={'addAge'}
                   onChange={this.handleAddInputChange}
                   placeholder={"Age"}
                   style={styles.addInput}
            />
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
          <input style={{...styles.searchInput, marginLeft: 100}}/>
          <input style={styles.searchInput}/>
          <input style={styles.searchInput}/>
          <button
            type="button"
            className="btn btn-secondary"
            style={{marginLeft: 230}}
          >
            Reset
          </button>
        </div>
        <ul style={styles.list}>
          {this.props.customers.map((customer, index) => {
            return <Customer
              currentUser={this.props.currentUser}
              key={index}
              customer={customer}
              removeCustomer={this.removeCustomer}/>
          })}
        </ul>
      </div>
    )
  }
}
export default withTracker(() => {
  return {
    customers: Customers.find({}, { sort: { addedAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(CustomerPage);