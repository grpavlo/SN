const  Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')

router.post('/registration', (req, res) => {
    userController.registration(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.post('/login', (req, res) => {
    userController.login(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.post('/forgot', (req, res) => {
    userController.forgot(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.post('/newPost', (req, res) => {
    userController.newPost(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.post('/getId', (req, res) => {
    userController.getId(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.get('/newPostDB', (req, res) => {
    userController.newPostDB(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.post('/profile', (req, res) => {
    userController.profile(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.put('/change', (req, res) => {
    userController.change(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

module.exports = router