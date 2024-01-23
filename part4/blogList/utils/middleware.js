const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method, request.path)
    next()
}

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint' })
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }
    next()
}

const userExtractor = (request, response, next) => {
    request.user = jwt.verify(request.token, process.env.SECRET)
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}