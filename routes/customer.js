var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var { Customer } = require('../models/Customer');
var { Address } = require('../models/Address');

/* GET home page. */
router.get('/', function (req, res, next) {
    Customer.find(function (err, cus) {
        if (err) return next(err);
        res.json(cus);
    });
});
// POST
router.post('/', function (req, res, next) {
    Customer.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.get('/:id', function (req, res, next) {
    Customer.findById(req.params.id).populate('Address1')
        .exec(function (err, post) {
            if (err) return next(err);
            res.json(post);

        });
});

router.put('/:id', function (req, res, next) {
    Customer.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.delete('/:id', function (req, res, next) {
    let id = req.params.id;
    Customer.findByIdAndRemove(id, req.body, function (err, post) {
        if (err) return next(err);
        Address.remove({Customer:id},function(err,doc){
            if (err) return next(err);

            res.json(post);
        });
    });
});

//Address
router.post('/address/:id', function (req, res, next) {
    let id = req.params.id;
    Address.create({ address: req.body.address, Customer: id }, function (err, post) {
        if (err) return next(err);
        Customer.findByIdAndUpdate(id, {
            $push: {
                Address1: post
            },
        }, function (err, doc) {
            if (err) return next(err);
        });
        res.json(post);

    });
});

router.get('/address/:id', function (req, res, next) {
    let id = req.params.id;
    Address.findById(id, function (err, data) {
        if (err) return next(err);
        res.json(data);

    });
});

router.put('/address/:id', function (req, res, next) {
    Address.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.delete('/address/:id', function (req, res, next) {
    let id = req.params.id;
    Address.findByIdAndRemove(id, function (err, doc) {
        if (err) return next(err);
        Customer.update({ Address1: id },
            { $pull: { Address1: id } }, function (err, cus) {
                if(err) return next(err);
                res.json(doc);
            })
    });
});


module.exports = router;