// Ruo Yang Jiang

import axios from 'axios'

export default async function getAuthenticated(): Promise<any> {
  return axios.get(`/apis/user`)
}
