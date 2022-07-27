import CategoryData from '../Components/CategoryData'
import Inquiry from '../Components/Inquiry'
import Navbar from '../Components/Navbar'
import Title from '../Components/Title'


const Home = () => {
  const roles = localStorage.getItem('roles') ?? []

  return (
    <>
      <Navbar/>
      <div className='flex flex-col justify-center h-full lg:flex-row'>
        <section className='relative flex justify-center h-full lg:w-2/5'>
          <Title/>
        </section>
        <section className='h-full lg:w-3/5 md:m-6 '>
          <CategoryData/>
        </section>
        {roles.includes('user') && 
          <div className='bottom-0 lg:flex lg:fixed lg:bottom-10 lg:left-8'>
            <Inquiry/>
          </div> 
        }
      </div>
    </>
  )
}

export default Home