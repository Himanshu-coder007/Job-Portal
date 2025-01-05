import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const PostJob = () => {
  return (
    <div>
 <Navbar/>
 <div className='flex items-center justify-center w-screen my-5'>
 <div>Title</div>
 <Input
 type='text'
 name="title"
 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
 />
 </div>
    </div>
  )
}

export default PostJob