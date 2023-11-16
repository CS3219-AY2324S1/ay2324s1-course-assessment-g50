import axios from "axios";
const baseUrl = "http://localhost:5000/matching";
let controller = new AbortController();

const cancelMatch = async () => {
  controller.abort();
  controller = new AbortController();
}

const match = async (criteria, timeout) => {
  try {
    let resp = await axios.post(baseUrl, criteria, {
      timeout: timeout,
      signal: controller.signal,
    });
    return {
      matchedId: resp.data.users,
      category: resp.data.category,
      complexity: resp.data.complexity,
    };
  } catch (error) {
    console.error("Failed match:", error);
    const errMsg = error.response ? error.response.data : error.message
    throw new Error(errMsg);
  } 
};

const matchWithUser = async (criteria, { rejectWithValue }) => {
  try {
    return await match(criteria, 30000); // default timeout
  } catch (err) {
    throw rejectWithValue(err.message);
  }
};

export { matchWithUser, cancelMatch };