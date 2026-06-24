import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/api/courseApi';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Lecture from './Lecture';

const CreateLecture = () => {
    const [lectureTitle, setLectureTitle] = useState("")
    const params = useParams();
    const navigate = useNavigate()
    const courseId = params.courseId;


    const [CreateLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation();

    const { data: lectureData, isLoading: lectureLoading, isError: lectureError } = useGetCourseLectureQuery(courseId);


    const createLectureHandler = async () => {
        await CreateLecture({ lectureTitle, courseId })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message)
        }
        if (error) {
            toast.error(error.data.message)
        }
    }, [isSuccess, error])


    return (
        <div>
            <div className='flex-1 mx-auto' >
                <div className='mb-4' >
                    <h1 className='font-bold text-xl'>Let's add lecture, add some basic details for your new lecture</h1>
                    <p className='text-sm' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, quos!</p>
                </div>

                <div className='space-y-4' >
                    <div>
                        <Label className={"mb-2 font-bold"} >Title</Label>
                        <input value={lectureTitle} onChange={(e) => setLectureTitle(e.target.value)} className='w-4xl outline-1 outline-gray-200 rounded-sm py-1 px-2 ' type="text" name='courseTitle' placeholder='Your Title Name' />
                    </div>

                    <div className='flex items-center gap-2' >
                        <Button onClick={() => navigate(`/admin/course/${courseId}`)} variant='outline' className={"outline-gray-200 text-black p-4"} >Back to course</Button>
                        <Button disabled={isLoading} onClick={createLectureHandler} className={"bg-black text-white p-4"} >
                            {
                                isLoading ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                                    </>
                                ) : ("Create Lecture")
                            }
                        </Button>
                    </div>
                </div>
                <div className='mt-10' >
                    {
                        lectureLoading ? (<p>Loading...</p>) : lectureError ? (<p>Failed to load lectures</p>) : lectureData.lectures.length === 0 ? <p>No lectures available</p> : lectureData.lectures.map((lecture, index) => (<Lecture key={lecture._id} courseId={courseId} lecture={lecture} index={index} />))
                    }

                </div>
            </div>
        </div>
    )
}

export default CreateLecture
