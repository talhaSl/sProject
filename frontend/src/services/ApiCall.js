import axios from "axios"
import { BASE_URL } from "./Helper";

export const commonrequest = async (methods, url, body) => {
  const token = localStorage.getItem('token');
  let config = {
    method: methods,
    url,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    }, data: body
  }
  // console.log(config);
  // axios instance
  return axios(config).then((data) => {
    return data
  }).catch((error) => {
    return error
  })
}

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  // Make the API call to upload the file
  return fetch(`${BASE_URL}/uploadFile`, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the API
      return data;
    })
    .catch(error => {
      // Handle any error that occurred during the API call
      console.error(error);
    });
};