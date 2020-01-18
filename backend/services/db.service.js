
const MongoClient = require('mongodb').MongoClient;

const config  =  require('../config')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'MEAL_DB';

var dbConn = null;

async function getCollection(collectionName) {
    console.log("DB getCollection -> ",collectionName);
    
    const db = await connect()
    console.log("DB getCollection -> connect",db);

    return db.collection(collectionName);
}

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(config.dbURL, {useNewUrlParser: true});
        const db = client.db(dbName);
        dbConn = db;
        console.log("DB connect -> connect",db);
        return db;
    } catch(err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}




