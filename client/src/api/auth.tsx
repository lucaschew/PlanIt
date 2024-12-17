// Ruo Yang Jiang

import axios from 'axios'

export default async function getAuthenticated(): Promise<any> {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/user`)
}
