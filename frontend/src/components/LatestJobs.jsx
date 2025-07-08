import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    
    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-[#6A38C2]/10 text-[#6A38C2] font-medium mb-4"
                >
                    <Briefcase className="h-5 w-5 mr-2" />
                    <span>Career Opportunities</span>
                </motion.div>
                
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                >
                    <span className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] bg-clip-text text-transparent">
                        Latest & Top
                    </span> Job Openings
                </motion.h2>
                
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg text-gray-600 max-w-2xl mx-auto"
                >
                    Discover the most recent and exciting career opportunities from top companies
                </motion.p>
            </div>

            {allJobs.length <= 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center py-12"
                >
                    <div className="bg-gray-50 rounded-xl p-8 max-w-md mx-auto">
                        <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Jobs Available</h3>
                        <p className="text-gray-600 mb-4">We couldn't find any job listings at the moment.</p>
                        <Link to="/browse">
                            <Button variant="outline" className="border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2]/10">
                                Browse All Jobs
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            ) : (
                <>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                    >
                        {allJobs.slice(0, 6).map((job) => (
                            <motion.div key={job._id} variants={item}>
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center"
                    >
                        <Link to="/browse">
                            <Button className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:from-[#5A2CAD] hover:to-[#E02802] px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                                View All Jobs
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </>
            )}
        </section>
    );
};

export default LatestJobs;