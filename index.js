const express = require('express')
const app = express()
const cors = require('cors')

const port = process.env.PORT || 3001;

// const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const { DB_URL, DB_NAME } = require('./config')

let db = null

MongoClient.connect(DB_URL, { useNewUrlParser: true }, (err, client) => {
	assert.equal(null, err)
	console.log('Successfully Connected')
	
	db = client.db(DB_NAME)
})

// Allow all
app.use(cors())

app.get('/hero_counters', async (req, res) => {
	
	try {
		db.listCollections().toArray(function(err, collInfos) {

		});

		const counters = await db.collection('hero_counters')
		counters.find({}).toArray((err, items) => {
			res.json(items)
		})
		
	} catch(err) {
		console.log('err: ' + err)

		return res.json({ error: 'DB Query failed' })
	}
})

app.get('/hero_combos', async (req, res) => {
	
	try {
		const combos = await db.collection('hero_combos')
		combos.find({}).toArray((err, items) => {
			res.json(items)
		})
		
	} catch(err) {
		console.log('err: ' + err)

		return res.json({ error: 'DB Query failed' })
	}
})


app.listen(port, () => {
	console.log('Listening to port' + port)
})