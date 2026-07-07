import { ChartNoAxesColumn, SquareLibrary, EllipsisVertical, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='flex'>

            <button
                onClick={() => setIsOpen(true)}
                className='lg:hidden fixed top-4.5 left-3 z-30 p-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900'
            >
                <EllipsisVertical size={18} />
            </button>

            {/* Mobile backdrop overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className='fixed inset-0 bg-black/50 z-40 lg:hidden'
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    flex flex-col w-[250px] sm:w-[300px] space-y-8 
                    border-r border-gray-300 dark:border-gray-700 
                    p-5 h-screen bg-white dark:bg-gray-900
                    fixed top-0 left-0 z-50 transition-transform duration-300
                    lg:sticky lg:translate-x-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Close button - mobile only */}
                <button
                    onClick={() => setIsOpen(false)}
                    className='lg:hidden self-end'
                >
                    <X size={22} />
                </button>

                <div className='space-y-4'>
                    <Link
                        to="/admin/dashboard"
                        onClick={() => setIsOpen(false)}
                        className='flex items-center gap-2'
                    >
                        <ChartNoAxesColumn size={22} />
                        <h1>Dashboard</h1>
                    </Link>
                    <Link
                        to="/admin/course"
                        onClick={() => setIsOpen(false)}
                        className='flex items-center gap-2'
                    >
                        <SquareLibrary size={22} />
                        <h1>Courses</h1>
                    </Link>
                </div>
            </div>

            {/* Content area */}
            <div className='flex-1 p-10 lg:ml-0'>
                <Outlet />
            </div>

        </div>
    )
}

export default Sidebar