import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'

import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'



const AddCourse = () => {

const [courseTitle, setCourseTitle] = useState("")
const [category, setCategory] = useState("")
const navigate = useNavigate()

const [createCourse,{data, error, isSuccess, isLoading}] = useCreateCourseMutation();


const getSelectedCategory = (value) => {
  setCategory(value)
}

const createCourseHandler = async () => {
  await createCourse({courseTitle, category});
}

//to display toast
useEffect(() => {
  if (isSuccess) {
  toast.success(data?.message || "Course Created") 
  navigate("/admin/course") 
  }
   if (error) {
    toast.error(error?.data?.message || "Failed to create course");
  }
}, [isSuccess, error])




  return (
    <div className='flex-1 mx-auto' >
      <div className='mb-4' >
         <h1 className='font-bold text-xl'>Lets add course, add some basic course details for your new course</h1>
         <p className='text-sm' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, quos!</p>
      </div>

    <div className='space-y-4' >
      <div>
        <Label className={"mb-2 font-bold"} >Title</Label>
        <input value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} className='w-4xl outline-1 outline-gray-200 rounded-sm py-1 px-2 ' type="text" name='courseTitle' placeholder='Your Course Name' />
      </div>
      <div>
        <Label className={"mb-2"} >Category</Label>
          <NativeSelect  onValueChange = {getSelectedCategory} onChange={(e) => setCategory(e.target.value)}  >
      <NativeSelectOption className={"font-bold"} value="">Select Category</NativeSelectOption>
      <NativeSelectOption value="Next JS">Next JS </NativeSelectOption>
      <NativeSelectOption value="Data Science">Data Science  </NativeSelectOption>
      <NativeSelectOption value="Frontend Development">Frontend Development </NativeSelectOption> 
      <NativeSelectOption value="Fullstack Development">Fullstack Development </NativeSelectOption>
      <NativeSelectOption value="MERN stack Development">MERN Stack Development </NativeSelectOption>
      <NativeSelectOption value="Javascript">Javascript </NativeSelectOption>
      <NativeSelectOption value="Python">Python </NativeSelectOption>
      <NativeSelectOption value="Docker">Docker </NativeSelectOption>
      <NativeSelectOption value="MongoDB">MongoDB </NativeSelectOption>
      <NativeSelectOption value="HTML">HTML </NativeSelectOption>

    </NativeSelect>
      </div>
      <div className='flex items-center gap-2' >
          <Button onClick={() => navigate("/admin/course") } variant='outline' className={"outline-gray-200 text-black p-4"} >Back</Button>
          <Button disabled={isLoading} onClick={createCourseHandler} className={"bg-black text-white p-4"} > 
            {
              isLoading ? (
                <>
                 <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                </>
              ) : ("Create")
            }
             </Button>
      </div>
    </div>
      
    </div>
  )
}

export default AddCourse
