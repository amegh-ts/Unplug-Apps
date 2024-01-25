const router = require('express').Router();
const BillSchema = require('../Models/BillSchema')

router.post('/', async (req, res) => {
    console.log('req.body', req.body);
    const Data = new BillSchema(req.body)
    console.log('Data?', Data);
    try {
        const savedData = await Data.save();
        console.log('savedData?', savedData);
        res.status(201).json(savedData)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
