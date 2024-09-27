"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

function TaskCard({task}) {
   const router= useRouter(); 
   
  return (
    <div>
      <div className=" bg-slate-900 p-3 rounded-xl mt-10 ml-2 mr-2 hover:bg-slate-700 hover:cursor-pointer"
        onClick={()=>{
            router.push('/tasks/edit/'+ task.id)
        }}
      >
        <h1 className=" font-bold text-2xl mb-2">{task.id} .{task.title}</h1>
        <p>{task.description}</p>
        <p>{new Date(task.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  )
}

export default TaskCard
