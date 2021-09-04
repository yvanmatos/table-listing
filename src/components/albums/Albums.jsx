import PropTypes from "prop-types";
import axios from "axios"
import { useEffect, useState } from "react"
import Main from '../template/Main'
import { Button, LinearProgress, makeStyles, useTheme } from "@material-ui/core"
import { Redirect } from "react-router"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableFooter,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { Cached } from "@material-ui/icons";
import styled from "styled-components";

const headerProps = {
  icon: 'picture-o',
  title: 'Albums',
  subtitle: 'Lista os Albums carregados pela API'
}

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
    background-color: #5c098b
  }
`;

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const Albuns = () => {

  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(false)

  const [albumId, setAlbumId] = useState(-1)
  const [navigateToPhotos, setNavigateToPhotos] = useState(false)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
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
    const baseUrl = 'https://jsonplaceholder.typicode.com/albums'
    const fetchData = async () => {
      setLoading(true)
      const resp = await axios(baseUrl)
      setAlbums(resp.data)
      setLoading(false)
    }
    fetchData()
  }, [])
 

  function navigateToPage(id) {
    console.log(id)
    setNavigateToPhotos(true)
    setAlbumId(id)
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
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={albums.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
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
             <StyledButton variant="contained" size="medium" startIcon={<Cached/>} onClick={() => navigateToPage(album.id)}>Load Photos</StyledButton>
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

  return(
    <Main {...headerProps}>
      {renderTable()}
    </Main>
  )
}

export default Albuns