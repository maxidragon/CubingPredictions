import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.worldcubeassociation.org/api/v0/',
});

export default instance;
