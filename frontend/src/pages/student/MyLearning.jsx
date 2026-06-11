import React from 'react'
import Course from './Course';

const MyLearning = () => {

    const isLoading = false;
    const myLearningCourses = [1,2,3,4];

  return (
    <div className='max-w-4xl mx-auto my-24 px-4 md:px-0' >
      <h1 className='font-bold text-2xl' >MY LEARNING</h1>
      <div className='my-5' >
        {
         isLoading ? (<MyLearningSkeleton/>) : myLearningCourses.length === 0 ? ( <p>You are not enrolled in any course. </p> ) : ( 
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4' >
                {
                    //myLearningCourses par map karskte h
                    [1,2].map((course, index) => <Course key={index} /> )
                }
            </div>
         )
        }
      </div>
    </div>
  )
}

export default MyLearning

const MyLearningSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="flex items-center gap-4 bg-gray-100 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700"
                >
                    {/* Thumbnail Skeleton */}
                    <div className="w-44 h-28 shrink-0 rounded-lg bg-gray-300 dark:bg-slate-600 animate-pulse" />

                    {/* Content Skeleton */}
                    <div className="flex flex-col gap-3 flex-1">
                        {/* Title */}
                        <div className="h-4 w-2/3 rounded bg-gray-300 dark:bg-slate-600 animate-pulse" />
                        {/* Subtitle */}
                        <div className="h-3 w-1/3 rounded bg-gray-300 dark:bg-slate-600 animate-pulse" />

                        {/* Progress Bar */}
                        <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
                                <div className="h-full w-3/5 rounded-full bg-gray-300 dark:bg-slate-600 animate-pulse" />
                            </div>
                            <div className="h-3 w-8 rounded bg-gray-300 dark:bg-slate-600 animate-pulse" />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 mt-1">
                            <div className="h-8 w-24 rounded-md bg-gray-300 dark:bg-slate-600 animate-pulse" />
                            <div className="h-8 w-20 rounded-md bg-gray-300 dark:bg-slate-600 animate-pulse" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

