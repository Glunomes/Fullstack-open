import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = personObject => {
  const request = axios.post(baseUrl,personObject) 
  return request.then(response => response.data)
}

const deleteP = id => {
  const url = `${baseUrl}/${id}`
  const request = axios.delete(url)
  return request.then(response => response.data)
}

const updateNumber = (id, updatedPerson) => {
  const url = `${baseUrl}/${id}`
  const request = axios.put(url,updatedPerson)
  return request.then(response => response.data)
}

export default { getAll,create,deleteP, updateNumber }