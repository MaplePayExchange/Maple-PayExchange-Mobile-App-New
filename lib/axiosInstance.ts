/**
|--------------------------------------------------
| Npm config
|--------------------------------------------------
*/
import axios from 'axios';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { appConfig } from '@/config/app.config';

const axiosInstance = axios.create({
	baseURL: appConfig.base_url,
});

/**
|--------------------------------------------------
| Request Interceptor
|--------------------------------------------------
*/
axiosInstance.interceptors.request.use(
	async (config) => {
		const token = '';

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		console.log(config.baseURL);
		console.log(config.url);

		return config;
	},
	(error) => Promise.reject(error)
);

/**
|--------------------------------------------------
| Response Interceptor
|--------------------------------------------------
*/
axiosInstance.interceptors.response.use(
	(response) => {
		/**
		|--------------------------------------------------
		| If the response is successful, return it as is
		|--------------------------------------------------
		*/
		return response;
	},
	async (error) => {
		/**
		|--------------------------------------------------
		| If the response status is 401, clear the token
		|--------------------------------------------------
		*/
		if (error.response && error.response.status === 401) {
		}

		/**
		|--------------------------------------------------
		| Always reject the error to handle it elsewhere
		|--------------------------------------------------
		*/
		return Promise.reject(error);
	}
);

export default axiosInstance;
