const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const config = require('../utils/config')
const User = require('../models/user')
const mongoose = require('mongoose')
const JiraClient = require('jira-connector')
const bcrypt = require('bcrypt')

let idToBeDeleted = ''
let initialUserID = ''
let rootToken = undefined


// setting up test data
const initialIssues = [
	{
		"title": "Ari's first blog",
		"author": "Ari Lahti",
		"url": "https://jotain.jossain",
		"likes": 1
	},
	{
		"title": "And now to something completely different",
		"author": "John Cleese",
		"url": "https://muuta.muualla",
		"likes": 2,
	}
]

const addedIssue =
  {
    "title": "This is getting way too silly",
    "author": "Terry Gilliam",
    "url": "https://jotain.jossain",
    "likes": 1
  }

const noLikes =
  {
  	"title": "This is an ex-parrot",
  	"author": "Graham Chapman",
  	"url": "https://jotain.jossain"
  }

const newUser =
  {
  	username: 'mluukkai',
  	name: 'Matti Luukkainen',
  	password: 'salainen'
  }

const wrongUser =
  {
  	username: 'salainen',
  	name: 'Jukka Luukkainen',
  	password: 'wererewr'
  }


beforeAll(async () => {
	// empty database

	initiateConnection()
	await User.remove({})


	// add initial data
	const saltRounds = 10
	const passwordHash = await bcrypt.hash('sekret', saltRounds)
	const user = new User({
		username: 'root',
		name: 'Test user',
		passwordHash
	})

	await user.save()
	initialUserID = user.id
	// it seems that it works with the API, but test is broken
	// so, even though it is a bit stupid, I'll refactor the code so
	// the we use API...

	// and we have to sign in...
	rootToken = await signIn({'username':'root', 'password': 'sekret'})
	for (let i = 0; i < initialIssues.length; i++) {
		const newIssue = await api
		.post('/api/jira')
		.set('data-type', 'application/json')
		.set('Authorization', rootToken)
		.send(initialIssues[i])
	}


})

