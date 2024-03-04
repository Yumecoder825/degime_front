import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Checkbox, NativeSelect} from "@mui/material";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import moment from "moment";
import Datetime from "react-datetime";
import {Link} from "react-router-dom";
import {CSVLink} from "react-csv";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
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

function createData(date, salesCount, orderPrice, shippingPrice, payFee, consumeFee, total) {
    return {
        date,
        salesCount,
        orderPrice,
        shippingPrice,
        payFee,
        consumeFee,
        total
    };
}

const now = Date.now();
const rows = [
    createData(now, 3, 1200, 10, 5, 100, 1315),
    createData(now, 3, 1200, 10, 5, 100, 1315),
    createData(now, 3, 1200, 10, 5, 100, 1315),
    createData(now, 3, 1200, 10, 5, 100, 1315),
    createData(now, 3, 1200, 10, 5, 100, 1315),
    createData(now, 3, 1200, 10, 5, 100, 1315),
    createData(now, 3, 1200, 10, 5, 100, 1315),
    createData(now, 3, 1200, 10, 5, 100, 1315),
    createData(now, 3, 1200, 10, 5, 100, 1315),
    createData(now, 3, 1200, 10, 5, 100, 1315),
    createData(now, 3, 1200, 10, 5, 100, 1315),
    createData(now, 3, 1200, 10, 5, 100, 1315),
    createData(now, 3, 1200, 10, 5, 100, 1315),
    createData(now, 3, 1200, 10, 5, 100, 1315),
];

export default function ShippingList() {
    const [shippings, setShippings] = useState([]);


    return (
        <div className='px-10 mb-3'>
            <div className="flex justify-start items-center mb-2 gap-4">
                <button className="bg-indigo-700 opacity-80 hover:opacity-90 active:opacity-50 text-white py-2 max-md:px-1 md:px-5 rounded-full text-center">発送待ち</button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">日付</StyledTableCell>
                            <StyledTableCell align="center">注文番号</StyledTableCell>
                            <StyledTableCell align="center">会員ID</StyledTableCell>
                            <StyledTableCell align="center">アカウント名</StyledTableCell>
                            <StyledTableCell align="center">氏名</StyledTableCell>
                            <StyledTableCell align="center">郵便番号</StyledTableCell>
                            <StyledTableCell align="center">住所</StyledTableCell>
                            <StyledTableCell align="center">電話番号</StyledTableCell>
                            <StyledTableCell align="center">注文品</StyledTableCell>
                            <StyledTableCell align="center">注文数</StyledTableCell>
                            <StyledTableCell align="center">注文金額</StyledTableCell>
                            <StyledTableCell align="center">決済手数料</StyledTableCell>
                            <StyledTableCell align="center">合計</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            shippings.length === 0 && <StyledTableRow><StyledTableCell colSpan={15} align="center">該当する注文は 0 件 です</StyledTableCell></StyledTableRow>
                        }
                        {shippings.map((p, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row" align="center">{moment(p.date).format("YYYY/MM/DD")}</StyledTableCell>
                                <StyledTableCell align="center">{p.salesCount}</StyledTableCell>
                                <StyledTableCell align="center">{p.orderPrice}</StyledTableCell>
                                <StyledTableCell align="center">{p.shippingPrice}</StyledTableCell>
                                <StyledTableCell align="center">{p.payFee}</StyledTableCell>
                                <StyledTableCell align="center">{p.consumeFee}</StyledTableCell>
                                <StyledTableCell align="center">{p.total}</StyledTableCell>
                                <StyledTableCell align="center">{p.total}</StyledTableCell>
                                <StyledTableCell align="center">{p.total}</StyledTableCell>
                                <StyledTableCell align="center">{p.total}</StyledTableCell>
                                <StyledTableCell align="center">{p.total}</StyledTableCell>
                                <StyledTableCell align="center">{p.total}</StyledTableCell>
                                <StyledTableCell align="center">{p.total}</StyledTableCell>
                                <StyledTableCell align="center">{p.total}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {/*<div className="px-2 py-5 flex flex-col text-[16px]">*/}
                                    {/*    <button*/}
                                    {/*        className="rounded-lg cursor-pointer bg-lime-400 hover:bg-lime-500 active:bg-lime-600 text-white max-[680px]:text-sm max-[680px]:p-1">*/}
                                    {/*        詳細*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}