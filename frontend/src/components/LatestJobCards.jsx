import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate(`/description/${job._id}`)}
            className="group p-6 rounded-xl bg-white border border-gray-200 cursor-pointer transition-all hover:border-[#6A38C2]/30"
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#6A38C2]/10 to-[#F83002]/10 flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-[#6A38C2]" />
                        </div>
                        <div>
                            <h1 className="font-semibold text-lg group-hover:text-[#6A38C2] transition-colors">
                                {job?.company?.name}
                            </h1>
                            <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{job?.location || 'India'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Badge variant="outline" className="border-[#6A38C2] text-[#6A38C2]">
                    {job?.position} Openings
                </Badge>
            </div>

            <div className="mb-5">
                <h1 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-[#6A38C2] transition-colors">
                    {job?.title}
                </h1>
                <p className="text-gray-600 line-clamp-2">
                    {job?.description}
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#6A38C2]/10 text-[#6A38C2] hover:bg-[#6A38C2]/20">
                    <Clock className="h-4 w-4 mr-1" />
                    {job?.jobType}
                </Badge>
                <Badge className="bg-[#F83002]/10 text-[#F83002] hover:bg-[#F83002]/20">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {job?.salary} LPA
                </Badge>
                {job?.skillsRequired?.slice(0, 2).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
                        {skill}
                    </Badge>
                ))}
                {job?.skillsRequired?.length > 2 && (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        +{job.skillsRequired.length - 2} more
                    </Badge>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                    Posted {new Date(job?.createdAt).toLocaleDateString()}
                </span>
                <span className="text-sm font-medium text-[#6A38C2] group-hover:underline">
                    View Details
                </span>
            </div>
        </motion.div>
    );
};

export default LatestJobCards;