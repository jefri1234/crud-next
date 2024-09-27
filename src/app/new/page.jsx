"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
//import handleForm from "./handleForm"//de este archivo importamos esa funcion o componente

function NewPage() {

  
  const router= useRouter()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(()=>{
   fetch('/api/tasks')
    .then((res) => res.json())
    .then((data) => {
      setTitle(data.datosobtenidos.title || "")
      setDescription(data.datosobtenidos.description || "")
      console.log(title)
    });
  },[]);


 //-------------------------------------------------------------------------------------------
 
 //funcion para guardar los datos a la base de datos mediante el formulario
 const creando = async (e)=>{
   e.preventDefault()//para que no refresque la pagina y ver lo que envia el form
   //const title= e.target.title.value
   //const description= e.target.description.value
   console.log(title,description)
           
   //TODA ESA PETICION ES ASINCRONA XQ VIAJA AL SERVIDOR
   const res= await fetch('/api/tasks',{
     //voy enviar a api/task
     method:"POST",
     //el dato-body que le voy enviar  es un objeto o JSON  que va ser convertido en string
     //el dato que le voy enviar es un title-description
     body:JSON.stringify({title,description}),
     //para que sea entendido como uno json coloco headers asi
     //xq es un valor q espera el backend para entenderlo como un objeto JSON
     headers:{
       "Content-Type":"application/json",
     },
   });

   //la peticion que hice guarde en res, ahora ese res convierto en json
   const data= await res.json();
   console.log(data)
   //una ves creado o realizado que se debio hacer redireccion a inicio
   router.push("/")
 }
//..................................................................................................

//destructuracion de objetos
//handleform=>retorna un objeto que dentro contiene una funcion
//al destructuralo de esta manera accedemos directamente a la funcion
//---const {creando}=handleForm();

  return (
    <div className="min-h-screen flex justify-center items-center pb-96">
  <form
    className="bg-slate-900 p-10 w-full max-w-lg rounded-xl mx-4"
    // cuando se envie el evento onSubmit yo voy manejarlo con una funcion
    // el evento se activa cuando se envia el formulario
    onSubmit={creando}
  >
    <label htmlFor="title" className="font-bold text-sm">
      Titulo de tarea
    </label>

    <input
      id="title"
      type="text"
      className="border border-gray-400 p-2 mb-4 w-full text-black"
      placeholder="titulo"
      // capturando el valor con la funcion setTitle del UseState
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <label htmlFor="description" className="font-bold text-sm">
      Descripcion de la tarea
    </label>
    <textarea
      id="description"
      rows="3"
      className="border border-gray-400 p-2 mb-4 w-full text-black"
      placeholder="describe tu tarea"
      // capturando el valor con la funcion setDescription del UseState
      onChange={(e) => setDescription(e.target.value)}
      value={description}
    ></textarea>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
      crear
    </button>
  </form>
</div>

  )
}

export default NewPage
