import axios from 'axios';
// User service interects with backend API -> saves to reducer

const baseUrl = 'http://localhost:8000/users';

const loginUser = async (email, password) => {
    try {
        const response = await axios.post(baseUrl + '/login', { email, password });
        return response.data;
    } catch (error) {
        console.error(error);  // Handle error
        throw new Error("logging error");
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
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update basic info");
    }
};

const updateUserAccountInfo = async (updateData) => {
    try {
        const response = await axios.patch(baseUrl, updateData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update account info");
    }
};

const deregisterUser = async () => {
    try {
        await axios.delete(baseUrl);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update account info");
    }
};

export { loginUser, logoutUser, registerUser, fetchUserData, updateUserBasicInfo, updateUserAccountInfo, deregisterUser }