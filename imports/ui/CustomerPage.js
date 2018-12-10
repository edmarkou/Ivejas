import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
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
  searchButton: {
    marginRight: 5,
    background: '#D1BA78'
  },
  icon: {
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
      addAge: '',
      firstName: '',
      lastName: '',
      email: ''
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
      let customer = {
        firstName: this.state.addFirstName,
        lastName: this.state.addLastName,
        email: this.state.addEmail,
        age: this.state.addAge,
      };
      Meteor.call('customers.insert', customer);
      this.setState({
        open: false,
        addEmail: '',
        addFirstName: '',
        addLastName: '',
        addAge: '' });
    }
  };

  changeStatus = (id, bool) => {
    Meteor.call('customers.setStatus', id, bool);
  };

  removeCustomer = id => {
    Meteor.call('customers.remove', id);
  };
  handleSearch = () => {
    let data = {};
    if (this.state.firstName) data.firstName = this.state.firstName;
    if (this.state.lastName) data.lastName = this.state.lastName;
    if (this.state.email) data.email = this.state.email;
    let a = Customers.find({
      $or: [
        { firstName: data.firstName },
        { lastName: data.lastName },
        { email: data.email },
      ],
    }).fetch();
    console.log(a);
  };
  handleInputChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  };

  render() {
    return(
      <div style={styles.container}>
        <h1 style={{marginLeft: 10}}>Customers</h1>
        <div style={styles.buttons}>
          <Fab size={'small'}
               style={styles.searchButton}
               onClick={this.handleSearch}
          >
            <SearchIcon style={styles.icon}/>
          </Fab>
          <Fab size={'small'}
               style={styles.addButton}
               disabled={!this.props.currentUser}
               onClick={this.handleClickOpen}
          >
            <AddIcon style={styles.icon}/>
          </Fab>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle>Add new customer</DialogTitle>
            <input value={this.state.addFirstName}
                   id={'addFirstName'}
                   onChange={this.handleInputChange}
                   placeholder={"First name"}
                   style={styles.addInput}
            />
            <input value={this.state.addLastName}
                   id={'addLastName'}
                   onChange={this.handleInputChange}
                   placeholder={"Last name"}
                   style={styles.addInput}
            />
            <input value={this.state.addEmail}
                   id={'addEmail'}
                   onChange={this.handleInputChange}
                   placeholder={"Email"}
                   style={styles.addInput}
            />
            <input value={this.state.addAge}
                   id={'addAge'}
                   onChange={this.handleInputChange}
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
          <input
            style={{...styles.searchInput, marginLeft: 100}}
            value={this.state.firstName}
            id={'firstName'}
            onChange={this.handleInputChange}
          />
          <input
            style={styles.searchInput}
            value={this.state.lastName}
            id={'lastName'}
            onChange={this.handleInputChange}
          />
          <input
            style={styles.searchInput}
            value={this.state.email}
            id={'email'}
            onChange={this.handleInputChange}
          />
          <button
            type="button"
            className="btn btn-secondary"
            style={{marginLeft: 230}}
            onClick={() => this.setState({firstName: '', lastName: '', email: ''})}
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
              removeCustomer={this.removeCustomer}
              changeStatus={this.changeStatus}
            />
          })}
        </ul>
      </div>
    )
  }
}
export default withTracker(() => {
  Meteor.subscribe('customers');
  return {
    customers: Customers.find({}, { sort: { addedAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(CustomerPage);