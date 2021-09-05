import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Main from "../template/Main";
import Pagination from "../pagination/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { Done, Clear } from "@material-ui/icons";
import styled from "styled-components";

const headerProps = {
  icon: "list-ul",
  title: "To-Dos",
  subtitle: "Lista os To-Dos carregados pela API",
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

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin-left: 5px;
  }
`;

const Posts = () => {
  const [toDos, setToDos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - toDos.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const baseUrl = "https://jsonplaceholder.typicode.com/todos";
    const fetchData = async () => {
      setLoading(true);
      const resp = await axios(baseUrl);
      setToDos(resp.data);
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
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </StyledTableHead>
          {renderRows()}
          <TableFooter>
            <Pagination
              array={toDos}
              page={page}
              count={toDos.length}
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
          ? toDos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : toDos
        ).map((todo) => (
          <StyledTableRow key={todo.id}>
            <TableCell>{todo.id}</TableCell>
            <TableCell align="left">{todo.title}</TableCell>
            <TableCell align="center">
              {todo.completed ? (
                <Status>
                  <Done fontSize="large" style={{ color: green[500] }} />
                  <span>Completed</span>
                </Status>
              ) : (
                <Status>
                  <Clear fontSize="large" style={{ color: red[500] }} />
                  <span>Not Completed</span>
                </Status>
              )}
            </TableCell>
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
