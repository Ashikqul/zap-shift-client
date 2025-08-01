import { useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hook/useAuth';

// axios instance বাইরের স্কোপে তৈরি
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000', // তোমার backend URL
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
            console.log("Token from localStorage:", token);

        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;




// import axios from 'axios';

// const axiosSecure = axios.create({
//   baseURL: 'http://localhost:5000', // তোমার backend URL
// });

// // Request interceptor to add token
// axiosSecure.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('access-token'); // token localStorage থেকে নিয়ে আসা
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosSecure;

