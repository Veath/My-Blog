const express =require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const path = require('path');
const fs = require('fs');
const join = path.join

function photoRouter(dir, uploadMulter) {
    router.get('/', (req, res, next) => {
        Photo.find({}, (err, photos) => {
            if (err) next(err);
            res.render('photos', {
                title: 'Photos',
                photos,
            });
        })
    });
    router.get('/upload', (req, res, next) => {
        res.render('photos/upload', {
            title: 'Photo upload'
        });
    });
    router.get('/photo/:id/download', (req, res, next) => {
        const id = req.params.id;
        Photo.findById(id, (err, photo) => {
            if (err) return next(err);
            const path = join(dir, photo.path + '.png');
            res.download(path, photo.name + '.jpeg');
        });
    });
    router.post('/upload', uploadMulter.any(), (req, res, next) => {
        const img = req.files[0];
        const name = req.body.photo.name || ima.name;
        const path = join(dir, img.filename);
        console.log(img.path);
        fs.rename(img.path, path + '.' + img.mimetype.split('/')[1], (err) => {
            if (err) return next(err);
            Photo.create({
                name: name,
                path: img.filename
            }, (err) => {
                if (err) return next(err);
                res.redirect('/');
            });
        });
    });
    return router;
}
module.exports = photoRouter;