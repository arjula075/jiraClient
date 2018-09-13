// setting up test data
const initialBlogs = [
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

const getAll = (token) => {
    return Promise.resolve(initialBlogs)
}

export default {
  getAll,
}
