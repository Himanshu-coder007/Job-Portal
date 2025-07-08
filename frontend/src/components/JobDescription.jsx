import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { Briefcase, MapPin, Clock, DollarSign, Calendar, User, BarChart2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?._id
  ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });
      if(res.data.success){
        setIsApplied(true);
        const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
        }
      } catch (error) {
        console.error(`Error fetching job details for job ID: ${jobId}`, error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch]);

  const postedDate = singleJob?.createdAt
    ? new Date(singleJob.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : "Not Available";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Job Header */}
        <div className="bg-gradient-to-r from-[#6A38C2]/10 to-[#F83002]/10 p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{singleJob?.title || "Job Title"}</h1>
              <div className="flex items-center mt-2">
                <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-lg font-medium text-gray-700">{singleJob?.company?.name || "Company Name"}</span>
              </div>
            </div>
            
            <motion.div whileHover={{ scale: 1.03 }}>
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                size="lg"
                className={`rounded-lg text-lg font-medium ${
                  isApplied 
                    ? "bg-green-600 hover:bg-green-600 cursor-not-allowed" 
                    : "bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:from-[#5A2CAD] hover:to-[#E02802]"
                } shadow-md`}
              >
                {isApplied ? (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Applied
                  </span>
                ) : (
                  "Apply Now"
                )}
              </Button>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge className="bg-[#6A38C2]/10 text-[#6A38C2] hover:bg-[#6A38C2]/20">
              <Briefcase className="h-4 w-4 mr-1" />
              {singleJob?.position || "N/A"} Positions
            </Badge>
            <Badge className="bg-[#F83002]/10 text-[#F83002] hover:bg-[#F83002]/20">
              <Clock className="h-4 w-4 mr-1" />
              {singleJob?.jobType || "N/A"}
            </Badge>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
              <DollarSign className="h-4 w-4 mr-1" />
              {singleJob?.salary ? `${singleJob.salary} LPA` : "N/A"}
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
              <MapPin className="h-4 w-4 mr-1" />
              {singleJob?.location || "N/A"}
            </Badge>
          </div>
        </div>

        {/* Job Details */}
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-[#6A38C2]" />
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {singleJob?.description || "No description available."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-[#6A38C2]" />
                Job Details
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5">
                    <Briefcase />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Role</p>
                    <p className="text-sm text-gray-900">{singleJob?.title || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5">
                    <MapPin />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-sm text-gray-900">{singleJob?.location || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5">
                    <User />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Experience</p>
                    <p className="text-sm text-gray-900">
                      {singleJob?.experienceLevel ? `${singleJob.experienceLevel} years` : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-[#6A38C2]" />
                Additional Information
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5">
                    <DollarSign />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Salary</p>
                    <p className="text-sm text-gray-900">
                      {singleJob?.salary ? `${singleJob.salary} LPA` : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5">
                    <User />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Total Applicants</p>
                    <p className="text-sm text-gray-900">
                      {singleJob?.applications?.length || 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5">
                    <Calendar />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Posted Date</p>
                    <p className="text-sm text-gray-900">{postedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {singleJob?.skillsRequired?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center">
                <svg className="h-5 w-5 mr-2 text-[#6A38C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {singleJob.skillsRequired.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JobDescription;