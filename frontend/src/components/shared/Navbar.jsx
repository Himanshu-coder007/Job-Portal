import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu, X, Briefcase, Home, Search, Building } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center"
                    >
                        <Link to="/" className="flex items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#6A38C2] to-[#F83002] bg-clip-text text-transparent">
                                Job<span className="text-[#F83002]">Portal</span>
                            </h1>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <ul className="flex items-center space-x-6">
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link 
                                            to="/admin/companies" 
                                            className="flex items-center text-gray-600 hover:text-[#6A38C2] transition-colors font-medium"
                                        >
                                            <Building className="w-4 h-4 mr-2" />
                                            Companies
                                        </Link>
                                    </motion.li>
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link 
                                            to="/admin/jobs" 
                                            className="flex items-center text-gray-600 hover:text-[#6A38C2] transition-colors font-medium"
                                        >
                                            <Briefcase className="w-4 h-4 mr-2" />
                                            Jobs
                                        </Link>
                                    </motion.li>
                                </>
                            ) : (
                                <>
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link 
                                            to="/" 
                                            className="flex items-center text-gray-600 hover:text-[#6A38C2] transition-colors font-medium"
                                        >
                                            <Home className="w-4 h-4 mr-2" />
                                            Home
                                        </Link>
                                    </motion.li>
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link 
                                            to="/jobs" 
                                            className="flex items-center text-gray-600 hover:text-[#6A38C2] transition-colors font-medium"
                                        >
                                            <Briefcase className="w-4 h-4 mr-2" />
                                            Jobs
                                        </Link>
                                    </motion.li>
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link 
                                            to="/browse" 
                                            className="flex items-center text-gray-600 hover:text-[#6A38C2] transition-colors font-medium"
                                        >
                                            <Search className="w-4 h-4 mr-2" />
                                            Browse
                                        </Link>
                                    </motion.li>
                                </>
                            )}
                        </ul>

                        {/* Auth Buttons */}
                        {!user ? (
                            <div className="flex items-center space-x-3">
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Link to="/login">
                                        <Button variant="outline" className="border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2]/10">
                                            Login
                                        </Button>
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Link to="/signup">
                                        <Button className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:from-[#5b30a6] hover:to-[#d62b02] shadow-md">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
                                        <Avatar className="border-2 border-[#6A38C2]/30 hover:border-[#6A38C2]/50 transition-all">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                            <AvatarFallback className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white">
                                                {user?.fullname?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </motion.div>
                                </PopoverTrigger>
                                <PopoverContent className="w-72 p-4 rounded-xl shadow-lg border border-gray-100">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                                <AvatarFallback className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white">
                                                    {user?.fullname?.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-semibold">{user?.fullname}</h4>
                                                <p className="text-sm text-gray-500 truncate max-w-[180px]">
                                                    {user?.profile?.bio || "Welcome to JobPortal"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Link
                                                to={user.role === 'student' ? "/profile" : "/admin/profile"}
                                                className="flex items-center p-2 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                                            >
                                                <User2 className="w-5 h-5 mr-3 text-[#6A38C2]" />
                                                <span>View Profile</span>
                                            </Link>
                                            <button
                                                onClick={logoutHandler}
                                                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                                            >
                                                <LogOut className="w-5 h-5 mr-3 text-[#F83002]" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        {!user ? (
                            <div className="flex items-center space-x-2">
                                <Link to="/login">
                                    <Button variant="outline" size="sm" className="border-[#6A38C2] text-[#6A38C2]">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button size="sm" className="bg-[#6A38C2] text-white">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#6A38C2] focus:outline-none"
                            >
                                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white border-t border-gray-100"
                >
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <Link
                                    to="/admin/companies"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Building className="w-4 h-4 mr-2" />
                                    Companies
                                </Link>
                                <Link
                                    to="/admin/jobs"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    Jobs
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Home className="w-4 h-4 mr-2" />
                                    Home
                                </Link>
                                <Link
                                    to="/jobs"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    Jobs
                                </Link>
                                <Link
                                    to="/browse"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Search className="w-4 h-4 mr-2" />
                                    Browse
                                </Link>
                            </>
                        )}

                        {user && (
                            <div className="pt-2 border-t border-gray-200">
                                <Link
                                    to={user.role === 'student' ? "/profile" : "/admin/profile"}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <User2 className="w-4 h-4 mr-2" />
                                    Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        logoutHandler();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Navbar;