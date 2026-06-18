import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Card } from '@hugeicons/core-free-icons';
import React, { useState } from 'react'

const CourseTab = () => {

    const isPublished = true;

        const [input, setInput] = useState({
        courseTitle: '',
        subtitle: '',
        description: '',
    });


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
                <Input className={"focus-visible:ring-0 mt-1 border-gray-300"} type="text" name="courseTitle" placeholder = "Ex. Fullstack Developer" />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input className={"focus-visible:ring-0 mt-1 border-gray-300"} type="text" name="Subtitle" placeholder = "Ex. Master Fullstack Devlopment In 3 months" />
              </div>
              <div>
                <Label>Description</Label>
                 <RichTextEditor input={input} setInput={setInput} />     {/* <Input className={"focus-visible:ring-0 mt-1 border-gray-300"} type="text" name="Description" placeholder = "Ex. Master Fullstack Devlopment In 3 months" /> */}
              </div>
            </div>
        </CardContent>
      </div>
    </div>
  )
}

export default CourseTab
