const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

// const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const { db_credentials } = require('./config')


const { user, password, host, db_port, database_name } = db_credentials
// const namespace= database_name

const url = `mongodb://${user}:${password}@${host}:${db_port}/${database_name}`

let db = null

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
	assert.equal(null, err)
	console.log('Successfully Connected')
	
	db = client.db(database_name)
})


app.get('/', async (req, res) => {
	
	try {
		const hc = await db.collection('hero_counters')
		hc.find({}).toArray((err, items) => {
			console.log(items) 
			res.json(items)
		})
		
	} catch(err) {
		console.log('err: ' + err)
	}
})

app.listen(port, () => {
	console.log('Listening to port' + port)
})