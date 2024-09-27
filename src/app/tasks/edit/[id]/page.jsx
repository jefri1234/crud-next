"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
//import handleForm from "./handleForm"//de este archivo importamos esa funcion o componente

//params es un objeto
function TaskEdit({ params }) {

  
  const router= useRouter()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
    
  useEffect(() => {
    fetch('/api/tasks/'+params.id)
        .then((res )=> res.json())
        .then((data) => {
        setTitle(data.data.title)
        setDescription(data.data.description)
        });
  }, []);
 

 //-------------------------------------------------------------------------------------------
 
 //funcion para guardar los datos a la base de datos mediante el formulario
 const actualizar =async (e)=>{
   e.preventDefault()//para que no refresque la pagina y ver lo que envia el form
   //const title= e.target.title.value
   //const description= e.target.description.value
   //console.log(title,description)
           
   //TODA ESA PETICION ES ASINCRONA XQ VIAJA AL SERVIDOR
   const res= await fetch('/api/tasks/'+params.id,{
     //voy enviar a api/task
     method:"PUT",
     //el dato-body que le voy enviar  es un objeto o JSON  que va ser convertido en string
     //el dato que le voy enviar es un title-description
     body:JSON.stringify({title,description}),
     //para que sea entendido como uno json coloco headers asi
     //xq es un valor q espera el backend para entenderlo como un objeto JSON
     //----enviar un formato en json
     headers:{
       "Content-Type":"application/json",
     },
   });

   //la peticion que hice guarde en res, ahora ese res convierto en json
   const data= await res.json();
   console.log({data})
   //una ves creado o realizado que se debio hacer redireccion a inicio
   router.push("/")
   router.refresh()
 }
//..................................................................................................

//destructuracion de objetos
//handleform=>retorna un objeto que dentro contiene una funcion
//al destructuralo de esta manera accedemos directamente a la funcion
//---const {creando}=handleForm();

  return (
    <div className=" h-screen flex justify-center items-center pb-96">
      <form className="bg-slate-900 p-10 lg:w-2/6 rounded-xl ml-8 mr-8"

        //cuando se envie el evento onSubmit  yo voy manejarlo con una funcion
        //el evento se activa cuando se envia el formulario
        
        onSubmit={actualizar}
      >
        
        <label htmlFor="title" className=" font-bold text-sm">
          Titulo de tarea
        </label>

        
        <input id="title" type="text" className=" border border-gray-400 p-2 mb-4 w-full text-black" placeholder="titulo"
          //capturando el valor con la funcion setTitle del UseState
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          
          
        />
        <label htmlFor="description" className=" font-bold text-sm">Descripcion de la tarea</label>
        <textarea id="description" rows="3" className="border border-gray-400 p-2 mb-4 w-full text-black" placeholder="describe tu tarea"
          //capturando el valor con la funcion setDescription del UseState
          value={description}
          //vas capturar el evento 
          onChange={(e)=>setDescription(e.target.value)}
          
        ></textarea>
        <div className=" flex justify-between">
        <button type="submit" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Actualizar</button>
        
        <button type="button" className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={async()=>{
              const res=await fetch('/api/tasks/'+params.id,{
                  method:"DELETE"
              })

            
              
              const data= res.json()
              console.log({
                  "message":"task eliminado",
                  data
              })
              
              router.push('/')
              router.refresh()
          }}


        >Eliminar</button>
        </div>
      </form>
      
    </div>
  )
}

export default TaskEdit
