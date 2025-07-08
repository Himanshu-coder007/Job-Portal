import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, Award, Briefcase, FileText, ChevronRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { useSelector } from "react-redux";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs(); 
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gradient-to-br from-[#6A38C2]/5 via-white to-[#F83002]/5 min-h-screen">
      {/* Animated dots background */}
      <div className="absolute inset-0 -z-20 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#6A38C2]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
            animate={{
              y: [0, Math.random() * 20 - 10],
              x: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-8"
        >
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-28 w-28 border-2 border-[#6A38C2]/20">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                    alt="profile"
                  />
                </Avatar>
                <div>
                  <motion.h1 
                    className="font-bold text-2xl bg-gradient-to-r from-[#6A38C2] to-[#F83002] bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {user?.fullname}
                  </motion.h1>
                  <motion.p
                    className="text-gray-600 mt-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {user?.profile?.bio || "Update your bio to showcase your professional identity"}
                  </motion.p>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  onClick={() => setOpen(true)}
                  className="rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:from-[#5A2CAD] hover:to-[#E02802] text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Pen className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="p-3 rounded-full bg-[#6A38C2]/10 text-[#6A38C2]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="p-3 rounded-full bg-[#F83002]/10 text-[#F83002]">
                    <Contact className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user?.phoneNumber || "Not provided"}</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 bg-gray-50 rounded-xl"
              >
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#6A38C2]" />
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user?.profile?.skills?.length > 0 ? (
                    user.profile.skills.map((item, index) => (
                      <Badge 
                        key={index} 
                        className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#6A38C2]/10 to-[#F83002]/10 text-[#6A38C2] hover:from-[#6A38C2]/20 hover:to-[#F83002]/20"
                      >
                        {item}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500">No skills added yet</p>
                  )}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 bg-gray-50 rounded-xl"
            >
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#F83002]" />
                Resume
              </h2>
              {user?.profile?.resume ? (
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-[#6A38C2]" />
                    <span className="font-medium">{user?.profile?.resumeOriginalName}</span>
                  </div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={user?.profile?.resume}
                    className="text-sm text-[#6A38C2] hover:underline flex items-center"
                  >
                    View <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              ) : (
                <p className="text-gray-500">No resume uploaded</p>
              )}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-[#6A38C2] to-[#F83002] bg-clip-text text-transparent">
                Applied Jobs
              </h2>
              <Briefcase className="h-6 w-6 text-[#6A38C2]" />
            </div>
            <AppliedJobTable />
          </div>
        </motion.div>
      </div>
      
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;