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
    createData(1, "注文確認", "【{shop_name}】ご注文の受付 (#{order_number})", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", true, ""),
    createData(2, "店舗受付", "【{shop_name}】ご注文の店舗受付 (#{order_number})", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", true, ""),
    createData(3, "商品発送", "【{shop_name}】ご注文の商品発送 (#{order_number})", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", true, ""),
    createData(4, "入金確認", "【{shop_name}】ご注文の入金確認 (#{order_number})", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", true, ""),
    createData(5, "注文取消", "【{shop_name}】ご注文の取消 (#{order_number})", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", true, ""),
    createData(6, "オンライン決済案内", "【{shop_name}】ご注文のオンライン決済案内 (#{order_number})", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", true, ""),
];

export default function AutoEmailList() {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        // TODO load emails

        setEmails(rows);
    }, []);

    return (
        <div className='mb-3'>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">メール種類</StyledTableCell>
                            <StyledTableCell align="center">自動送信</StyledTableCell>
                            <StyledTableCell align="center">件名／店舗通知(bcc)</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {emails.map((p) => (
                            <StyledTableRow key={p.id}>
                                <StyledTableCell component="th" scope="row" align="center">{p.type}</StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="center">{p.autoSend ? <span className="text-blue-500">送信する</span> : <span className="text-gray-500">送信しない</span>}</StyledTableCell>
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