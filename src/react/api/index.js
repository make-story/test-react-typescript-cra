import axios from 'axios';

// axios 
const api = axios.create({
	baseURL: 'http://localhost:4000/api',
});

/*
export const insertMovie = payload => api.post(`/movie`, payload);
export const getAllMovies = () => api.get(`/movies`);
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload);
export const deleteMovieById = id => api.delete(`/movie/${id}`);
export const getMovieById = id => api.get(`/movie/${id}`);
*/

/*
// list
import api from '../api';
async () => {
	this.setState({ isLoading: true });

	await api.getAllMovies().then(movies => {
		this.setState({
			movies: movies.data.data,
			isLoading: false,
		})
	});
}


// delete
import api from '../api'
api.deleteMovieById(this.props.id);


// create
import api from '../api'
async () => {
	const { name, rating, time } = this.state
	const arrayTime = time.split('/')
	const payload = { name, rating, time: arrayTime }

	await api.insertMovie(payload).then(res => {
		window.alert(`Movie inserted successfully`)
		this.setState({
			name: '',
			rating: '',
			time: '',
		})
	})
}


// update
import api from '../api'
async () => {
	const { id } = this.state
	const movie = await api.getMovieById(id)

	this.setState({
		name: movie.data.data.name,
		rating: movie.data.data.rating,
		time: movie.data.data.time.join('/'),
	})
}
async () => {
	const { id, name, rating, time } = this.state
	const arrayTime = time.split('/')
	const payload = { name, rating, time: arrayTime }

	await api.updateMovieById(id, payload).then(res => {
		window.alert(`Movie updated successfully`)
		this.setState({
			name: '',
			rating: '',
			time: '',
		})
	})
}
*/

export const search = ({title='test', params={}}={}) => api.get(`/search/${title}`, { params });

const apis = {
	search,
};

export default apis;