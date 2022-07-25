import {CgMenuBoxed} from 'react-icons/cg'
import {CgUserAdd} from 'react-icons/cg'
import { BiUserCircle } from 'react-icons/bi'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
// import AuthContext from '../context/AuthProvider'

function Navbar(){
  // const { idUser } = useContext(AuthContext)
  // const { auth } = useContext(AuthContext)
  const [idUser, setIdUser] = useState('')
  const [roles, setRoles] = useState([])
  const [successfullyLogin, setSuccessfullyLogin] = useState(false)
  const [dropdownL, setDropdownL] = useState(false)
  const [dropdownR, setDropdownR] = useState(false)
  const navigate = useNavigate()
  
  const openCloseDropdownL = () => setDropdownL(!dropdownL)
  const openCloseDropdownR = () => setDropdownR(!dropdownR)
  
  const getUserRoles = async () =>{
    try {
      console.log('getUserRoles', idUser)
      await axios.get(`/users/${idUser}/roles`,
      ).then(response => {
        console.log(response.data)
        const getRoles = response.data.roles.map(role => role.name)
        setRoles(getRoles)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      await axios.post('/api/auth/signout',
      ).then(response => {
        console.log(response.data)
        localStorage.removeItem('token')
        localStorage.removeItem('successfullyLogin')
        localStorage.removeItem('idUser')
        setSuccessfullyLogin(false)
        setIdUser('')
        setRoles([])
        navigate('/home')
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if (idUser !== '') getUserRoles()
  }, [idUser])

  useEffect(()=>{
    if (localStorage.getItem('idUser')) {
      let cookieUser = localStorage.getItem('idUser')
      setIdUser(cookieUser)
    }
  },[successfullyLogin])

  useEffect(()=>{
    let getLogin = localStorage.getItem('successfullyLogin')
    if (getLogin) {
      setSuccessfullyLogin(getLogin)
    }
  }, [])

  return(
    
    <nav className='w-full flex relative justify-between items-center mx-auto px-8 h-20 '>
      <Dropdown isOpen = {dropdownL} toggle = {openCloseDropdownL} className = 'border-transparent ' >
        <DropdownToggle className = 'bg-transparent border-0 '>
          <CgMenuBoxed className = 'text-[#BC4E2A] display-block h-[48px] w-[48px] '/>
        </DropdownToggle >
    
        <DropdownMenu aria-expanded aria-label='menu desplegable'>
          <DropdownItem aria-level={1} onClick={() => navigate('/home')}>Página principal</DropdownItem>
          <DropdownItem aria-level={2} onClick={() => navigate('/admin-register')}>Alta nueva en el sistema</DropdownItem>
          <DropdownItem aria-level={3} onClick={() => navigate('/category/1')}>Sueño</DropdownItem>
          <DropdownItem aria-level={4} onClick={() => navigate('/category/2')}>Nutrición</DropdownItem>
          <DropdownItem aria-level={5} onClick={() => navigate('/category/3')}>Ejercicio físico</DropdownItem>
          <DropdownItem aria-level={6} onClick={() => navigate('/category/4')}>Salud Mental</DropdownItem>
          <DropdownItem aria-level={7} onClick={() => navigate('/about-us')}>Quiénes somos</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {roles.includes('admin') &&
        <CgUserAdd role="button" aria-label='añadir un usuario' type='button' className='text-[#BC4E2A] display-block h-[48px] w-[48px]' onClick={() => navigate('/admin-register')}  />
      }
      <Dropdown isOpen = {dropdownR} toggle = {openCloseDropdownR} className = 'border-transparent ' >
        <DropdownToggle className = 'bg-transparent border-0 '>
          <BiUserCircle aria-label='icono de usuario' className = 'text-[#BC4E2A] display-block h-[48px] w-[48px] '/>
        </DropdownToggle >
        <DropdownMenu aria-expanded>
          {successfullyLogin
            ? (<>
              <DropdownItem aria-level={2} onClick={() => navigate(`/profile/${idUser}`)}>Mi perfil</DropdownItem>
              <DropdownItem aria-level={3} onClick={logout}>Desconectar</DropdownItem>
            </>)
            : <DropdownItem aria-level={2} onClick={() => navigate('/login')}>Conectar</DropdownItem> 
          }
        </DropdownMenu>
      </Dropdown>
    </nav>
  )
}

export default Navbar