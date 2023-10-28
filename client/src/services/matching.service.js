import axios from "axios";
import { fetchTargetUserData } from "./user.service";


//Insert the matching route here
const baseUrl = "http://localhost:5000/matching";

const questionServiceUrl = "http://localhost:5000/questions";

const controller = new AbortController();

const cancelMatch = async () => {
    controller.abort();
}

const match = async (criteria, timeout) => {
    try {
        let resp = await axios.post(baseUrl, criteria, {
            timeout: timeout,
            signal: controller.signal,
        });
        const userIds = resp.data;
        const userInfos = await fetchTargetUserData(userIds);
        return { matchId: "Match: " + userIds, matchUsers: userInfos.data }
    } catch (error) {
        console.error("Failed match:", error);
        throw new Error(error.response.data || error.message);
    }
};

const matchWithUser = async (criteria, { rejectWithValue }) => {
    try {
        return await match(criteria, 30000); // TODO
    } catch (err) {
        throw rejectWithValue(err.message);
    }
};

export { matchWithUser };