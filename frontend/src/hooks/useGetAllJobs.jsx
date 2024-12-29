import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllJobs = () => {
  const dispatch = useDispatch(); // Get the dispatch function once at the top

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs)); // Dispatch the action
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs(); // Call the function
  }, [dispatch]); // Include dispatch in dependency array
};

export default useGetAllJobs;
