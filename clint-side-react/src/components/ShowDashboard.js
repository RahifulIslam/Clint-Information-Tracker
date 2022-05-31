import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';

const ShowDashboard = ({ tasks }) => {
    // console.log("Task after propsing:", tasks)
    // console.log("Task 0 is :", tasks[0].TRACK_ID)

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [
        { id: 'track-id', label: 'Track Id', minWidth: 170 },
        { id: 'process-name', label: 'Process Name', minWidth: 100 },
        { id: 'work-location', label: 'Work Location', minWidth: 170 },
        { id: 'photo', label: 'Photo', minWidth: 170 },
    ];

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 500, mt: 2, mb: 1 }} >
                <Table sx={{ mt: 2, mb: 1, ml: 2, mr: 2, p: "auto" }} >
                    <TableHead >
                        <TableRow style={{ backgroundColor: '#40c4ff', fontSize: '20px' }}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{ minWidth: column.minWidth, }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                console.log("rows are:", row)
                                console.log("track id of rows:", row.PHOTO)

                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.TRACK_ID}>
                                        <TableCell>
                                            {row.TRACK_ID}
                                        </TableCell>

                                        <TableCell >
                                            {row.PROCESS_NAME}
                                        </TableCell>

                                        <TableCell>
                                            {row.WORK_LOCATION}
                                        </TableCell>

                                        <TableCell>
                                            <Avatar alt="Photo" src={row.PHOTO} variant="square" />
                                
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
                count={tasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

    );
};

export default ShowDashboard;
