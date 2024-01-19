const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const pass1Hash = await bcrypt.hash('sekret', 10);

    let user1 = new User({ username: 'root', name: 'Superuser', passwordHash: pass1Hash, blogs: [] });
    const savedUser1 = await user1.save();

    const pass2Hash = await bcrypt.hash('harriskr', 10);
    let user2 = new User({ username: 'harriskr', name: 'Harris Kr', passwordHash: pass2Hash, blogs: [] })
    const savedUser2 = await user2.save();

    let blogObject1 = new Blog({ ...helper.initialBlogs[0], user: savedUser1.id });
    const savedBlog1 = await blogObject1.save();
    let blogObject2 = new Blog({ ...helper.initialBlogs[1], user: savedUser2.id });
    const savedBlog2 = await blogObject2.save();

    user1.blogs = user1.blogs.concat(savedBlog1.id);
    await user1.save();

    user2.blogs = user2.blogs.concat(savedBlog2.id);
    await user2.save();

}, 10000);

describe('Blog list tests', () => {

    test('4.8 - blogs returned as json', async () => {
        const response = await api.get('/api/blogs');
        const titles = response.body.map(element => element.title);
        expect(titles).toContain('goustarw');
    }, 100000);

    test('4.9 - id blogs verification', async () => {
        const response = await api.get('/api/blogs');
        response.body.forEach(response => {
            expect(response.id).toBeDefined()
        });
    });

    test('4.10', async () => {

        const loginRes =
            await api
                .post('/api/login')
                .send({ username: 'harriskr', password: 'harriskr' })
                .expect(200);

        const activeUser = loginRes.body;

        const blog = {
            title: '4.10 test',
            author: '4.10 author',
            url: '4.10 url',
            likes: 20
        }

        // adding with a token
        await api.post('/api/blogs')
            .send(blog)
            .set('Authorization', `Bearer ${activeUser.token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const newBlogs = await helper.getBlogs();
        expect(newBlogs).toHaveLength(helper.initialBlogs.length + 1);

    }, 10000);

    test('4.11', async () => {

        const loginRes =
            await api
                .post('/api/login')
                .send({ username: 'root', password: 'sekret' })
                .expect(200);

        const activeUser = loginRes.body;

        const blog = {
            title: '4.11 test',
            author: '4.11 test',
            url: '4.11 url'
        }

        const response = await api
            .post('/api/blogs')
            .send(blog)
            .set('Authorization', `Bearer ${activeUser.token}`)

        expect(response.body.likes).toBe(0);
    })

    test('4.12', async () => {

        const loginRes =
            await api
                .post('/api/login')
                .send({ username: 'harriskr', password: 'harriskr' })
                .expect(200);

        const activeUser = loginRes.body;

        const noTitleBlog = {
            title: '',
            author: '4.12 author test',
            url: '4.12 url test',
            likes: 2
        }

        let response = await api
            .post('/api/blogs')
            .send(noTitleBlog)
            .set('Authorization', `Bearer ${activeUser.token}`)

        expect(response.status).toBe(400);

        const noUrlBlog = {
            title: '4.12 title',
            author: '4.12 author',
            url: '',
            likes: 3
        }

        response = await api
            .post('/api/blogs')
            .send(noUrlBlog)
            .set('Authorization', `Bearer ${activeUser.token}`)

        expect(response.status).toBe(400);

    })

    test('4.13', async () => {

        const loginRes =
            await api
                .post('/api/login')
                .send({ username: 'root', password: 'sekret' })
                .expect(200);

        const activeUser = loginRes.body;

        const initialBlogs = await helper.getBlogs();
        const firstBlog = initialBlogs[0];

        await api
            .delete(`/api/blogs/${firstBlog.id}`)
            .set('Authorization', `Bearer ${activeUser.token}`)
            .expect(204);

        const finalBlogs = await helper.getBlogs();
        expect(finalBlogs).toHaveLength(initialBlogs.length - 1);

        const titles = finalBlogs.map(blog => blog.title);
        expect(titles).not.toContain(initialBlogs[0].title);
    })

    test('4.14', async () => {
        const initialBlogs = await helper.getBlogs();
        const originalBlog = initialBlogs[0];

        await api.put(`/api/blogs/${originalBlog.id}`).send({ ...originalBlog, likes: 22 })
            .expect(200);

        const finalBlogs = await helper.getBlogs();
        const updatedBlog = finalBlogs[0];


        expect(updatedBlog.likes).toBe(22);
    })
})

describe('bloglist expansion', () => {

    test('4.15 creating user', async () => {

        const initialUsers = await helper.getAllUsers();
        const newUser = {
            username: 'meli',
            name: 'Harris Kr',
            password: 'meli'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const finalUsers = await helper.getAllUsers();
        expect(finalUsers).toHaveLength(initialUsers.length + 1)

        const usernames = finalUsers.map(user => user.username);
        expect(usernames).toContain(newUser.username);
    }, 5000);

    test('4.16 username and password length', async () => {
        
        const newUser = {
            username: 'ab',
            name: 'Harris Kr',
            password: 'sekr'
        }

        let response = await api.post('/api/users').send(newUser)

        expect(response.status).toBe(400);
        expect(response.error.text).toBe('Username and password must be longer than 3 characters')

        const finalUsers = await helper.getAllUsers();

        const usernames = finalUsers.map(user => user.username);
        expect(usernames).not.toContain(newUser.username);

        const user = {
            username: 'harriskr',
            name: 'harris kr',
            password: 'boubou'
        }

        response = await api.post('/api/users').send(user)

        expect(response.status).toBe(400);
        expect(response.error.text).toBe('Username must be unique')

    });

    test('4.23 no token provided', async () => {

        const blog = {
            title: '4.23 test',
            author: '4.23 test',
            url: '4.23 url'
        }
        
        await api.post('/api/blogs')
            .send(blog)
            .expect(401)
            .expect('Content-Type', /application\/json/);
    })

})

afterAll(async () => {
    await mongoose.connection.close();
});