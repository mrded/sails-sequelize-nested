# sails-sequelize-nested
A simple helper, allows you to do nested creates with Sequelize (Sails v1.0).

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
    addresses: [{
      type: 'home',
      line_1: '100 Main St.',
      city: 'Austin',
      state: 'TX',
      zip: '78704'
    }]
  }
}, {
  include: [{
    association: Product.User,
    include: [ User.Addresses ]
  }]
});
```

You constantly need to track all includes. I don't really understand why it was made that complicated way in `sequelize`. You can read all includes from the schema, and add it if needed automatically. 
