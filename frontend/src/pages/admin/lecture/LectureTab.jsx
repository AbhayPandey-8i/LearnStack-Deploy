import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const LectureTab = () => {
    return (

        <Card className="py-0">
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
            <Label className="font-bold mb-1">Title</Label>
            <Input
                className="border-gray-300 mt-1"
                type='text'
                placeholder="Ex. Introduction to Javascript"
            />
        </div>
    </CardContent>
</Card>
    )
}

export default LectureTab
