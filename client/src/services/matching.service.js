import axios from "axios";
import { addConversation } from "./communication.service";
import { fetchTargetUserData } from "./user.service";
import {fetchQuestions} from "../reducers/questionSlice";
import {getQuestions} from "./question.service";


//Insert the matching route here
const baseUrl = "http://localhost:5000/matching";

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
    console.log(resp.data);
    const matchedId = resp.data.users;
    // 2. Fetch user specific infos
    const matchedUserInfo = await fetchTargetUserData(matchedId);
    const respData = {
      matchedId: matchedId, // Matched user ids
      matchedUserInfo: matchedUserInfo.data, // Matched user specific info
      category: resp.data.category,
      complexity: resp.data.complexity,
      filteredQuestions: await getQuestions({topicSlugs: resp.data.category, complexity: resp.data.complexity})
    }
    console.log({topicSlugs: resp.data.category, complexity: resp.data.complexity})
    console.log(respData.filteredQuestions);

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
    throw new Error(error.response.data);
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