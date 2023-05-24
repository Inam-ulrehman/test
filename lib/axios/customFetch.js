import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('Authorization_Token')
const customFetch = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_WEBSITE}/api/v1`,
})

customFetch.defaults.headers.common['Authorization'] = `Bearer ${token}`

export { customFetch }
