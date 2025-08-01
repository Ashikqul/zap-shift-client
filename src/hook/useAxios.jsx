import axios from "axios";

const axiosInstance = axios.create({
        baseURL: `http://localhost:5000/` // ✅ সঠিক spelling

})


const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
