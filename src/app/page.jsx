import TaskCard from "@/components/taskCard";
import { prisma } from "@/libs/prisma"

  async function loadTask(){
    //LISTAR LAS TAREAS - TENGO DOS FORMAS:
    //1) obteniendo de la DB mediante PRISMA
    //2) hacinedo una peticion HTTPS /API/TASKS  uso de fetch
    return await prisma.task.findMany();
  }

  export const dynamic='force-dynamic'
  
async function HomePage() {
  const tasks= await loadTask();
  
  return <section className=" container mx-auto">
    <h1 className="text-3xl font-bold text-gray-300 text-center pt-3">ALL TASKS HERE - EDIT AND DELETE</h1>
  <div className=" grid grid-cols-3 gap-3">
    {
    tasks.map((task)=>(
      <TaskCard task={task}  key={task.id}/>      
    ))
    }
  </div>
  </section>

 
}
export default HomePage
