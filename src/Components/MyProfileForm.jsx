import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

function MyProfileForm(){
  const [read, setRead] = useState(true)
  
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

  const getUserInfo = async () => {
    try {
      console.log('getUserInfo', idUser)
      await axios.get(`/users/${idUser}`,
      ).then(response => {
        nameRef.current.value = response.data?.name ?? ''
        surnameRef.current.value = response.data?.surname ?? ''
        ageRef.current.value = response.data?.age ?? ''
        addressRef.current.value = response.data?.address ?? ''
        cityRef.current.value = response.data?.city ?? ''
        provinceRef.current.value = response.data?.province ?? ''
        zipRef.current.value = response.data?.zip ?? ''
        nationalityRef.current.value = response.data?.nationality ?? ''
        phoneRef.current.value = response.data?.phone ?? ''
        sexRef.current.value = response.data?.sex ?? ''
        
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [idUser])

  useEffect(()=>{
    const localIdUser = localStorage.getItem('idUser')
    if (localIdUser) setIdUser(localIdUser)
    if (!localIdUser) navigate('/home')
  }, [])

  const handleEditOption = (e) => {
    e.preventDefault()
    setRead(false)
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    setRead(true)

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
        JSON.stringify(dataUpdate)
      ).then(response => {
        console.log(response)
      })
    } catch (error) {
      console.log('error en updateProfile')
      console.log(error.response)
    }
  }

  return(
    <form 
      onSubmit={(e) => updateProfile(e)}
      className="p-4 bg-[#F8D1B4] w-[313px] mx-auto rounded-3xl"
    >
      <h1 className="flex p-2 text-2xl items-center justify-center text-center text-[#BC4E2A] uppercase">Tus datos</h1>
      <label className="w-full">
        <input
          ref={nameRef}
          name="name"
          type="text"
          className="w-full p-2 mt-6 text-center rounded-full"
          readOnly={read}
          placeholder="Nombre"/>
      </label>
      <label className="w-full">
        <input
          ref={surnameRef}
          name="surname"
          type="text"
          className="w-full p-2 mt-3 text-center rounded-full"
          readOnly={read}
          placeholder="Apellidos"/>
      </label>
      <label className="w-full">
        <input
          ref={ageRef}
          name="age"
          type="date"
          className="w-full p-2 mt-3 text-center rounded-full"
          readOnly={read}
          placeholder="Edad"/>
      </label>
      <label className="w-full">
        <input
          ref={addressRef}
          name="address"
          type="text"
          className="w-full p-2 mt-3 text-center rounded-full"
          readOnly={read}
          placeholder="Dirección"/>
      </label>
      <label className="w-full">
        <input
          ref={cityRef}
          name="city"
          type="text"
          className="w-full p-2 mt-3 text-center rounded-full"
          readOnly={read}
          placeholder="Ciudad"/>
      </label>
      <label className="w-full">
        <input
          ref={provinceRef}
          name="province"
          type="text"
          className="w-full p-2 mt-3 text-center rounded-full"
          readOnly={read}
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
          readOnly={read}
          placeholder="Código Postal"/>
      </label>
      <label className="w-full">
        <input
          ref={nationalityRef}
          name="nationality"
          type="text"
          className="w-full p-2 mt-3 text-center rounded-full"
          readOnly={read}
          placeholder="Nacionalidad"/>
      </label>
      <label className="w-full">
        <input
          ref={phoneRef}
          name="phone"
          type="tel"
          pattern="[0-9]{9}"
          className="w-full p-2 mt-3 text-center rounded-full"
          readOnly={read}
          placeholder="Teléfono"/>
      </label>
      <label className="w-full">
        <select
          ref={sexRef}
          name="sex"
          className="w-full p-2 mt-3 text-center rounded-full"
          readOnly={read}
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
        { read 
          ? (<button
            className="h-10 px-5 bg-[#FDF6EC] rounded-full text-[#BC4E2A]"
            onClick={handleEditOption}
          >
          Editar
          </button>) 
          : <button className="h-10 px-5 bg-[#BC4E2A] text-white rounded-full">Guardar</button> }
      </div>
    </form>
  )
}
  
export default MyProfileForm