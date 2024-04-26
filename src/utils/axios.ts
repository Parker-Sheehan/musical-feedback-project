// axios.js
import axios from 'axios';



// Create Axios instance
const instance = axios.create();

instance.interceptors.request.use(config => {
    // Add logic to modify request config
    return config;
  }, error => {
    // Handle request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(
    // console.log("yaa")
  (response) => {
    console.log("instance hit")
    // Check if the response status code indicates a redirect
    

    // Return the response to continue normal processing
    return response;
  },
  (error) => {
    // Handle errors
    console.log("error hit")
    console.log(error.request.status)
    if (error.request.status === 302) {
        // Extract the redirect URL from the response headers or body
        const redirectUrl = error.response.data; // Assuming the redirect URL is in the Location header
        if (redirectUrl) {
          // Redirect to the specified URL
          window.location.href = redirectUrl;
        }
      }
    return Promise.reject(error);
  }
);

export default instance;
