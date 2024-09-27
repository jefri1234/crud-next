import Link from "next/link"

function NavBar() {
  return (
  <nav className=" bg-slate-900 ">
   <div className=" container mx-auto flex justify-around items-center py-3">
    <h3 className=" font-bold text-3xl">NexCrud</h3>
        <ul className=" flex justify-between gap-3 font-bold">
            <li>
                <Link href='/' className=" text-slate-400 hover:text-slate-300">Task</Link>
            </li>
            <li>
                <Link href='/new' className=" text-slate-400 hover:text-slate-300">New</Link>
            </li>
            <li>
                <Link href='/about' className=" text-slate-400 hover:text-slate-300">About</Link>
            </li>
        </ul>
   </div>
  </nav>
  )
}

export default NavBar
