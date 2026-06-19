import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
// import { Card } from '@hugeicons/core-free-icons';
import React, { useState } from 'react'

const CourseTab = () => {

  const isPublished = true;

  const [input, setInput] = useState({
    courseTitle: '',
    subtitle: '',
    description: '',
    category: '',
    courseLevel: '',
    coursePrice: '',
    courseThumbnail: '',
  });

  const changeEventHandler = () => {
    const { name, value } = e.target;
    setInput({ ...input, [input]: value });
  }



  return (
    <div>
      <div className='border border-gray-300 px-4 py-5 rounded-lg' >
        <CardHeader className={"flex flex-row justify-between"} >
          <div>
            <CardTitle>Basic Course Information</CardTitle>
            <CardDescription>
              Make changes to your course here. Click save when you're done.
            </CardDescription>
          </div>
          <div className='space-x-2' >
            <Button className={"border border-gray-300"} >
              {
                isPublished ? "Unpublish" : "Publish"
              }
            </Button>
            <Button className={"bg-black text-white"} >Remove Course</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4 mt-5' >
            <div>
              <Label>Title</Label>
              <Input className={"focus-visible:ring-0 mt-1 border-gray-300"} value={input.courseTitle} onChange={changeEventHandler} type="text" name="courseTitle" placeholder="Ex. Fullstack Developer" />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input className={"focus-visible:ring-0 mt-1 border-gray-300"} value={input.subtitle} onChange={changeEventHandler} type="text" name="Subtitle" placeholder="Ex. Master Fullstack Devlopment In 3 months" />
            </div>
            <div>
              <Label>Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>
            <div className='flex items-center gap-5' >
              <div>
                <Label>Category</Label>
                <NativeSelect className={"mt-1"} onChange={(e) => setCategory(e.target.value)}  >
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
              <div>
                <Label>Course Level</Label>
                <NativeSelect className={"mt-1"} onChange={(e) => setCategory(e.target.value)}  >
                  <NativeSelectOption className={"font-bold"} value="">Select Course Level</NativeSelectOption>
                  <NativeSelectOption value="Beginner">Beginner</NativeSelectOption>
                  <NativeSelectOption value="Intermediate">Intermediate</NativeSelectOption>
                  <NativeSelectOption value="Advance">Advance</NativeSelectOption>

                </NativeSelect>
              </div>
              <div>
                <Label>Price (INR) </Label>
                <input type="number" name='coursePrice' value={input.coursePrice} onChange={changeEventHandler} placeholder='Ex.₹199' className='w-fit mt-1 border rounded-md text-sm py-0.5 px-1' />
              </div>
              
            </div>
            <div>
                <Label>CourseThumbnail</Label>
                <input type="file" accept='image/*' className='w-fit mt-1 border rounded-md text-sm py-0.5 px-1' />
              </div>
          </div>
        </CardContent>
      </div>
    </div>
  )
}

export default CourseTab
