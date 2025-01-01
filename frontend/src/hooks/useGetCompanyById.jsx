import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch(); // Get the dispatch function once at the top

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company)); // Dispatch the action
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleCompany(); // Call the function
  }, [companyId, dispatch]); // Include dispatch in dependency array
};

export default useGetAllJobs;
