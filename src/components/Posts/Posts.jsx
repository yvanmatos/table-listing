import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Main from "../Template/Main";
import Pagination from "../Pagination/Pagination";
import TableSort from "../TableSort/TableSort";
import { stableSort, getComparator } from "../../services/sort.js";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
} from "@material-ui/core";
import { ViewList } from "@material-ui/icons";
import styled from "styled-components";

const headCells = [
  { id: "id", numeric: false, disablePadding: false, label: "ID" },
  { id: "title", numeric: false, disablePadding: false, label: "Title" },
  { id: "body", numeric: false, disablePadding: false, label: "Content" },
];

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: rgba(117, 11, 179, 0.05);
  }
`;

const Posts = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
          <TableSort
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          {renderRows()}
          <TableFooter>
            <Pagination
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
        {stableSort(posts, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((post) => (
            <StyledTableRow key={post.id}>
              <TableCell align="left">{post.id}</TableCell>
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

  return (
    <Main
      icon={ViewList}
      title="Posts"
      subtitle="Lista os Posts carregados pela API"
    >
      {renderTable()}
    </Main>
  );
};

export default Posts;
