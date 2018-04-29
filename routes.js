class ViewRouter {
    constructor(passport) {
        this.passport = passport;
    }

    router() {
        const router = require('express').Router();

        router.get('/', (req, res) => {
            res.sendFile(__dirname + "/views/login.html");
        })

        router.post('/login', this.passport.authenticate('local-login', {
            successRedirect: '/homepage',
            failureRedirect: '/error'
        }));

        router.get('/homepage', (req, res) => {
            console.log("going to homepage")
            res.sendFile(__dirname + "/views/index.html");
        })

        router.get('/error', (req, res) => {
            console.log("Getting an error")
            res.status(400).end();
        })

        return router;
    }
}

module.exports = ViewRouter;