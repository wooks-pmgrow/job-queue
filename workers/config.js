const Bull = require('bull')

const connectQueue = (name) => new Bull(name, {
    redis: {  // port: process.env.REDIS_PORT, host: process.env.REDIS_HOST 
      name: 'turple',
      sentinels: [
        {host: 'redis-1', port: 26379},
        {host: 'redis-2', port: 26379},
        {host: 'redis-3', port: 26379},
      ]
    }
})

module.exports = {connectQueue }
