import { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import { ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function LoginForm (){
  const { state } = useLocation()
  const pathname = state?.location?.pathname ?? '/home'
  
  const navigate = useNavigate()
  const userRef = useRef()
  const errRef = useRef()
  
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const [errorMsg, setErrMsg] = useState('')

  const errorLoginAlert = () => toast.error('Lo sentimos, no se ha podido iniciar sessión correctamente', {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const successRegisterAdminAlert = () => toast.success('Has iniciado sesión correctamente', {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
  
  useEffect(()=>{
    userRef.current.focus()
  },[])
  
  useEffect(()=>{
    setErrMsg('')
  },[email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('/api/auth/signin', 
        JSON.stringify({email, password})
      ).then(response => {
        console.log(response.data)
        const accessToken = response?.data?.token
        const roles = response?.data?.roles
        const idUser = response?.data?.idUser
        
        localStorage.setItem('token', accessToken)
        localStorage.setItem('successfullyLogin', true)
        localStorage.setItem('idUser', idUser)
        localStorage.setItem('roles', roles)
        
        setEmail('')
        setPassword('')
        setSuccess(true)
      })
      navigate(pathname)
    }catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus()
    }
  }
      
  
  return(
    <section className='flex items-stretch md:min-h-screen'>
      <div className='relative hidden w-1/2 items-center bg-cover bg-no-repeat lg:flex bg-[url("../src/media/img/bg.jpg")] ' >
        <div className='absolute inset-0 z-0 bg-orange-400 opacity-70'>
        </div>
        <div className='z-10 w-full px-24'>
          <h1 className='font-extrabold tracking-wide text-left text-white text-8xl'>Somos lo que donamos.</h1>
          <p className='my-4 text-3xl text-white'>Somos amor.</p>
        </div>
      </div>
      <div className='z-0 flex items-center justify-center w-full px-0 text-center md:px-16 lg:w-1/2' >
        <div className='absolute inset-0 z-10 items-center bg-[#FDF6EC] bg-cover bg-no-repeat lg:hidden h-full  sm:background-image:none'>
          <div className='absolute inset-0 z-0 bg-black opacity-10'></div>
        </div>
        <div className='z-20 w-full py-6'>
          <h1 className='inline-fle my-10 mb-40 h-7 w-auto text-5xl text-[#BC4E2A] sm:h-8'>¡Te damos la bienvenida!</h1>
      

          <form onSubmit={handleSubmit} className='w-full px-4 mx-auto sm:w-2/3 lg:px-0'>
            <div className='pt-4 pb-2'>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} ref={userRef} type='email' name='email' id='email' placeholder='Email' className='w-full p-4 text-lg text-center bg-orange-300 rounded-full placeholder:text-black' />
            </div>
            <div className='pt-4 pb-2'>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full p-4 text-lg text-center bg-orange-300 rounded-full placeholder:text-black' type='password' name='password' id='password' placeholder='Constraseña' />
            </div>
            {success ? (
              <div className='flex justify-center m-6'>
                <button type='submit' onClick={successRegisterAdminAlert} className='h-10 rounded-full bg-[#BC4E2A] px-5 text-white'>Acceder</button>
              </div>) : (
              <div className='flex justify-center m-6'>
                <button type='submit'  onClick={errorLoginAlert} className='h-10 rounded-full bg-[#BC4E2A] px-5 text-white'>Acceder</button>
                <ToastContainer />
              </div>
              
            )}
      
            <p ref={errRef} className={errorMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errorMsg}</p>

          </form>

          <div className='mt-10 font-light text-center text-orange-900 hover:text-black hover:underline'>
            <button onClick={()=>navigate('/home')}>Volver a la página principal</button>
          </div>
        </div>
      </div>
    </section>
    
  )
    
}

export default LoginForm

