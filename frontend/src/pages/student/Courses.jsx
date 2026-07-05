import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import Course from './Course';
import { useGetPublishedCourseQuery } from '@/features/api/courseApi';



const Courses = () => {
    const { data, isLoading, isSuccess, isError } = useGetPublishedCourseQuery()
    console.log(data)
    if (isError) return <h1>Some error occurred while fetching courses</h1>

    return (
        <div className='bg-gray-50 dark:bg-[#141414] ' >
            <div className='max-w-7xl mx-auto p-6'>
                <h2 className='font-bold text-3xl text-center mb-10 ' >Our Courses</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' >
                    {
                        isLoading ? Array.from({ length: 8 }).map((_, index) => (
                            <CourseSkeleton key={index} />)) : data?.courses && data.courses.map((course, index) => <Course key={index} course={course} />)
                    }
                </div>
            </div>
        </div>
    )
}


export default Courses


const CourseSkeleton = () => {
    return (
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
            <Skeleton className="w-full h-40 rounded-none" />
            <div className="p-4 flex flex-col gap-3">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-3 w-3/5" />
                <div className="flex gap-2">
                    <Skeleton className="h-3 w-10" />
                    <Skeleton className="h-3 w-14" />
                </div>
                <div className="flex items-center justify-between mt-1">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-8 w-20 rounded-md" />
                </div>
            </div>
        </div>
    );
};
