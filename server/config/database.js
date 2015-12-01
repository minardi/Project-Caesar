module.exports = {
    url: 'mongodb://localhost/data',
    options: {
        server:  { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    }
};