import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Rocket, Award, Briefcase, ShieldCheck } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = (e) => {
        e.preventDefault()
        if (query.trim()) {
            dispatch(setSearchedQuery(query))
            navigate("/browse")
        }
    }

    return (
        <div className="relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6A38C2]/10 via-white to-[#F83002]/10 -z-10" />
            
            {/* Animated dots background */}
            <div className="absolute inset-0 -z-20 opacity-30">
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6A38C2]/10 text-[#6A38C2] font-medium mb-6"
                >
                    <Award className="h-5 w-5" />
                    <span>No. 1 Job Hunt Website</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#6A38C2] to-[#F83002] bg-clip-text text-transparent mb-6"
                >
                    Find Your Perfect Career Match
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
                >
                    Discover thousands of job opportunities from top companies and take the next step in your career journey.
                </motion.p>

                <motion.form
                    onSubmit={searchJobHandler}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
                >
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Briefcase className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Job title, keywords, or company"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#6A38C2] focus:border-[#6A38C2] outline-none transition-all"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:from-[#5A2CAD] hover:to-[#E02802] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        <Rocket className="h-5 w-5 mr-2" />
                        Search Jobs
                    </Button>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 flex flex-wrap justify-center gap-6"
                >
                    <div className="flex items-center gap-2 text-gray-600">
                        <ShieldCheck className="h-5 w-5 text-[#6A38C2]" />
                        <span>Trusted by 10,000+ companies</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase className="h-5 w-5 text-[#F83002]" />
                        <span>50,000+ job openings</span>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection