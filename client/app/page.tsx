'use client'

import { FC, useState } from "react"
import Heading from "./utils/Heading"
import Hearder from "./components/Hearder"
interface Props {}

const Page : FC<Props> =(props)=>{
  const [open, setOpen] = useState(false);
  const [activeItem,setActiveItem] = useState(0)
  return (
    <div>
      <Heading 
      title="Elearning"
      description="Elearning is a platform for student to learn and get help from teachers"
      keybords="Programing,Mern,Redux,machine learning"/>
      <Hearder
      open ={open}
      setOpen={setOpen}
      activeItem={activeItem}
      />
    </div>
  )
}
export default Page