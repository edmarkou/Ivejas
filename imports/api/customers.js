import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Customers = new Mongo.Collection('customers');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('customers', () => {
    return Customers.find({}, { sort: { addedAt: -1 } });
  });
}

Meteor.methods({
  'customers.insert'(data) {
    check(data, Object);
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Customers.insert({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      age: data.age,
      status: false,
      addedAt: new Date()
    });
  },
  'customers.remove'(id) {
    check(id, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Customers.remove(id);
  },
  'customers.setStatus'(id, status) {
    check(id, String);
    check(status, Boolean);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Customers.update(id, { $set: { status } });
  },
  'customers.search'(data) {
    check(data, Object);
    Customers.find({
      $or: [
        { firstName: data.firstName },
        { lastName: data.lastName },
        { email: data.email },
      ],
    });
  },
});