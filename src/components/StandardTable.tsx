import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import SearchBar from "material-ui-search-bar";

export default function StandardTable(options: {
  tableData: Array<{}>;
  rowHeaders: Array<{
    title: string;
    columnSpan: number;
  }>;
  columns: Array<{
    id: string;
    label: string;
    minWidth?: number;
    isImage?: boolean;
    align?: 'right';
    format?: (value: number) => string;
  }>;
  rowsPerPageOptions?: Array<number>;
  onRowClick?: any;
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searched, setSearched] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState<Array<{}>>([]);

  React.useEffect(function onLoad() {
    setFilteredRows(options.tableData);
  }, [options.tableData]);

  const requestSearch = (searchedValue: string) => {
    const filteredRows = options.tableData.filter((row: any) => {
      return row.name.toLowerCase().includes(searchedValue.toLowerCase());
    });
    setFilteredRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <SearchBar
        value={searched}
        onChange={(searchValue) => requestSearch(searchValue)}
        onCancelSearch={() => cancelSearch()}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {
                options.rowHeaders.map((rowHeader) => (
                  <TableCell align="center" colSpan={rowHeader.columnSpan}>
                    {rowHeader.title}
                  </TableCell>
                ))
              }
            </TableRow>
            <TableRow>
              {
                options.columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index) => {
                return (
                  <TableRow
                    onClick={() => options.onRowClick(row) || null}
                    hover 
                    role="checkbox" 
                    tabIndex={-1} 
                    key={index}>
                    {
                      options.columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {
                              column.isImage && typeof value === 'string' ?
                                <img src={value} alt={column.id} width="30" height="30"/>
                              : 
                                column.format && typeof value === 'number' ? 
                                  column.format(value)
                                : 
                                  value
                            }
                          </TableCell>
                        );
                      })
                    }
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={options.rowsPerPageOptions || [10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}