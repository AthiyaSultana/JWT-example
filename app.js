const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.get('/api', (req, res) => {
    res.status(200).send({message: 'App worked'});
});
app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authcode) => {
        if (!err) {
            res.status(200).send({authcode});
        } else {
            res.sendStatus(403);
        }
    });
});
app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'Athiya',
        email: 'athiya@mailinator.com'
    }
    jwt.sign({user: user}, 'secretkey', {expiresIn: '30s'}, (err, token) => {
            if (!err) {
                res.json({token});
            } else {
                console.log('error while sedding token', err);
                res.status(500).send(err);
            }
        }
    )
    ;
});

//verify token
function verifyToken(req, res, next) {
    //get auth header
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')[1];
        console.log('bearer', bearer);
        req.token = bearer;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(3000, () => console.log('server started on 3000'));