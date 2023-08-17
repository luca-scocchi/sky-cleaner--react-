import axios from 'axios';

const apiKey = '192c3636c896b493df76ee71';

const api = axios.create({
  baseURL: 'https://api.goclimate.com/v1/flight_footprint',
  auth: {
    username: apiKey,
    password: '' // Lascia la password vuota per l'autenticazione Basic
  }
});

const getFlightFootprint = async (origin, destination, cabinClass) => {
  try {
    const response = await api.get('', {
      params: {
        'segments[0][origin]': origin,
        'segments[0][destination]': destination,
        'cabin_class': cabinClass,
        'currencies[]': 'USD'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching flight footprint data');
  }
};

const API = {
  getFlightFootprint
};

export default API;