require('dotenv/config')
const Promise = require('bluebird')
const redis = Promise.promisifyAll(require('redis'))
const redisClient = redis.createClient()
const { successResponse, errorResponse } = require('../responsers')

function cache(req, res, next) {
	const id = req.params.id
	redisClient.getAsync(id)
	.then(response => {
		if(response) {
			res.status(200).json(JSON.parse(response))
		}else {
			next()
		}
	})
}

module.exports = cache
