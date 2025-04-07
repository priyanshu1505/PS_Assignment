import axios from 'axios';
import config from '../config';

const API_URL = config.API_URL;
export const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };
  
  export const fetchUsersByRole = async (role) => {
    try {
      const response = await axios.get(`${API_URL}/role/${role}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching users by role (${role}):`, error);
      return [];
    }
  };
  
  export const fetchAllRoles = async () => {
    try {
      const response = await axios.get(`${API_URL}/roles`);
      return response.data;
    } catch (error) {
      console.error('Error fetching roles:', error);
      return [];
    }
  };
  
  export const fetchUserById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/id/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      return null;
    }
  };