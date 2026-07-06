import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useEditLectureMutation, useRemoveLectureMutation } from '@/features/api/courseApi'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const MEDIA_API="https://learnstack-leaning-platform.onrender.com/api/v1/media"
const LectureTab = () => {

    const [lectureTitle, setLectureTitle] = useState("");
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null)
    const [isFree, setIsFree] = useState(false)
    const [mediaProgress, setMediaProgress] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [btnDisable, setBtnDisable] = useState(true)
    const params = useParams()
     const { courseId, lectureId } = params;

      const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation();
    const [removeLecture, {data: removeData, isLoading: removeLoading, isSuccess: removeSuccess}] = useRemoveLectureMutation();

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
                    
                    setUploadVideoInfo({videoUrl:res.data.data.url, pubicId:res.data.data.public_id})
                    setBtnDisable(false);
                    toast.success(res.data.message)
                }
            } catch (error) {
                
                toast.error("Video upload failed")
            } finally{
                setMediaProgress(false)
            }

        }
    }

    const editLectureHandler = async () => {
        
        await editLecture({ lectureTitle, videoInfo: uploadVideoInfo, isPreviewFree: isFree, courseId, lectureId })

    }

    const removeLectureHandler = async () => {
        await removeLecture(lectureId)
    }

     useEffect(() => {
        if (isSuccess) {
            toast.success(data.message)
        }
        if (error) {
            toast.error(error.data.message)
        }
    }, [isSuccess, error])

    useEffect(()=>{
        if(removeSuccess){
            toast.success(removeData.message)
        }
    } ,[removeSuccess])

    return (

        <Card className="py-0 ring-gray-300 ">
    <div className='flex flex-col p-6 pb-4 gap-3'>
        <div>
            <CardTitle>Edit Lecture</CardTitle>
            <CardDescription>Make changes and click save when done.</CardDescription>
        </div>
        <div>
            <Button className={"bg-black text-white"} disabled={removeLoading} variant='destructive' onClick={removeLectureHandler}>
                        {
                            removeLoading ? <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                            </> : "Remove Lecture"
                        }
                    </Button>
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
             <Button className={"bg-black text-white"} disabled={isLoading} onClick={editLectureHandler}>
                        {
                            isLoading ? <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                            </> : "Update Lecture"                  
                        }
                    </Button>
        </div>
    </CardContent>
</Card>
    )
}

export default LectureTab
