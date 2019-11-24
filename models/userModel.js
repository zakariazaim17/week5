'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM wop_user');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }   
};

const getUser = async (params) => {
  try{
   const [rows] = await promisePool.execute('SELECT * FROM wop_user WHERE user_id = ?;',
    params,
    );
   return rows;
  }catch(e){
    console.log('err',e.message);
  }
};

const addUser = async (params) => {
  try{
    const [rows] = await promisePool.execute('INSERT INTO wop_user (name, email, password) VALUES (?, ?, ?);',
     params,
     );
    return rows;
   }catch(e){
     console.log('err',e.message);
   }
};


module.exports = {
  getAllUsers,
  getUser,
  addUser,
};
