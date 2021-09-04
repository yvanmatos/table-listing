import axios from "axios";
import { useEffect, useState } from "react";
import Main from "../template/Main";
import Pagination from "../template/Pagination";

const headerProps = {
  icon:'sticky-note-o',
  title: 'Posts',
  subtitle: 'Lista os Posts carregados pela API'
}

const Posts = () =>  {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  useEffect(() => {
    const baseUrl = 'https://jsonplaceholder.typicode.com/posts'
    const fetchData = async () => {
      setLoading(true)
      const resp = await axios(baseUrl)
      setPosts(resp.data)
      setLoading(false)
    }
    fetchData();
   },[])

   // Get current posts
   const indexOfLastPost = currentPage * postsPerPage
   const indexOfFirstPost = indexOfLastPost - postsPerPage
   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)


   // Change pages
   const paginate = (pageNumber) => {
     setCurrentPage(pageNumber)
    }

  function renderTable() {
    if(loading) {
      return <h2>Loading</h2>
    }
    return(
      <>
      <table className="table table-striped mt2">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Conteúdo</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
      <Pagination postPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
      </>
    )
  }

  function renderRows() {
    return currentPosts.map(post => {
      return (
        <tr key={post.id}>
          <td>{post.id}</td>
          <td>{post.title}</td>
          <td>{post.body}</td>
        </tr>
      )
    })
  }
  
  return(
    <Main {...headerProps}>
      {renderTable()}
    </Main>
  )
}

export default Posts