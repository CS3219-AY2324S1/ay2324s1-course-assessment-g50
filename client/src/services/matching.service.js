import axios from "axios";
import { addConversation } from "./communication.service";
import { fetchTargetUserData } from "./user.service";


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

const matchWithUser = async (criteria, { rejectWithValue }) => {
    try {
        return await match(criteria, 30000); // TODO
    } catch (err) {
        throw rejectWithValue(err.message);
    }
const matchWithUser = async (criteria) => {
  return await match(criteria, 30000); // TODO
};

export { matchWithUser };