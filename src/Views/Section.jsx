import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import uuid from 'react-uuid'
import axios from '../api/axios'
import Navbar from '../Components/Navbar'
import Arrow from '../media/icons/Arrow'



const Section =() => {
  const sectionId = useParams().id
  const [section, setSection] = useState({})
  
  const sectionRequest = async () =>{
    try {
      await axios.get(`/sections/${sectionId}`).then(response => {
        setSection(response.data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    sectionRequest()
  },[])

  return (
    <>
      <Navbar />
      <h1 className='flex justify-center text-5xl text-center py-2 m-8 text-[#BC4E2A] uppercase'>{ section.title }</h1>
      <p className = "justify-center text-center text-[#E57A56]">{ section.category }</p>
      {section.text && section.text.map(element => {
        if (element[0] === 'p') return <p key={uuid()} className="justify-center m-4">{element[1]}</p>
        if (element[0] === 'a') {
          const href = element.length === 2 ? element[1] : element[2]

          return <a href={href} target="_blank" rel="noopener noreferrer" key={uuid()} className="justify-center block mx-4 my-2 decoration-solid">{element[1]}</a>
        }
      })}
      <div className='m-4'>
        <Arrow />
      </div>
    </>

  )
}

export default Section