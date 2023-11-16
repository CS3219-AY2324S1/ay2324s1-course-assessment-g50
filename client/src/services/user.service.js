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
    const response = await axios.patch(baseUrl + "/info", updateData);
    return response.data;
};

const updateUserBasicAvatarInfo = async (imageData) => {
    const response = await axios.post(baseUrl + "/info/avatar", imageData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    console.log(response.data);
    return response.data;
}

const updateUserAccountInfo = async (updateData) => {
    const response = await axios.patch(baseUrl, updateData);
    console.log(response.data);
    return response.data;
};

const deregisterUser = async () => {
    await axios.delete(baseUrl);
};

export { loginUser, logoutUser, registerUser, fetchUserData, updateUserBasicInfo, updateUserBasicAvatarInfo, updateUserAccountInfo, deregisterUser }