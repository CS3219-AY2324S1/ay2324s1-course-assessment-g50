import axios from "axios";
import { addConversation } from "./communication.service";
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
    // 1. Create match session
    let resp = await axios.post(baseUrl, criteria, {
      timeout: timeout,
      signal: controller.signal,
    });
    const matchedId = resp.data;
    // 2. Fetch user specific infos
    const matchedUserInfo = await fetchTargetUserData(matchedId);
    const respData = {
      matchedId: matchedId, // Matched user ids
      matchedUserInfo: matchedUserInfo.data // Matched user specific infos
    }
    // 3. Create conversation between matched users:
    const newConversation = {
      matchId: matchedId.toString(),
      senderId: matchedId[0],
      receiverId: matchedId[1],
    }
    await addConversation(newConversation);
    return respData;
  } catch (error) {
    console.error("Failed match:", error);
    throw new Error(error.response.data.data);
  }
};

const retrieveQuestionDetails = async (questionID) => {
  try {
    console.log(questionID);
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