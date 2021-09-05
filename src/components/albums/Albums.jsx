import axios from "axios";
import { useEffect, useState } from "react";
import Main from "../template/Main";
import Pagination from "../pagination/Pagination";
import { Button, LinearProgress } from "@material-ui/core";
import { Redirect } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
} from "@material-ui/core";
import { Cached } from "@material-ui/icons";
import styled from "styled-components";

const headerProps = {
  icon: "picture-o",
  title: "Albums",
  subtitle: "Lista os Albums carregados pela API",
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
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  const [albumId, setAlbumId] = useState(-1);
  const [navigateToPhotos, setNavigateToPhotos] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - albums.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          <StyledTableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </StyledTableHead>
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
        {(rowsPerPage > 0
          ? albums.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : albums
        ).map((album) => (
          <StyledTableRow key={album.id}>
            <TableCell>{album.id}</TableCell>
            <TableCell align="left">{album.title}</TableCell>
            <TableCell align="center">
              <StyledButton
                variant="contained"
                size="medium"
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

  return <Main {...headerProps}>{renderTable()}</Main>;
};

export default Albuns;
