import {CgMenuBoxed} from 'react-icons/cg'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import React,{useState} from 'react'
// import { useNavigate } from 'react-router-dom';

function Navbar(){

  // const navigate = useNavigate();

  const [dropdown, setDropdown] = useState(false)

  const openCloseDropdown = () => {
    setDropdown(!dropdown)
  }


    
  return(
    
    <nav className='bg-[#FDF6EC] w-full flex relative justify-between items-center mx-auto px-8 h-20 '>
      <Dropdown isOpen = {dropdown} toggle = {openCloseDropdown} className = 'border-transparent' >
        <DropdownToggle className = 'bg-transparent border-0'>
          <CgMenuBoxed className = 'text-[#BC4E2A] display-block h-[48px] w-[48px] '/>
        </DropdownToggle >
    
        <DropdownMenu>
          <DropdownItem>Home</DropdownItem>
          <DropdownItem>Registrar Nuevo</DropdownItem>
          <DropdownItem>Categorías</DropdownItem>
          <DropdownItem>Mi perfil</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <a href="admin-register" type="button" className="py-2 px-3 hover:underline rounded-full relative">
          Registro nuevo
      </a>
      <a href="login" className = 'flex mr-4 items-center'>
        <img className="h-[48px] w-[48px]" src={require('../media/img/picprofile.png')} alt="profileIcon" />
      </a>
    </nav>
  )
}

export default Navbar