import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../api/axios'
import Navbar from '../Components/Navbar'
import SectionButton from '../Components/SectionButton'
import Arrow from '../media/icons/Arrow'

const Category = () => {
  const selectCategory = useParams().id
  const navigate = useNavigate()
  const [filter, setFilter] = useState('')
  const [sections, setSections] = useState([])

  useEffect(() => {
    selectCategory == 2 ? setFilter('nutrición') 
      : selectCategory == 3
        ? setFilter('ejercicio físico')
        : selectCategory == 4
          ? setFilter('salud mental')
          : setFilter('sueño')
  }, [selectCategory])
  
  const sectionsOfCategoryRequest = async () =>{
    try {
      await axios.get('/sections',
        {
          headers:{
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'x-access-token': localStorage.getItem('token')
          },
        }
      ).then(response => {
        const filterSections = response.data.filter(section => section.category == filter)
        setSections(filterSections)
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    sectionsOfCategoryRequest()
  }, [filter])

  return (
    <>
      <Navbar />
      <h1 className='flex justify-center text-5xl text-center py-2 m-8 text-[#BC4E2A] uppercase'>{filter}</h1>
      {sections.map(section => {
        return (
          <SectionButton 
            key={section._id}
            title={section.title}
            onClick={() => navigate(`/section/${section._id}`)}
          />
        )
      })}
      <div className='m-4'>
        <Arrow />
      </div>
    </>
  )
}

export default Category