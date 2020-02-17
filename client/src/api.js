import axios from 'axios';


const port = 5000 ;

export const createApiClient = () => {
	return {
		getPosts: () => {
			return axios.get(`http://localhost:${port}/api/posts`).then((res) => res.data);
		},

		addPost: (post) => {
			return axios.post(`http://localhost:${port}/api/posts`,post).then((res) => res.data);
		}

	}
}



