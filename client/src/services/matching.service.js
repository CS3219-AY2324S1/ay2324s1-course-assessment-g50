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
        throw new Error(error.response.data.data);
    }
};

const retrieveQuestionDetails = async (questionID) => {
  try {
    console.log(questionServiceUrl + "/" + questionID);
    const response = await axios.get(questionServiceUrl + "/" + questionID);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

const matchWithUser = async (criteria) => {
    return await match(criteria, 30000); // TODO
};

export { matchWithUser, retrieveQuestionDetails };