describe('jira API tests', () => {

  describe('log in to jira with en values', () => {
    test('first with wrongUser', async () => {
        const jira = new JiraClient( {
          host: config.jiraURL,
          basic_auth: {
              username: 'höpöhöpö',
              password: 'höpöhöpö'
          }
        })
        console.log('jira', jira)
      })

    test('then with wrong psw', async () => {
        const jira = new JiraClient( {
          host: config.jiraURL,
          basic_auth: {
              username: config.jiraUser,
              password: 'höpöhöpö'
          }
        })
        console.log('jira', jira)
      })

    test('then correct ones', async () => {
          const jira = new JiraClient( {
            host: config.jiraURL,
            basic_auth: {
                username: config.jiraUser,
                password: config.jiraPsw
            }
          })
          console.log('jira', jira)
        })
  })

	describe('get part of API', () => {
		test('issues are returned as json', async () => {
	  	const response = await api
	    	.get('/api/jira')
	    	.expect(200)
	    	.expect('Content-Type', /application\/json/)
			})

			test('issuess contain correct number', async () => {
				const response = await api
				.get('/api/jira')

				expect(response.body.length).toBe(2)
			})

			test('issues contain  correct title', async () => {
				const response = await api
				.get('/api/jira')

				const contents = response.body.map(r => r.title)
				expect(contents).toContainEqual('And now to something completely different')
			})

		})

	describe('post part of API', () => {

		test('before auth nothing can be added (no token)', async () => {
			const newIssue = await api
			.post('/api/jira')
			.set('data-type', 'application/json')
			.send(addedIssue)
			.expect(401)
		})
		test('before auth nothing can be added (bogus token)', async () => {
			const newIssue = await api
			.post('/api/jira')
			.set('data-type', 'application/json')
			.set('Authorization', 'application/json')
			.send(addedIssue)
			.expect(401)
		})


		test('valid new object can be added', async () => {
			addedIssue.user = initialUserID
			const newIssue = await api
			.post('/api/jira')
			.set('data-type', 'application/json')
			.set('Authorization', rootToken)
			.send(addedIssue)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		})

		test('added data is correct', async () => {
			const response = await api
				.get('/api/jira')
  		const contents = response.body.map(r => r.title)

  		expect(response.body.length).toBe(initialIssues.length + 1)
  		expect(contents).toContainEqual('This is getting way too silly')

		})
		test('no likes', async () => {
			noLikes.user = initialUserID
			const newIssue = await api
			.post('/api/jira')
			.set('data-type', 'application/json')
			.set('Authorization', rootToken)
			.send(noLikes)

			const response = await api
				.get('/api/jira')
			const content = response.body.find(r => r.title === 'This is an ex-parrot')

			expect(content.likes).toBe(0)

		})
		test('no title should return 400', async () => {
			const newIssue = await api
			.post('/api/jira')
			.set('data-type', 'application/json')
			.set('Authorization', rootToken)
			.send(	{"author": "Graham Chapman"})
			.expect(400)
		})
		test('no url should return 400', async () => {
			const newIssue = await api
			.post('/api/jira')
			.set('data-type', 'application/json')
			.set('Authorization', rootToken)
			.send(	{"": "Graham Chapman"})
			.expect(400)
		})

	})

	describe('delete part of API', () => {
			let url = undefined
			// get some ID
			test('get initial data', async() => {
				let response = await api
					.get('/api/jira')

				const content = response.body.find(r => r.title === 'This is an ex-parrot')
				idToBeDeleted = content._id
				url = '/api/jira/' + content._id
				expect(idToBeDeleted).not.toBeUndefined()
			})

			//first we test that it returns now something
			test('first we test that it returns now something', async () => {
				response = await api
					.get('/api/jira/' + idToBeDeleted)
						.expect(200)
			})



			// then we actually delete it
			test('then we actually delete it', async () => {
				response = await api
					.delete('/api/jira/' + idToBeDeleted)
					.set('Authorization', rootToken)
						.expect(200)
			})
			test('testing that added issue cant be found again', async () => {
				response = await api
					.get('/api/jira/' + idToBeDeleted)
						.expect(404)
			})

  describe('user part of API', () => {

  	test('POST /api/users succeeds with a no password', async () => {

  		newUser.password = undefined
  		await api
  			.post('/api/users')
  			.send(newUser)
  			.expect(400)

  	})

  	test('POST /api/users succeeds with a too short password', async () => {
  		newUser.password = 'NA'
  		await api
  			.post('/api/users')
  			.send(newUser)
  			.expect(400)
  	})

  	test('POST /api/users succeeds with a fresh username', async () => {
  		const usersBeforeOperation = await usersInDb()

  		newUser.password = 'salainen'
  		await api
  			.post('/api/users')
  			.send(newUser)
  			.expect(200)
  			.expect('Content-Type', /application\/json/)

  		const usersAfterOperation = await usersInDb()
  		expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
  		const usernames = usersAfterOperation.map(u=>u.username)
  		expect(usernames).toContain(newUser.username)
  	})

  })
})

afterAll(() => {
	if (server) {
		server.close()
	}
})
})

const usersInDb = async() => {
	try {
    const users = await User.find({})
		return users.map(user => User.format(user))

	}
	catch (e) {
		console.log(e)
	}
}

const signIn = async(user) => {
	try {
		console.log('user', user);
		const result = await api
		.post('/api/login')
		.set('data-type', 'application/json')
		.send(user)
		console.log('result', result.body);
		for (let i = 0; i < 10; i++) {
			console.log(i);
		}
		const resultText = 'bearer ' + result.body.token
		return resultText
	}
	catch (err) {
		console.log(err)
	}


}

const initiateConnection = () => {
	try {
		let url = undefined
		url = config.mongoUrl
		mongoose.connect(url)
	}
	catch (e) {
		console.log(e)
	}
}
