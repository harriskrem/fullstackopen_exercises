const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
    {
        title: 'i dont know man',
        author: 'o lol',
        url: 'ohnonono',
        likes: 12
    },
    {
        title: 'goustarw',
        author: 'tourourou',
        url: 'xa',
        likes: 5
    }
]

const getBlogs = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON());
}

const getAllUsers = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
}

module.exports = {
    initialBlogs,
    getBlogs,
    getAllUsers
}