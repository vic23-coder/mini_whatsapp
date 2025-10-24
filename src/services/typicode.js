import axios from 'axios';
import config from '../config/index.js';

const typicodeAPI = axios.create({
    baseURL: config.TYPICODE_BASE_URL,
    timeout: 10000,
    headers: {
        Authorization: config.TYPICODE_BASE_API_KEY,
        "Content-Type": "application/json"
    }
});

async function getPublicProfiles(userid) {
  try {
    const response = await typicodeAPI.get("/users", { params: { userid } });
    // if(!response) throw new AppError("No response from Typicode API", 502);

    return response;
  } catch (error) {
    console.error("Error fetching public profiles:", error);
  }
}

async function getPublicPost(postid) {
  try {
    const response = await typicodeAPI.get("/posts", { params: { postid } });
    return response;
  } catch (error) {
    console.error("Error fetching public posts:", error);
  }
}

async function sendPublicUser(firstName, lastName) {
  try {
    const response = await typicodeAPI.post("/user", {
      firstName,
      lastName,
    });
    return response;
  } catch (error) {
    console.error("Error sending public user:", error);
  }
}

export default { getPublicProfiles, getPublicPost, sendPublicUser };
