import http from "./httpService";
import jwtDecocode from "jwt-decode";
const apiEndPoint = "http://localhost:3900/api/auth";
async function login(email, password) {
  const { data: token } = await http.post(apiEndPoint, {
    email,
    password,
  });
  localStorage.setItem("token", token);
}

function logout() {
  localStorage.removeItem("token");
}

function getCurrentUser() {
  const jwt = localStorage.getItem("token");
  try {
    return jwtDecocode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  logout,
  login,
  getCurrentUser,
};
