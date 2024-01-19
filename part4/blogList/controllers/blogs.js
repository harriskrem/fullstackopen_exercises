const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');
require('express-async-errors');

blogRouter.get('/', async (request, response) => {
    const blog = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    response.json(blog);
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {

    const activeUser = request.user;
    
    if (!activeUser.id) {
        return response.status(401).json({
            error: 'token invalid'
        });
    }

    const user = await User.findById(activeUser.id);
    
    let newBlog = { ...request.body, user: user.id }

    if (!newBlog.likes) {
        newBlog.likes = 0;
    }
    if (!newBlog.title || !newBlog.url) {
        return response.status(400).end();
    }

    const blog = new Blog(newBlog);

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();

    response.status(201).json(savedBlog);


})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    };

    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.json(updatedNote);

})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

    const blogId = request.params.id;
    const activeUser = request.user

    if (!activeUser.id) {
        return response.status(401).json({
            error: 'token invalid'
        });
    }

    const blog = await Blog.findById(blogId);

    if (blog.user.toString() === activeUser.id.toString()) {
        await Blog.findByIdAndRemove(blogId);
        response.status(204).end();
    } else {
        response.status(400).send('User not authorized')
    }

})

module.exports = blogRouter