const express = require('express');
const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();

let path = require('path');
let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');

app.use('/', express.static(__dirname + './../dist'));

app.use(bodyParser.json());

app.get('/todo', (req, res) => {
  Todo.find().then((todos) => {
    res.send(todos);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.post('/todo/:id', (req, res) => {
  let id = req.body.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send(e)
  });
});

app.post('/todo', (req, res) => {

  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.patch('/todo/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {
      $set: body
    },
    {new: true}
  ).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './../dist/index.html'));
});

app.listen(3000, () => {
  console.log('Express server start at 3000 port');
});
