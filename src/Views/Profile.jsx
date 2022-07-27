import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api/axios'
import MyProfileForm from '../Components/MyProfileForm'
import Navbar from '../Components/Navbar'
import Arrow from '../media/icons/Arrow'

const Profile = () => {
  const userId = useParams().id

  const userRequest = async () => {
    try {
      const response = await axios.get(`/users/${userId}`)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    userRequest()
  }, [])

  return (
    <>
      <Navbar />
      <h1 className='flex justify-center text-5xl text-center py-2 m-8 text-[#BC4E2A]'>Tu perfil</h1>
      <div className ="flex flex-col gap-4 md:flex md:flex-row ">
        <MyProfileForm />
      </div>
      <div className='m-4'>
        <Arrow />
      </div>
    </>
  )
}
export default Profile