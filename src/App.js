import * as React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import API from './Api';

const BasicTable = () => {
    const [appState, setAppState] = useState({
        positions: [],
        error: null
    });

    useEffect(() => {
        API.get('v1/positions', {})
            .then((response) => {
                const rp = response.data.map((row) => ({
                    id: row.id,
                    owner: row.owner,
                    symbol: row.symbol.symbol.toString(),
                    side: row.side,
                    status: row.status,
                    created_at: row.created_at,
                    quantity: row.orders[0].quantity,
                    avatarUrl: '/static/images/avatars/eth_icon.png',
                }));


                setAppState({positions: rp, error: null});
            })
            .catch((e) => {
                console.log(e);
            });
    }, [setAppState]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Created</TableCell>
                        <TableCell align="left">User</TableCell>
                        <TableCell align="right">Symbol</TableCell>
                        <TableCell align="right">Side</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appState.positions.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{row.created_at}</TableCell>
                            <TableCell align="left">{row.owner}</TableCell>
                            <TableCell align="right">{row.symbol}</TableCell>
                            <TableCell align="right">{row.side}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BasicTable