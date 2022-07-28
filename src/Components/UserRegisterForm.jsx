import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

function UserRegisterForm(){
  const errRef = useRef()
  const nameRef = useRef(null)
  const surnameRef = useRef(null)
  const ageRef = useRef(null)
  const addressRef = useRef(null)
  const cityRef = useRef(null)
  const provinceRef = useRef(null)
  const zipRef = useRef(null)
  const nationalityRef = useRef(null)
  const phoneRef = useRef(null)
  const sexRef = useRef(null)

  const navigate = useNavigate()
  const [idUser, setIdUser] = useState('')
  
  const [errorMsg, setErrMsg] = useState('')
  const [token, setToken] = useState('')
  
  useEffect(()=>{
    const localIdUser = localStorage.getItem('idUser')
    if (localIdUser) {
      setIdUser(localIdUser)
      setToken(localStorage.getItem('token'))
    }
    
    if (!localIdUser) navigate('/home')
  }, [])
  
  useEffect(()=>{
    nameRef.current.focus()
  },[])
  
  useEffect(()=>{
    setErrMsg('')
  },[ nameRef, surnameRef, ageRef, addressRef, cityRef, provinceRef, zipRef, nationalityRef, phoneRef, sexRef])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      console.log('userId', idUser)
      const dataUpdate = {
        name: nameRef.current?.value,
        surname: surnameRef.current?.value,
        age: ageRef.current?.value,
        address: addressRef.current?.value,
        city: cityRef.current?.value,
        province: provinceRef.current?.value,
        zip: zipRef.current?.value,
        nationality: nationalityRef.current?.value,
        phone: phoneRef.current?.value,
        sex: sexRef.current?.value
      }
      await axios.put(`/users/${idUser}`,
        JSON.stringify(dataUpdate),
        {
          headers: {
            'authorization': `Bearer ${token}`
          }
        },
      ).then(response => {
        console.log(response)
        localStorage.setItem('roles', ['user'])
        navigate('/home')
      })
    } catch (error) {
      console.log('error en updateProfile')
      console.log(error.response)
    }
  }

  return(
    <form className="p-4 my-14 bg-[#F8D1B4] w-[313px] mx-auto rounded-3xl" onSubmit={(e) => handleSubmit(e)}>
      <h1 className="flex p-2 text-2xl items-center justify-center text-center text-[#BC4E2A] uppercase">AYÚDANOS A SABER MÁS DE TÍ</h1>
      <label className="w-full">
        <input
          ref={nameRef}
          name="name"
          type="text"
          className="w-full p-2 mt-6 text-center rounded-full"
          placeholder="Nombre"/>
      </label>
      <label className="w-full">
        <input
          ref={surnameRef}
          name="surname"
          type="text"
          className="w-full p-2 mt-3 text-center rounded-full"
          placeholder="Apellidos"/>
      </label>
      <label className="w-full">
        <input
          ref={ageRef}
          name="age"
          type="date"
          className="w-full p-2 mt-3 text-center rounded-full"
          placeholder="Edad"/>
      </label>
      <label className="w-full">
        <input
          ref={addressRef}
          name="address"
          type="text"
          className="w-full p-2 mt-3 text-center rounded-full"
          placeholder="Dirección"/>
      </label>
      <label className="w-full">
        <input
          ref={cityRef}
          name="city"
          type="text"
          className="w-full p-2 mt-3 text-center rounded-full"
          placeholder="Ciudad"/>
      </label>
      <label className="w-full">
        <input
          ref={provinceRef}
          name="province"
          type="text"
          className="w-full p-2 mt-3 text-center rounded-full"
          placeholder="Provicia"/>
      </label>
      <label className="w-full">
        <input
          ref={zipRef}
          name="zip"
          type="number"
          max="99999"
          min="00000"
          className="w-full p-2 mt-3 text-center rounded-full"
          placeholder="Código Postal"/>
      </label>
      <label className="w-full">
        <input
          ref={nationalityRef}
          name="nationality"
          type="text"
          className="w-full p-2 mt-3 text-center rounded-full"
          placeholder="Nacionalidad"/>
      </label>
      <label className="w-full">
        <input
          ref={phoneRef}
          name="phone"
          type="tel"
          pattern="[0-9]{9}"
          className="w-full p-2 mt-3 text-center rounded-full"
          placeholder="Teléfono"/>
      </label>
      <label className="w-full">
        <select
          ref={sexRef}
          name="sex"
          className="w-full p-2 mt-3 text-center rounded-full"
          placeholder=" Me identifico como..">
          <option value="me identifico como..." className= "placeholder:text">Me identifico como..</option>
          <option value="h">hombre</option>
          <option value="m">mujer</option>
          <option value="nb">no binarix</option>
          <option value="o">otro</option>
          <option value="no">prefiero no decirlo</option>
        </select>
      </label>
      <div className="flex justify-center m-6">
        <button
          type="submit"
          className="h-10 px-5 bg-[#BC4E2A] rounded-full text-white">
          Guardar
        </button>
      </div>
      <p ref={errRef} className={errorMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errorMsg}</p>
    </form>
  )
}

export default UserRegisterForm