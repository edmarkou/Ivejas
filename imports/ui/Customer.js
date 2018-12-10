import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import NotDoneIcon from '@material-ui/icons/Clear';

const styles = {
  li: {
    borderTopStyle: 'solid',
    borderTopColor: 'grey',
    borderTopWidth: 0.5
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#31339c'
  },
  firstName: {
    marginLeft: 30,
    display: 'inline-block',
    width: 150
  },
  lastName: {
    marginLeft: 65,
    display: 'inline-block',
    width: 150
  },
  email: {
    marginLeft: 65,
    display: 'inline-block',
    width: 200
  },
  age: {
    marginLeft: 35,
    display: 'inline-block',
    width: 30
  },
  statusIcon: {
    marginLeft: 55,
    display: 'inline-block'
  },
  buttons: {
    color: '#fff',
    border: 'none'
  }
};

export default class Customer extends Component {
  render() {
    return(
      <li style={styles.li}>
        <div style={styles.container}>
          <Avatar style={styles.profileAvatar}>{this.props.customer.firstName.charAt(0).toUpperCase()}</Avatar>
          <span style={styles.firstName}>{this.props.customer.firstName}</span>
          <span style={styles.lastName}>{this.props.customer.lastName}</span>
          <span style={styles.email}>{this.props.customer.email}</span>
          <span style={styles.age}>{this.props.customer.age}</span>
          {this.props.customer.status ? <DoneIcon style={styles.statusIcon}/> : <NotDoneIcon style={styles.statusIcon}/>}
          <Avatar style={{marginLeft: 25, backgroundColor: '#4B9A82', ...styles.buttons}} component={'button'}>
            <EditIcon />
          </Avatar>
          <Avatar style={{marginLeft: 5, backgroundColor: '#ED706A', ...styles.buttons}} component={'button'}
                  onClick={() => this.props.removeCustomer(this.props.customer._id) }>
            <DeleteIcon />
          </Avatar>
        </div>
      </li>
    )
  }
}