import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'sonner'

const MEDIA_API="http://localhost:8080/api/v1/media"
const LectureTab = () => {

    const [title, setTitle] = useState("");
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null)
    const [isFree, setIsFree] = useState(false)
    const [mediaProgress, setMediaProgress] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [btnDisable, setBtnDisable] = useState(true)

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0]
        if (file) {
            const formData = new FormData();
            formData.append("file",file)
            setMediaProgress(true)
            try {
                const res = await axios.post(`${MEDIA_API}/upload-video`, formData,{
                    onUploadProgress: ({loaded, total}) => {
                        setUploadProgress(Math.round((loaded*100)/total))

                    }
                })
                if (res.data.success) {
                    console.log(res)
                    setUploadVideoInfo({videoUrl:res.data.data.url, pubicId:res.data.data.public_id})
                    setBtnDisable(false);
                    toast.success(res.data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error("Video upload failed")
            } finally{
                setMediaProgress(false)
            }

        }

    }

    return (

        <Card className="py-0 ring-gray-300 ">
    <div className='flex flex-col p-6 pb-4 gap-3'>
        <div>
            <CardTitle>Edit Lecture</CardTitle>
            <CardDescription>Make changes and click save when done.</CardDescription>
        </div>
        <div>
           <Button className="bg-red-500 text-white" variant='destructive'>Remove Lecture</Button>
        </div>
    </div>
    <CardContent className='px-6 pb-6 -mt-2'>
        <div>
            <Label className="font-bold mb-0">Title</Label>
            <Input
                className="border-gray-300 mt-1"
                type='text'
                placeholder="Ex. Introduction to Javascript"
            />
        </div>
        <div className='my-5' >
            <Label className="font-bold mt-1">Video <span className='text-red-500' >*</span> </Label>
            <Input
                className="border-gray-300 w-fit mt-1"
                type='file'
                accept="video/*"
                onChange={fileChangeHandler}
                placeholder="Ex. Introduction to Javascript"
            />
        </div>
        <div className='flex items-center space-x-2 my-5' >
         <Switch id="airplane-mode" />
         <Label htmlFor="airplane-mode">Is this video FREE?</Label>
        </div>

         {
            mediaProgress && (
                <div className='my-4' >
                    <Progress value={uploadProgress} />
                    <p>{uploadProgress}%uploaded</p>
                </div>
            )
         }

        <div className='mt-4' >
            <Button className={"bg-black text-white p-3"} >Update lecture</Button>
        </div>
    </CardContent>
</Card>
    )
}

export default LectureTab
