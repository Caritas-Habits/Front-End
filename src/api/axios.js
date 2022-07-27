import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:5050',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    // 'x-access-token': localStorage.getItem('token')
    'authorization': `Bearer ${localStorage.getItem('token')}`
  },
  withCredentials: true
})