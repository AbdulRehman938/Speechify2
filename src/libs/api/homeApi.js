import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const fetchHomeData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/home`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch home data:', error);
    throw error;
  }
};
