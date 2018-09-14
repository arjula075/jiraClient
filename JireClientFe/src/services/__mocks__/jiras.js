// setting up test data
const initialIssues = [
	{
		"title": "Ari's first blog",
		"author": "Ari Lahti",
		"url": "https://jotain.jossain",
		"likes": 1,
		"user" : {
			"username": "test"
		}
	},
	{
		"title": "And now to something completely different",
		"author": "John Cleese",
		"url": "https://muuta.muualla",
		"likes": 2,
		"user" : {
			"username": "test"
		}
	}
]

const authenticate = (token) => {
    return Promise.resolve(initialIssues)
}

export default {
  authenticate,
}
