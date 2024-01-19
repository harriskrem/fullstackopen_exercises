const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
require('express-async-errors');

usersRouter.get('/', async (request, response) => {
    const user = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 });
    response.json(user);
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;

    if (username.length < 3 || password.length < 3) {
        response.status(400).send('Username and password must be longer than 3 characters').end();
    } else {
        const users = await User.find({});
        const usernames = users.map(user => user.username);

        if (usernames.includes(username)) {
            response.status(400).send('Username must be unique').end();
        } else {
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);
    
            const user = new User({
                username,
                name,
                passwordHash
            })
    
            const savedUser = await user.save();
    
            response.status(201).json(savedUser);
        }

    }
})

module.exports = usersRouter