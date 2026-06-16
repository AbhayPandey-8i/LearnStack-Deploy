import React from 'react'

const Dashboard = () => {
  return (
    <div className='grid  gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <div className='shadow-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4'>
        <p className='text-sm font-medium text-black'>Total Sales</p>
      </div>
    </div>
  )
}

export default Dashboard