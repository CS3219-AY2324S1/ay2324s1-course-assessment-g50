



//Insert the matching route here
const baseUrl = "";

const matchWithUser = async () => {
  try {
    return axios.get(baseUrl);
  } catch (error) {
    throw new Error(msg);
  }
};

export { matchWithUser };