import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@material-ui/core";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import styled from "styled-components";

const StyledTableHead = styled(TableHead)`
  .MuiTableRow-head {
    background-color: #750bb3;
  }

  .MuiTableCell-head,
  .MuiButtonBase-root.MuiTableSortLabel-root:hover {
    color: white;
  }
  .MuiTableSortLabel-root.MuiTableSortLabel-active,
  .MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active
    .MuiTableSortLabel-icon,
  .MuiButtonBase-root.MuiTableSortLabel-root:hover {
    color: #fefb9f;
    opacity: 1;
  }

  @media (max-width: 360px) {
    max-width: 250px;
  }
`;

const useStyles = makeStyles(() => ({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const TableSort = (props) => {
  const classes = useStyles();
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <StyledTableHead>
      <TableRow>
        {headCells.map((headCell) =>
          headCell.unsorted ? (
            <TableCell
              key={headCell.id}
              align="center"
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.label}
            </TableCell>
          ) : (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        )}
      </TableRow>
    </StyledTableHead>
  );
};

TableSort.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default TableSort;
