import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useSelector, useDispatch } from "react-redux";
import Type from "Store/TYPE";
const columns = [
  { id: "course_id", label: "Mã học phần", minWidth: 170 },
  { id: "course_name", label: "Tên học phần", minWidth: 100 },
  {
    id: "count",
    label: "Số lớp mở",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "type",
    label: "Loại học phần",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Khối lượng",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {},
});

export default function CourseDisplayTable({ data = [] }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell key="button-th"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.course_id}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell key="button-tb" align="center">
                      <AddButton data={{id:row.course_id,name:row.course_name,count:row.count}} />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const AddButton = ({ data }) => {
  const dispatch = useDispatch();
  const isAdded = useSelector((state) =>
    state.cart.courses.some((e) => e.id === data.id)
  );
  const [lock, setLock] = React.useState(false);
  const handleLockClick = () => {
    setLock(true);
  };

  React.useEffect(() => {
    if (lock) {
      dispatch({ type: Type.addToCart, payload: data });
    }
  }, [lock, data, dispatch]);
  React.useEffect(() => {
    setLock(false);
  }, [isAdded]);
  return (
    <Button
      disabled={lock}
      onClick={handleLockClick}
      color={isAdded ? "secondary" : "primary"}
      variant="contained"
    >
      {isAdded ? "Remove" : "Add"}
    </Button>
  );
};
