const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./utils/config');
const blogRouter = require('./controllers/blogs');
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

console.log('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB: ', error.message)
  })

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
})