import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Main from "../template/Main";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
} from "@material-ui/core";
import styled from "styled-components";
import Pagination from "../pagination/Pagination";

const headerProps = {
  icon: "sticky-note-o",
  title: "Posts",
  subtitle: "Lista os Posts carregados pela API",
};

const StyledTableHead = styled(TableHead)`
  && {
    background-color: #750bb3;
  }

  .MuiTableCell-head {
    color: #fff;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: rgba(117, 11, 179, 0.05);
  }
`;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0;

  useEffect(() => {
    const baseUrl = "https://jsonplaceholder.typicode.com/posts";
    const fetchData = async () => {
      setLoading(true);
      const resp = await axios(baseUrl);
      setPosts(resp.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  function renderTable() {
    if (loading) {
      return <LinearProgress />;
    }
    return (
      <>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
            </TableRow>
          </StyledTableHead>
          {renderRows()}
          <TableFooter>
            <Pagination
              array={posts}
              page={page}
              count={posts.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
      </>
    );
  }

  function renderRows() {
    return (
      <TableBody>
        {(rowsPerPage > 0
          ? posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : posts
        ).map((post) => (
          <StyledTableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell align="left">{post.title}</TableCell>
            <TableCell align="left">{post.body}</TableCell>
          </StyledTableRow>
        ))}
        {emptyRows > 0 && (
          <StyledTableRow style={{ height: 53 * emptyRows }}>
            <TableCell />
          </StyledTableRow>
        )}
      </TableBody>
    );
  }

  return <Main {...headerProps}>{renderTable()}</Main>;
};

export default Posts;
