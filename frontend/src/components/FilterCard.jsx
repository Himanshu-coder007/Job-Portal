import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Filter, X } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        options: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
        icon: <MapPin className="h-4 w-4" />
    },
    {
        filterType: "Industry",
        options: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
        icon: <Briefcase className="h-4 w-4" />
    },
    {
        filterType: "Salary",
        options: ["0-40k", "42k-1L", "1L-5L"],
        icon: <IndianRupee className="h-4 w-4" />
    }
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('')
    const [isExpanded, setIsExpanded] = useState(true)
    const dispatch = useDispatch()

    const changeHandler = (value) => {
        setSelectedValue(value)
    }

    const clearFilters = () => {
        setSelectedValue('')
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue, dispatch])

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
            <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-[#6A38C2]" />
                    <h2 className="font-bold text-lg bg-gradient-to-r from-[#6A38C2] to-[#F83002] bg-clip-text text-transparent">
                        Filter Jobs
                    </h2>
                </div>
                <button 
                    className="text-gray-500 hover:text-[#F83002] transition-colors"
                    onClick={(e) => {
                        e.stopPropagation()
                        clearFilters()
                    }}
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {isExpanded && (
                <div className="px-4 pb-4">
                    <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                        {filterData.map((data, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="mb-6 last:mb-0"
                            >
                                <div className="flex items-center gap-2 mb-3 text-[#6A38C2]">
                                    {data.icon}
                                    <h3 className="font-semibold">{data.filterType}</h3>
                                </div>
                                <div className="space-y-2 pl-6">
                                    {data.options.map((item, idx) => {
                                        const itemId = `filter-${index}-${idx}`
                                        return (
                                            <motion.div 
                                                whileHover={{ x: 5 }}
                                                key={itemId}
                                                className="flex items-center space-x-3"
                                            >
                                                <RadioGroupItem 
                                                    value={item} 
                                                    id={itemId} 
                                                    className="h-5 w-5 border-2 border-[#6A38C2] text-[#6A38C2]"
                                                />
                                                <Label 
                                                    htmlFor={itemId} 
                                                    className="text-gray-700 cursor-pointer hover:text-[#6A38C2] transition-colors"
                                                >
                                                    {item}
                                                </Label>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </RadioGroup>
                </div>
            )}
        </motion.div>
    )
}

export default FilterCard