'use strict';
// Controller

const catModel = require('../models/catModel.js');
const resize = require('../utils/resize.js');
const imageMeta = require ('../utils/imageMeta.js');

//const cats = catModel.cats;

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  await res.json(cats);
};
const cat_create_post = async (req, res) => {
  try {

  
  await resize.makeThumbnail(req.file.path, 
    'thumbnails/' + req.file.filename,
    {width:160, height:160},
    );

    const coords = await imageMeta.getCoordinates(req.file.path);
    console.log('coords', coords);

  const params = [
    req.body.name,
    req.body.age,
    req.body.weight, 
    req.body.owner,
    req.file.filename,
    coords,

  ];
  const response = await catModel.addCat(params);
          await res.json(response);
}catch (e) {
  console.log('error', e);
  res.status(400).json({message: 'error'});

}
};

const cat_get = async (req, res) => {
  const params = [req.params.id];
  const cat = await catModel.getCat(params);
  await res.json(cat[0]);
};
   
const cat_update_put = async (req, res) => {

  const params = [
    req.body.name,
    req.body.age,
    req.body.weight, 
    req.body.owner,
    req.body.id,

  ];
  const response = await catModel.updateCat(params);
          await res.json({message: 'cat modified', response}); 

};

const cat_delete = async(req, res) => {
  const params = [
    req.params.id,
  ];
  const response = await catModel.deleteCat(params);
          await res.json({message: 'cat deleted', response});
};

 

module.exports = {
  cat_list_get,
  cat_create_post,
  cat_get,
  cat_update_put,
  cat_delete,
};