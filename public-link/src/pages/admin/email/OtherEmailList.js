import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
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

function createData(id, type, title, content, autoSend, bbc) {
    return {
        id,
        type,
        title,
        content,
        autoSend,
        bbc,
    };
}

const rows = [
    createData(1, "回答・返信", "【{shop_name}】ご返答 (#{ticket_number})", "", ""),
    createData(2, "会員セグメント", "【{shop_name}】 (#{user_name})", "", ""),
];

export default function OtherEmailList() {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        // TODO load emails

        setEmails(rows);
    }, []);

    return (
        <div className='mb-3'>
            <div className="mb-4">
                <Link to="/admin/emails/new" className="bg-indigo-700 opacity-80 hover:opacity-90 active:opacity-50 text-white py-2 max-md:px-1 md:px-5 rounded-full text-center">新規作成</Link>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">メール種類</StyledTableCell>
                            <StyledTableCell align="center">件名／店舗通知(bcc)</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {emails.map((p) => (
                            <StyledTableRow key={p.id}>
                                <StyledTableCell component="th" scope="row" align="center">{p.type}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">{p.title}<br/>{p.bbc}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <div className="px-2 py-5 flex flex-col text-[16px]">
                                        <button
                                            className="mt-3 rounded-lg cursor-pointer bg-lime-400 hover:bg-lime-500 active:bg-lime-600 text-white max-[680px]:text-sm max-[680px]:p-1">
                                            編集
                                        </button>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}