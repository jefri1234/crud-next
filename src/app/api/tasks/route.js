import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma'

export async function GET(){
    console.log(process.env.TOKEN)//obteniendo la variable de entorno

                //prisma genera una propiedad llamda task que es la tabla
                //siguinete . y tengo varios operaciones (search-create-update-delete-etc...)
                //operacion findMany() ->busca todo lo que hay dentro en la tabla 
    const tasks= await prisma.task.findMany() 
    return NextResponse.json({
        datosobtenidos:tasks 
    })
}

export async function POST(request){
    //en el request es donde llega todo lo que se manda del cliente ahi esta toda la data
    //en esta forma extraigo el campo title - description y almaceno
    //convierto todo el request que ahi esta toda data en json
    const {title,description} = await request.json() 

    // De igual manero llamo a prisma, la tabla task y operacion create FACIL😎😀😱
    //como en el name de los html son iguales con los datos que llegan llamo directo
    //title y description le paso asi forma abreviado mas rapido
    const newTask= await prisma.task.create({
        data:{
            title,
            description
        }
    })
    return NextResponse.json({
        message:"creando tareas" ,
        status:200,
        data:newTask
    })
}