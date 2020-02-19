import axios from 'axios';


const port = 5000;

export const createApiClient = () => {
	return {

		getPosts: () => {
			return axios.get(`http://localhost:${port}/api/posts`).then((res) => res.data);
		},

		addPost: (post) => {
			return axios.post(`http://localhost:${port}/api/posts`, post).then((res) => res.data);
		},

		deletePost: (postId) => {
			return axios.delete(`http://localhost:${port}/api/posts/${postId}`).then((res) => res.data);
		},

		login: (logInRequest) => {
			return axios.put(`http://localhost:${port}/api/users/login`, logInRequest).then((res) => res.data);
		},

		logout: (userName) => {
			return axios.put(`http://localhost:${port}/api/users/logout`, {userName:userName}).then((res) => res.data);
		},

		register: (logInRequest) => {
			return axios.post(`http://localhost:${port}/api/users/register`, logInRequest).then((res) => res.data);
		},

		getInit: () => {
			return axios.get(`http://localhost:${port}/api/init`).then((res) => res.data);
		}

	}
}