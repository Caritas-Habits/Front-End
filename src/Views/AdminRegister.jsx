import React, { useState, useRef, useEffect } from 'react'
import axios from '../api/axios'
import Navbar from '../Components/Navbar'
import Arrow from '../media/icons/Arrow'
import { ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function AdminRegister(){
  
  const userRef = useRef()
  const errRef = useRef()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const [errorMsg, setErrMsg] = useState('') 
  const [success, setSuccess] = useState(false)

  const errorRegisterAdminAlert = () => toast.error('Registro fallido', { 
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
  
  const successRegisterAdminAlert = () => toast.success('Nuevo usuarix registradx correctamente', {
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
      window.location.href=`mailto:${email}?&subject=Info%20de%20tu%20cuenta%20de%20caritas&body=Este%20es%20tu%20email:%20${email}%20y%20tu%20contraseña:%20${password}%20para%20que%20puedas%20iniciar%20sesión%20en%20tu%20cuenta%20http://localhost:3000/register`

      const response = await axios.post('/api/auth/signup', 
        JSON.stringify({email, password}),
      ).then(response => {
        console.log(response)
        setSuccess(true)
      })
      
      console.log(JSON.stringify(response?.data))
      setEmail('')
      setPassword('')
    } catch (error) {
      console.log(error.response)
    }
  }

  return(
    <>
      <Navbar/>

      <section className = 'mt-20 mb-20 h-max'>

        <p ref={errRef} className={errorMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errorMsg}</p>

        <div className='m-auto w-[313px] rounded-3xl bg-[#F8D1B4]'>
          <div className='p-6'>
            <h1 className='flex items-center justify-center p-14 px-2 text-center text-3xl font-bold text-[#BC4E2A]'>Alta nueva en el sistema</h1>
          
            <form onSubmit={handleSubmit}>
              <label htmlFor='email' className='block w-[269px]'>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} required ref={userRef} id='email' name='email' type='email' className='w-full p-2 text-center rounded-full ' placeholder='Email' />
              </label>
              <label htmlFor='password' className='w-[269px]'>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} required id='password' name='password' type='password' className='w-full p-2 mt-3 text-center rounded-full' placeholder='Contraseña' />
              </label>
              {success ? (
                <div className='flex justify-center m-6'>
                  <button type='submit' onClick={successRegisterAdminAlert} className='h-10 rounded-full bg-[#BC4E2A] px-5 text-white'>Enviar</button>
                </div>) : (
                <div className='flex justify-center m-6'>
                  <button type='submit'  onClick={errorRegisterAdminAlert} className='h-10 rounded-full bg-[#BC4E2A] px-5 text-white'>Enviar</button>
                  <ToastContainer />
                </div>
              
              )}
              <div></div>
            </form>

          </div>
        </div>
        <p className='flex items-center justify-center py-4 px-12 text-center text-[#BC4E2A]'> Asigna email y contraseña para registrar a una nueva persona </p>
      </section>
      <div className='m-4'>
        <Arrow />
      </div>
    </>
  )
}

export default AdminRegister