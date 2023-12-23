const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0;
    }
    if (blogs.length === 1) {
        return blogs[0].likes;
    }
    return blogs.reduce((acc, index) => acc + index.likes, 0);
}

const favoriteBlog = (blogs) => {
    const result = blogs.reduce((acc, blog) => {
        if (!acc.likes) {
            return blog;
        }
        if (blog.likes > acc.likes) {
            return blog;
        } else {
            return acc;
        }
    }, {})
    
    return result;
}

const mostBlogs = (blogs) => {
    const count = _.countBy(blogs, "author"); // counting the blogs for each author
    const mappedObjs = _.map(count, (val, key) => ({ author: key, blogs: val })); // mapping to correct obj requirements
    const result = _.maxBy(mappedObjs, (o) => o.blogs); // get the max number of blogs
    return result;
}

const mostLikes = (blogs) => {
    // grouping by author
    const groupped = _.groupBy(blogs, 'author');
    // for each author count the likes and return them. Then make the object to meet the requirements
    const mappedObjs = _.map(groupped, (val, key) => ({ author: key, likes: _.reduce(val, (sum, n) => sum + n.likes, 0) }))
    // get the object with most likes 
    const result = _.maxBy(mappedObjs, (o) => o.likes);
    
    return result;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}