import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Bookmark, MapPin, Clock, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4 text-[#6A38C2]" />
          <span>
            {daysAgoFunction(job?.createdAt) === 0
              ? "Posted today"
              : `${daysAgoFunction(job?.createdAt)} days ago`}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-gray-500 hover:text-[#F83002] hover:bg-[#F83002]/10"
        >
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-start gap-4 mb-6">
        <Avatar className="h-14 w-14 border-2 border-[#6A38C2]/20">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h2 className="font-bold text-lg">{job?.company?.name}</h2>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <MapPin className="h-4 w-4" />
            <span>{job?.location || "India"}</span>
          </div>
        </div>
      </div>

      <h3 className="font-bold text-xl mb-2 bg-gradient-to-r from-[#6A38C2] to-[#F83002] bg-clip-text text-transparent">
        {job?.title}
      </h3>
      <p className="text-gray-600 mb-6 line-clamp-2">
        {job?.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        <Badge className="px-3 py-1 bg-[#6A38C2]/10 text-[#6A38C2] hover:bg-[#6A38C2]/20">
          {job?.position || 1} Position
        </Badge>
        <Badge className="px-3 py-1 bg-[#F83002]/10 text-[#F83002] hover:bg-[#F83002]/20">
          {job?.jobType}
        </Badge>
        <Badge className="px-3 py-1 bg-gradient-to-r from-[#6A38C2]/10 to-[#F83002]/10 text-[#6A38C2] hover:from-[#6A38C2]/20 hover:to-[#F83002]/20">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex-1 border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2]/10 hover:text-[#6A38C2] rounded-lg"
        >
          View Details <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:from-[#5A2CAD] hover:to-[#E02802] text-white rounded-lg shadow-sm hover:shadow-md"
        >
          Apply Now
        </Button>
      </div>
    </motion.div>
  );
};

export default Job;