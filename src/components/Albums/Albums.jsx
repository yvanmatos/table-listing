import axios from "axios";
import { useEffect, useState } from "react";
import Main from "../Template/Main";
import Pagination from "../Pagination/Pagination";
import TableSort from "../TableSort/TableSort";
import { stableSort, getComparator } from "../../services/sort.js";
import { Button, LinearProgress } from "@material-ui/core";
import { Redirect } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
} from "@material-ui/core";
import { Cached, Image } from "@material-ui/icons";
import styled from "styled-components";

const headCells = [
  { id: "id", numeric: false, disablePadding: false, label: "ID" },
  { id: "title", numeric: false, disablePadding: false, label: "Title" },
  {
    id: "",
    numeric: false,
    disablePadding: false,
    label: "Action",
    unsorted: true,
  },
];

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: rgba(117, 11, 179, 0.05);
  }
`;

const StyledButton = styled(Button)`
  && {
    background-color: #750bb3;
    color: #fff;
  }

  &&:hover {
    background-color: #5c098b;
  }
`;

const Albuns = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  const [albumId, setAlbumId] = useState(-1);
  const [navigateToPhotos, setNavigateToPhotos] = useState(false);

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - albums.length) : 0;

  useEffect(() => {
    const baseUrl = "https://jsonplaceholder.typicode.com/albums";
    const fetchData = async () => {
      setLoading(true);
      const resp = await axios(baseUrl);
      setAlbums(resp.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  function navigateToPage(id) {
    setNavigateToPhotos(true);
    setAlbumId(id);
  }

  function renderTable() {
    if (loading) {
      return <LinearProgress />;
    }

    if (navigateToPhotos) {
      return <Redirect to={`/photos/${albumId}`} />;
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
              array={albums}
              page={page}
              count={albums.length}
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
        {stableSort(albums, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((album) => (
            <StyledTableRow key={album.id}>
              <TableCell align="left">{album.id}</TableCell>
              <TableCell align="left">{album.title}</TableCell>
              <TableCell align="center">
                <StyledButton
                  variant="contained"
                  size="small"
                  startIcon={<Cached />}
                  onClick={() => navigateToPage(album.id)}
                >
                  Load Photos
                </StyledButton>
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

  return (
    <Main
      icon={Image}
      title="Albums"
      subtitle="Lista os Albums carregados pela API"
    >
      {renderTable()}
    </Main>
  );
};

export default Albuns;
