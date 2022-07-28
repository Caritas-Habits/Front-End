import MyProfileForm from '../Components/MyProfileForm'
import Navbar from '../Components/Navbar'
import Arrow from '../media/icons/Arrow'

const Profile = () => {
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