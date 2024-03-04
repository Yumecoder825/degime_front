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
import moment from "moment";

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

function createData(id, date, fromEmail, title, content, replied) {
    return {
        id,
        date,
        fromEmail,
        title,
        content,
        replied
    };
}

const now = Date.now();

const rows = [
    createData(1, now, "test@test.com", "デスど", "デスど", false),
    createData(2, now, "test@test.com", "デスど", "デスど", false),
    createData(3, now, "test@test.com", "デスど", "デスど", false),
    createData(4, now, "test@test.com", "デスど", "デスど", false),
    createData(5, now, "test@test.com", "デスど", "デスど", false),
    createData(6, now, "test@test.com", "デスど", "デスど", false),
];

export default function AskList() {
    const　[asks, setAsks] = useState([]);

    useEffect(() => {
        // TODO load asks

        setAsks(rows);
    }, []);

    return (
        <div className='mb-3'>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">日時</StyledTableCell>
                            <StyledTableCell align="center">メールアドレス</StyledTableCell>
                            <StyledTableCell align="center">タイトル</StyledTableCell>
                            <StyledTableCell>内容</StyledTableCell>
                            <StyledTableCell align="center">返信</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {asks.map((p) => (
                            <StyledTableRow key={p.id}>
                                <StyledTableCell align="center">{moment(p.date).format("YYYY/MM/DD")}</StyledTableCell>
                                <StyledTableCell align="center">{p.fromEmail}</StyledTableCell>
                                <StyledTableCell align="center">{p.title}</StyledTableCell>
                                <StyledTableCell>{p.content}</StyledTableCell>
                                <StyledTableCell>{p.replied?"返信済み":""}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <div className="px-2 py-5 flex flex-col text-[16px]">
                                        <button
                                            className="mt-3 rounded-lg cursor-pointer bg-lime-400 hover:bg-lime-500 active:bg-lime-600 text-white max-[680px]:text-sm max-[680px]:p-1">
                                            回答・返信メール送信
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