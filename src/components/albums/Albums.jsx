import axios from "axios"
import { useEffect, useState } from "react"
import Main from '../template/Main'

const headerProps = {
  icon: 'picture-o',
  title: 'Albums',
  subtitle: 'Lista os Albúns carregados pela API'
}

const Albuns = () => {

  const [albuns, setAlbuns] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const baseUrl = 'https://jsonplaceholder.typicode.com/albums'
    const fetchData = async () => {
      setLoading(true)
      const resp = await axios(baseUrl)
      setAlbuns(resp.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  return(
    <Main {...headerProps}>
      {}
    </Main>
  )
}

export default Albuns