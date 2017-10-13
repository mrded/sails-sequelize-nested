# Sails Sequelize Nested
A simple helper, allows you to do nested creates with [Sequelize](http://sequelizejs.com/) + [Sails](http://sailsjs.com/).

## Installation

- [Latest release](https://github.com/mrded/sails-sequelize-nested/releases)
- `npm install sails-sequelize-nested`

## Motivation
As you may notice, nested create can be really tricky with `sequelize`. You have to include all nested associations like so:

```
Product.create({
  title: 'Chair',
  user: {
    first_name: 'Mick',
    last_name: 'Broadstone',
  }
}, {
  include: [{ association: Product.User }]
});
```

Things are getting even more complicated if you have an association including another association.

```
Product.create({
  title: 'Chair',
  user: {
    first_name: 'Mick',
    last_name: 'Broadstone',
    address: {
      city: 'Austin',
      state: 'TX',
      zip: '78704'
    }
  }
}, {
  include: [{
    association: Product.User,
    include: [ User.Address ]
  }]
});
```

You constantly need to track all includes. I don't really understand why it was made that complicated way in `sequelize`. You can read all includes from the schema, and add it if needed automatically. 

## Avaliable methods

- `Model.createNested(record)`

|   | Argument | Type         | Details                          |
|---|----------|--------------|----------------------------------|
| 1 | model    | `String`     | A model name.                    |
| 2 | record   | `Object`     | An Object that is to be created. |


**Returns:** `Promise`

## Usage
Consider the following models:

```
const Product = this.sequelize.define('product', {
  title: Sequelize.STRING
});
const User = this.sequelize.define('user', {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING
});
const Address = this.sequelize.define('address', {
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.STRING,
});

Product.User = Product.belongsTo(User);
User.Address = User.belongsTo(Address);
```

The module extends `sails` models with `nested` methods.

A new `Product`, `User`, and `Address` can be created in one step in the following way:
```
Product.createNested({
  title: 'Chair',
  user: {
    first_name: 'Mick',
    last_name: 'Broadstone',
    address: {
      city: 'Austin',
      state: 'TX',
      zip: '78704'
    }
  }
});
```
