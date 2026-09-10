import axios from 'axios';

const API_BASE_URL = '/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Album API Endpoints
export const getAlbums = () => apiClient.get('/albums');
export const getAlbumById = (id) => apiClient.get(`/albums/${id}`);
export const createAlbum = (albumData) => apiClient.post('/albums', albumData);
export const deleteAlbum = (id) => apiClient.delete(`/albums/${id}`);

// Track API Endpoints
export const getTracks = () => apiClient.get('/tracks');
export const getTrackById = (id) => apiClient.get(`/tracks/${id}`);
export const createTrack = (trackData) => apiClient.post('/tracks', trackData);
export const deleteTrack = (id) => apiClient.delete(`/tracks/${id}`);

export default apiClient;