import axios from 'axios';
// User service interects with backend API -> saves to reducer

const baseUrl = 'http://localhost:5000/users';

// For checking if any of the status code is 419 which means time out
const handleTimeOut = (error) => {
    if (error.response) {
        if (error.response.status === 419) {
            throw new Error("TIME_OUT");
        }
    }
    throw error;
}   

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
        if (error.response.status === 400) {
            throw new Error("INVALID_EMAIL");
        }
        throw new Error("Failed to register");
    }
};

/* Managing user profile */
const fetchUserData = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data
    } catch (error) {
        handleTimeOut(error);
        console.error(error);
    }
};

/* View targeted users profile */
const fetchTargetUserData = async (userIds) => {
    try {
        const response = await axios.post(baseUrl + "/target", { userIds });
        return response.data
    } catch (error) {
        handleTimeOut(error);
        console.error(error);
    }
};

const updateUserBasicInfo = async (updateData) => {
    try {
        const response = await axios.patch(baseUrl + "/info", updateData);
        return response.data;
    } catch (error) {
        handleTimeOut(error);
        if (error.response.status === 400) {
            throw new Error("INVALID_INPUT");
        }
        throw new Error("Failed to update basic info");
    }
};

const updateUserBasicAvatarInfo = async (imageData) => {
    try {
        const response = await axios.post(baseUrl + "/info/avatar", imageData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        handleTimeOut(error);
        console.error(error);
    }
}

const updateUserAccountInfo = async (updateData) => {
    try {
        const response = await axios.patch(baseUrl, updateData);
        return response.data;
    } catch (error) {
        handleTimeOut(error);
        console.error(error);
        throw new Error("Failed to update account info");
    }
};

const deregisterUser = async () => {
    try {
        await axios.delete(baseUrl);
    } catch (error) {
        handleTimeOut(error);
        console.error(error);
        throw new Error("Failed to update account info");
    }
};

// Fetch fetching the attempt history of the user
const fetchUserAttemptHistory = async (pageNumber) => {
    try {
        const response = await axios.get(baseUrl + "/history" + `/${pageNumber}`);
        return response.data;
    } catch (error) {
        handleTimeOut(error);
        console.log(error);
        throw new Error("Failed to get user history");
    }
}

// Fetch the attempt history page count of the user
const fetchUserAttemptHistoryPageCount = async () => {
    try {
        const response = await axios.get(baseUrl + "/history");
        return response.data;
    } catch (error) {
        handleTimeOut(error);
        console.log(error);
        throw new Error("Failed to get page count user history");
    }
}

// Fetch the attempt details including code of the user
const fetchUserAttemptDetails = async (questionName) => {
    try {
        const response = await axios.get(baseUrl + "/history" + "/question" + `/${questionName}`);
        return response.data;
    } catch (error) {
        handleTimeOut(error);
        console.log(error);
        throw new Error("Failed to get user attempt details");
    }
}

const updateAttemptQuestionName = async (oldQuestionName, newQuestionName) => {
    try {
        const response = await axios.patch(baseUrl + "/history" + "/question" + `/${oldQuestionName}`, { newQuestionName });
        return response.data;
    } catch (error) {
        handleTimeOut(error);
        console.log(error);
        throw new Error("Failed to update question name in user history");
    }
}

const updateCodeAttempt = async (questionName, codeLanguage, savedCode) => {
    try {
        const response = await axios.post(baseUrl + "/history" + "/code" + `/${questionName}`, { codeLanguage, savedCode });
        return response.data.data;
    } catch (error) {
        handleTimeOut(error);
        console.log(error);
        throw new Error("Failed to update user's code");
    }
}

//Sets the question to attempted in the user's history
const updateUserAttemptHistory = async (questionName, attemptStatus) => {
    try {
        const response = await axios.post(baseUrl + "/history" + "/attempt" + `/${questionName}`, { attemptStatus });
        return response.data;
    } catch (error) {
        handleTimeOut(error);
        console.log(error);
        throw new Error("Failed to update question name in user history");
    }
}


export { loginUser, logoutUser, registerUser, fetchUserData, fetchTargetUserData, updateUserBasicInfo, 
    updateUserBasicAvatarInfo, updateUserAccountInfo, deregisterUser, fetchUserAttemptHistory, fetchUserAttemptHistoryPageCount, 
    fetchUserAttemptDetails, updateAttemptQuestionName, updateCodeAttempt, updateUserAttemptHistory }