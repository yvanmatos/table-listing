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
import { green, red } from "@material-ui/core/colors";
import { Done, Clear } from "@material-ui/icons";
import styled from "styled-components";

const headerProps = {
  icon: "list-ul",
  title: "To-Dos",
  subtitle: "Lista os To-Dos carregados pela API",
};

const headCells = [
  { id: "id", numeric: true, disablePadding: false, label: "ID" },
  { id: "title", numeric: false, disablePadding: false, label: "Title" },
  { id: "completed", numeric: true, disablePadding: false, label: "Status" },
];

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: rgba(117, 11, 179, 0.05);
  }
`;

const Status = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    margin-left: 5px;
  }
`;

const ToDos = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [toDos, setToDos] = useState([]);
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - toDos.length) : 0;

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
        <TableSort
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
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
        {stableSort(toDos, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((todo) => (
          <StyledTableRow key={todo.id}>
            <TableCell align="left">{todo.id}</TableCell>
            <TableCell align="left">{todo.title}</TableCell>
            <TableCell align="left">
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

export default ToDos;
