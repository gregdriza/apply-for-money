import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const renderRows = (data) => {
  return data.filter(item => item !== undefined).map((row) => {
    return (
      <TableRow
        key={row.name}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align="right">{row.name_first}</TableCell>
        <TableCell align="right">{row.name_last}</TableCell>
        <TableCell align="right">{row.address_line_1}</TableCell>
        <TableCell align="right">{row.address_line_2}</TableCell>
        <TableCell align="right">{row.address_city}</TableCell>
        <TableCell align="right">{row.address_state}</TableCell>
        <TableCell align="right">{row.address_postal_code}</TableCell>
        <TableCell align="right">{row.address_country_code}</TableCell>
        <TableCell align="right">{row.document_ssn}</TableCell>
        <TableCell align="right">{row.birth_date}</TableCell>
      </TableRow>
    )
  })
}

export default function BasicTable({manualReviewData}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "30%", overflow: 'scroll' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Address Line 1</TableCell>
            <TableCell align="right">Address Line 2</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Zip</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">SSN</TableCell>
            <TableCell align="right">DOB</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {manualReviewData.length > 0 ? renderRows(manualReviewData) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}