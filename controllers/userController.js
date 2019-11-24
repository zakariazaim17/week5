'use strict';
// Controller

const userModel = require('../models/userModel.js');

//const users = userModel.users;

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

const user_get = async (req, res) => {
  const params = [req.params.id];
  const user = await userModel.getUser(params);
  await res.json(user);
};

const user_create_post = async(req, res) => {
  
 // const {name, email, passwd} = req.body;
  const params = [req.body.name,
              req.body.email,
            req.body.passwd,
          ]; 
          const response = await userModel.addUser(params);
          await res.json({message: 'user added', response});
};

   
module.exports = {
  user_list_get,
  user_get,
  user_create_post,
};