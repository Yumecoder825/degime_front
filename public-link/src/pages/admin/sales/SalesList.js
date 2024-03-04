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

const PERIOD_TYPE_YEAR = 0;
const PERIOD_TYPE_MONTH = 1;
const PERIOD_TYPE_DAY = 2;
const FORMATS = ["YYYY", "MM/YYYY", "MM/DD/YYYY"];

export default function SalesList() {
    const [sales, setSales] = useState(rows);
    const [periodType, setPeriodType] = useState(2);
    const [startDate, setStartDate] = useState(new Date().setDate(1));
    const [endDate, setEndDate] = useState(Date.now());

    useEffect(() => {
        const now = new Date();
        switch (periodType) {
            case PERIOD_TYPE_YEAR:
                setEndDate(now.setMonth(0, 1));
                setStartDate(new Date().setFullYear(now.getFullYear() - 1, 0, 1));
                break;
            case PERIOD_TYPE_MONTH:
                setEndDate(now.setDate(1));
                let lastMonth = now.getMonth() - 1;
                lastMonth = lastMonth < 0 ? 12 + lastMonth : lastMonth;
                setStartDate(new Date().setMonth(lastMonth, 1));
                break;
            case PERIOD_TYPE_DAY:
                setEndDate(now.getTime());
                setStartDate(new Date().setDate(1));
                break;
        }
    }, [periodType]);


    // calculate total
    const total = {
        salesCount: 0,
        orderPrice: 0,
        shippingPrice: 0,
        payFee: 0,
        consumeFee: 0,
        total: 0
    };
    for(const sale of sales) {
        total.salesCount += sale.salesCount;
        total.orderPrice += sale.orderPrice;
        total.shippingPrice += sale.shippingPrice;
        total.payFee += sale.payFee;
        total.consumeFee += sale.consumeFee;
        total.total += sale.total;
    }

    return (
        <div className='px-10 mb-3'>
            <div className="flex justify-end items-center mb-2 gap-4">
                <NativeSelect
                    value={periodType}
                    onChange={(e)=> setPeriodType(Number(e.target.value))}
                    inputProps={{
                        name: 'periodType',
                        id: 'period-type',
                    }}
                >
                    <option value={PERIOD_TYPE_YEAR}>年次</option>
                    <option value={PERIOD_TYPE_MONTH}>月次</option>
                    <option value={PERIOD_TYPE_DAY}>日次</option>
                </NativeSelect>
                <div className="flex justify-end items-center gap-2">
                    <label className="">期間指定: </label>
                    <Datetime dateFormat={FORMATS[periodType]} timeFormat={false} inputProps={{ className: "py-1 px-2", placeholder: "MM/DD/YYYY" }} value={startDate} />
                    <span> ~ </span>
                    <Datetime dateFormat={FORMATS[periodType]} timeFormat={false} inputProps={{ className: "py-1 px-2", placeholder: "MM/DD/YYYY" }} value={endDate} />
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">計</StyledTableCell>
                            <StyledTableCell align="center">売上件数</StyledTableCell>
                            <StyledTableCell align="center">注文金額</StyledTableCell>
                            <StyledTableCell align="center">送料</StyledTableCell>
                            <StyledTableCell align="center">決済手数料</StyledTableCell>
                            <StyledTableCell align="center">消費税</StyledTableCell>
                            <StyledTableCell align="center">合計</StyledTableCell>
                            <StyledTableCell align="center">-</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row" align="center"></StyledTableCell>
                            <StyledTableCell align="center">{total.salesCount}</StyledTableCell>
                            <StyledTableCell align="center">{total.orderPrice}</StyledTableCell>
                            <StyledTableCell align="center">{total.shippingPrice}</StyledTableCell>
                            <StyledTableCell align="center">{total.payFee}</StyledTableCell>
                            <StyledTableCell align="center">{total.consumeFee}</StyledTableCell>
                            <StyledTableCell align="center">{total.total}</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">日付</StyledTableCell>
                            <StyledTableCell align="center">売上件数</StyledTableCell>
                            <StyledTableCell align="center">注文金額</StyledTableCell>
                            <StyledTableCell align="center">送料</StyledTableCell>
                            <StyledTableCell align="center">決済手数料</StyledTableCell>
                            <StyledTableCell align="center">消費税</StyledTableCell>
                            <StyledTableCell align="center">合計</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sales.map((p, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row" align="center">{moment(p.date).format(FORMATS[periodType])}</StyledTableCell>
                                <StyledTableCell align="center">{p.salesCount}</StyledTableCell>
                                <StyledTableCell align="center">{p.orderPrice}</StyledTableCell>
                                <StyledTableCell align="center">{p.shippingPrice}</StyledTableCell>
                                <StyledTableCell align="center">{p.payFee}</StyledTableCell>
                                <StyledTableCell align="center">{p.consumeFee}</StyledTableCell>
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