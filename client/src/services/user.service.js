import axios from 'axios';
// User service interects with backend API -> saves to reducer

const baseUrl = 'http://localhost:8000/users';

const loginUser = async (email, password) => {
    try {
        const response = await axios.post(baseUrl + '/login', { email, password });
        return response.data;
    } catch (error) {
        console.error(error);  // Handle error
    }
};

const logoutUser = async () => {
    try {
        const response = await axios.post(baseUrl + '/logout');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const registerUser = async (email, password) => {
    try {
        const response = await axios.post(baseUrl, { email, password });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

/* Managing user profile */
const fetchUserData = async () => {
    try {
      const response = await axios.get(baseUrl);
      return response.data
    } catch (error) {
      console.error(error);
    }
};

const updateUserBasicInfo = async (updateData) => {
    try {
        const response = await axios.patch(baseUrl + "/info", updateData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const updateUserAccountInfo = async (updateData) => {
    try {
        const response = await axios.patch(baseUrl, updateData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const deregisterUser = async () => {
    try {
        await axios.delete(baseUrl);
    } catch (error) {
        console.error(error);
    }
};

export { loginUser, logoutUser, registerUser, fetchUserData, updateUserBasicInfo, updateUserAccountInfo, deregisterUser }