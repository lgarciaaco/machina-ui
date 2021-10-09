import * as React from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {getPositions, isAuthenticated} from "../repository";
import {styled} from "@mui/material/styles";
import moment from "moment";

const SPACED_DATE_FORMAT = "DD MMM YYYY HH:mm";

function Row(props) {
 const {row} = props;
 const [open, setOpen] = React.useState(false);

 return (
     <React.Fragment>
      <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
       <TableCell>
        <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
        >
         {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
        </IconButton>
       </TableCell>
       <StyledTableCell component="th" scope="row">{moment(new Date(row.created_at)).format(SPACED_DATE_FORMAT)}</StyledTableCell>
       <StyledTableCell align="right">{row.owner}</StyledTableCell>
       <StyledTableCell align="right">{row.side}</StyledTableCell>
       <StyledTableCell align="right">{row.symbol.symbol}</StyledTableCell>
       <StyledTableCell align="right">{row.status}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
       <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
         <Box sx={{margin: 1}}>
          <Typography variant="h6" gutterBottom component="div">Orders</Typography>
          <Table size="small" aria-label="purchases">
           <TableHead>
            <TableRow>
             <TableCell>Date</TableCell>
             <TableCell>Side</TableCell>
             <TableCell>Asset price</TableCell>
             <TableCell align="right">Amount</TableCell>
             <TableCell align="right">Status</TableCell>
             <TableCell align="right">Total price ($)</TableCell>
            </TableRow>
           </TableHead>
           <TableBody>
            {row.orders.map((orderRow) => (
                <StyledInnerTableRow key={orderRow.id}>
                 <TableCell component="th" scope="row">{moment(new Date(orderRow.created_at)).format(SPACED_DATE_FORMAT)}</TableCell>
                 <TableCell>{orderRow.side}</TableCell>
                 <TableCell>{orderRow.price}</TableCell>
                 <TableCell align="right">{orderRow.quantity}</TableCell>
                 <TableCell align="right">{orderRow.status}</TableCell>
                 <TableCell align="right">{Math.round(orderRow.quantity * orderRow.price * 100) / 100}</TableCell>
                </StyledInnerTableRow>
            ))}
           </TableBody>
          </Table>
         </Box>
        </Collapse>
       </TableCell>
      </StyledTableRow>
     </React.Fragment>
 );
}

Row.propTypes = {
 row: PropTypes.shape({
  id: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
  side: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  orders: PropTypes.arrayOf(
      PropTypes.shape({
       id: PropTypes.number.isRequired,
       created_at: PropTypes.string.isRequired,
       price: PropTypes.number.isRequired,
       quantity: PropTypes.number.isRequired,
       status: PropTypes.string.isRequired,
       side: PropTypes.string.isRequired,
      }),
  ).isRequired,
  symbol: PropTypes.shape({
   id: PropTypes.number.isRequired,
   symbol: PropTypes.string.isRequired,
   status: PropTypes.string.isRequired,
  })
 }).isRequired,
};

const StyledTableCell = styled(TableCell)(({theme}) => ({
 [`&.${tableCellClasses.head}`]: {
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  fontSize: 16,
 },
 [`&.${tableCellClasses.body}`]: {
  fontSize: 14,
 },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
 '&:nth-of-type(odd)': {
  backgroundColor: theme.palette.action.hover,
 },
 // hide last border
 '&:last-child td, &:last-child th': {
  border: 0,
 },
}));

const StyledInnerTableRow = styled(TableRow)(({theme}) => ({
 // hide last border
 '&:last-child td, &:last-child th': {
  border: 0,
 },
}));

export default function CollapsibleTable() {
 const [appState, setAppState] = useState({
  auth: true,
  positions: [],
  error: null
 });

 useEffect(() => {
  if (isAuthenticated())
   getPositions().then((positions) => {
    setAppState({auth: true, positions: positions, error: null});
   }).catch(err => {
    alert('User Not Authenticated');
    setAppState({auth: false, positions: [], error: err}
    )
   })
  else {
   alert('User Not Authenticated');
   this.setState({auth: false})
  }
 }, [setAppState])

 return (
     <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
       <TableHead>
        <StyledTableRow>
         <StyledTableCell/>
         <StyledTableCell>Creation date</StyledTableCell>
         <StyledTableCell align="right">Strategy</StyledTableCell>
         <StyledTableCell align="right">Side</StyledTableCell>
         <StyledTableCell align="right">Symbol</StyledTableCell>
         <StyledTableCell align="right">Status</StyledTableCell>
        </StyledTableRow>
       </TableHead>
       <TableBody>
        {appState.positions.map((row) => (
            <Row key={row.name} row={row}/>
        ))}
       </TableBody>
      </Table>
     </TableContainer>
 );
}
