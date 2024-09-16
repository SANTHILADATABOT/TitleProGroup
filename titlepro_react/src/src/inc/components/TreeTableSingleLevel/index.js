import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Paper,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';

const TreeTableRow = ({ row, level = 0 }) => {
  const [open, setOpen] = useState(false);
  const row_data = (row?.data || []);
  const children = (row?.children || []);
  return (
    <>
      <TableRow>
        <TableCell className='p-0' style={{ paddingLeft: level * 20 }}>
          {(children.length>0) && (
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
            </IconButton>
          )}
        </TableCell>
        {row_data.map((data1) => <TableCell className='p-0'>{data1}</TableCell>)}
      </TableRow>
      {(open) && (children.map((child, index) => (
        <TableRow>
          <TableCell></TableCell>
          {child.map((data1) => <TableCell className='p-0 ps-1'>{data1}</TableCell>)}
        </TableRow>
      )))}
    </>
  );
};
const TreeTableSingleLevel = ({column, row_data}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell style={{fontWeight:"bold"}}>#</TableCell>
          {column.map((column1) => (
            <TableCell style={{fontWeight:"bold"}}>{column1}</TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(row_data).map(([index, row]) => <TreeTableRow row={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TreeTableSingleLevel;
