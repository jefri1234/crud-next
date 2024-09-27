import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma'


export async function GET(request,{params}){

                //llamo primsa , tabla task , operador findUnique habro un objeto y llamo a where
    const task= await prisma.task.findUnique({
        where:{
            // como params.id es extraido de la URL lo entiende como string 
            //entonses lo combierto a numero
            id:Number(params.id),
        },
    });

    return NextResponse.json({
        status:200,
        message:"registro encontrado",
        data:task
    })
}


export async function PUT(request,{params}){
            //del objeto request lo convertire a json
    const data= await request.json()
    const taskUpdate= await prisma.task.update({
        where:{
            id:Number(params.id)
        },
        data:data
    });
    return NextResponse.json({
        "message":"task update",
        "task update":taskUpdate
    })
}

export async function DELETE(request,{params}){
   try{
    const data= await prisma.task.delete({
        where:{
            id:Number(params.id)
        }
    })
    console.log(data)
    return NextResponse.json("tarea eliminada"+params.id)
   }
   catch(error){
    return NextResponse.json(error.message)
   }
}