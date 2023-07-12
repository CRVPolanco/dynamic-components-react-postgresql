const express = require('express');
const router = express.Router();
const GlobalService = require('../service/global.service');
const service = new GlobalService();

router.get('/catalog-dialogs', async (req, res, next) => {
  try{
    const data = await service.getCatalog();
    res.status(200).json(data);
  }catch(e){
    console.error(e);
  }
});

router.get('/:tableName', async (req, res, next) => {
  try{

    const { tableName } = req.params;
    const data = await service.getUniqueData(tableName);

    res.status(200).json(data);

  }catch(e){
    console.error(e);
  }

});

router.post('/', async (req, res, next) => {
  try{
    const body = req.body;
    const tableObjetive = body.tableObjetive;

    delete body.id;
    delete body.tableObjetive;

    const data = await service.postData(body, tableObjetive);

    res.status(201).json(data);
  }catch(e){
    console.error(e);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;

    const tableObjetive = body.tableObjetive;
    delete body.tableObjetive;

    const data = await service.updateData(id, body, tableObjetive);

    res.status(201).json(data);
  }catch(e){
    console.error(e);
  }
});

router.delete('/:tableName', async (req, res, next) => {
  try{

    const { tableName } = req.params;
    const deleteAll = await service.clearAll(tableName);
    res.status(201).json(deleteAll);

  }catch(e){
    console.error(e);
  }
});


router.delete('/:tableName/:id', async(req, res, next) => {
  try{
    const { tableName, id } = req.params;

    const deleteData = await service.deleteData(id, tableName);

    res.status(201).json(deleteData);
  }catch(e){
    console.error(e);
  }
});



module.exports = router;
