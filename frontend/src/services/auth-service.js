import axios from "axios";

const API_URL = "http://localhost:9192/api/auth/";

class AuthService {
  login(userName, password) {
    return axios
      .post(API_URL + "signin", {
        userName,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('dataCart');
  }

  register(
    customerType,
    customerName,
    address,
    contact,
    location,
    backAccountNumber,
    backName,
    backBranch,
    userName,
    password,
    email,
    catagory) {
      
    return axios.post(API_URL + "singup", {
      customerType,
      customerName,
      address,
      contact,
      location,
      backAccountNumber,
      backName,
      backBranch,
      userName,
      password,
      email,
      catagory
    }).then((response) => {
      return response.data;
    });
  }


  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
