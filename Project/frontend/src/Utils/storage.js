const storage = {
  setToken: (token) => {
    localStorage.setItem("authToken", token);
  },
  getToken: () => {
    return localStorage.getItem("authToken");
  },
  removeToken: () => {
    localStorage.removeItem("authToken");
  },
  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },
  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  clearAll() {
    localStorage.clear();
  },
};

export default storage;
