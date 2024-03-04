import * as React from 'react';
import {CSVLink} from "react-csv";
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Checkbox} from "@mui/material";
import {useState} from "react";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
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

function createData(id, code, title, imageUrl, priceWithoutFee, price, isNew, isRecommended, isPublic, stock, createdAt, updatedAt) {
    return {
        id,
        code,
        title,
        imageUrl,
        priceWithoutFee,
        price,
        isNew,
        isRecommended,
        isPublic,
        stock,
        createdAt,
        updatedAt
    };
}

const now = Date.now();
const rows = [
    createData(1, "A000000001", "degimeカード", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", 3000, 3300, false, false, true, 10, now, now),
    createData(2, "A000000002", "degimeカード", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", 3000, 3300, false, false, true, 10, now, now),
    createData(3, "A000000003", "degimeカード", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", 3000, 3300, false, false, true, 10, now, now),
    createData(4, "A000000004", "degimeカード", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", 3000, 3300, false, false, true, 10, now, now),
    createData(5, "A000000005", "degimeカード", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", 3000, 3300, false, false, true, 10, now, now),
    createData(6, "A000000006", "degimeカード", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", 3000, 3300, false, false, true, 10, now, now),
    createData(7, "A000000007", "degimeカード", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", 3000, 3300, false, false, true, 10, now, now),
    createData(8, "A000000008", "degimeカード", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", 3000, 3300, false, false, true, 10, now, now),
    createData(9, "A000000009", "degimeカード", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", 3000, 3300, false, false, true, 10, now, now),
    createData(10, "A000000010", "degimeカード", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", 3000, 3300, false, false, true, 10, now, now),
    createData(11, "A000000011", "degimeカード", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", 3000, 3300, false, false, true, 10, now, now),
    createData(12, "A000000012", "degimeカード", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", 3000, 3300, false, false, true, 10, now, now),
    createData(13, "A000000013", "degimeカード", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", 3000, 3300, false, false, true, 10, now, now),
    createData(14, "A000000014", "degimeカード", "https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg", 3000, 3300, false, false, true, 10, now, now),
];

export default function ProductList() {
    const [products, setProducts] = useState(rows);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    const onChange = (id, field, checked) => {
        // TODO call api for updating product info

        const newProducts = products.map(p => p.id === id ? {...p, [field]: checked} : p);
        setProducts(newProducts);

        toast.success("Successfully updated!");
    }

    const onSelect = (id, selected) => {
        if (selectAll) {
            setSelectAll(false);
            const newIds = products.filter(p => p.id !== id).map(p => p.id);
            setSelectedIds(newIds);
        } else if (selected) {
            setSelectedIds([...selectedIds, id]);
        } else {
            const newIds = selectedIds.filter(pid => pid !== id);
            setSelectedIds(newIds);
        }
    }

    return (
        <div className='px-10 mb-3'>
            <div className="flex justify-between items-center mb-2">
                <Link to="/admin/products/new" className="bg-indigo-700 opacity-80 hover:opacity-90 active:opacity-50 text-white py-2 max-md:px-1 md:px-5 rounded-full text-center">商品登録</Link>
                <CSVLink data={[]}>
                    <div
                        className='csvDownload cursor-pointer max-[600px]:w-[50px] bg-indigo-700 opacity-80 hover:opacity-90 active:opacity-50 text-white py-2 max-md:px-1 md:px-5 rounded-full text-center'>CSV<span
                        className='max-[600px]:hidden min-[600px]:inline-block'>ファイルのダウンロード</span></div>
                </CSVLink>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <Checkbox
                                    sx={{
                                        color: "white",
                                        '&.Mui-checked': {
                                            color: "white",
                                        },
                                    }}
                                    checked={selectAll}
                                    onChange={(event, checked) => {
                                        if (checked) {
                                            setSelectAll(true);
                                        } else {
                                            setSelectedIds([]);
                                            setSelectAll(false);
                                        }
                                    }}
                                />
                            </StyledTableCell>
                            <StyledTableCell>商品コード</StyledTableCell>
                            <StyledTableCell align="center">商品画像(表)</StyledTableCell>
                            <StyledTableCell align="center">商品名</StyledTableCell>
                            <StyledTableCell align="center">価格(税抜)<br/>(税込)</StyledTableCell>
                            <StyledTableCell align="center">新着</StyledTableCell>
                            <StyledTableCell align="center">おすすめ</StyledTableCell>
                            <StyledTableCell align="center">公開</StyledTableCell>
                            <StyledTableCell align="center">在庫</StyledTableCell>
                            <StyledTableCell align="center">変更<br/>最終更新日時</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((p) => (
                            <StyledTableRow key={p.id}>
                                <StyledTableCell><Checkbox checked={selectAll || selectedIds.includes(p.id)}
                                                           onChange={(event, checked) => onSelect(p.id, checked)}/></StyledTableCell>
                                <StyledTableCell component="th" scope="row">{p.code}</StyledTableCell>
                                <StyledTableCell align="center"><img src={p.imageUrl} className="w-[80px] mx-auto"
                                                                     alt=""/></StyledTableCell>
                                <StyledTableCell align="center">{p.title}</StyledTableCell>
                                <StyledTableCell
                                    align="center">{new Intl.NumberFormat().format(p.priceWithoutFee)}<br/>({new Intl.NumberFormat().format(p.price)})</StyledTableCell>
                                <StyledTableCell align="center"><Checkbox checked={p.isNew}
                                                                          onChange={(event, checked) => onChange(p.id, "isNew", checked)}/></StyledTableCell>
                                <StyledTableCell align="center"><Checkbox checked={p.isRecommended}
                                                                          onChange={(event, checked) => onChange(p.id, "isRecommended", checked)}/></StyledTableCell>
                                <StyledTableCell align="center">{p.isPublic ?
                                    <span className="text-blue-500">公開中</span> :
                                    <span className="text-gray-500">非公開</span>}</StyledTableCell>
                                <StyledTableCell align="center">{p.stock}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <div className="px-2 py-5 flex flex-col text-[16px]">
                                        <button
                                            className="rounded-lg cursor-pointer bg-red-400 hover:bg-red-500 active:bg-red-600 text-white max-[680px]:text-sm max-[680px]:p-1">
                                            削除
                                        </button>
                                        <button
                                            className="mt-3 rounded-lg cursor-pointer bg-lime-400 hover:bg-lime-500 active:bg-lime-600 text-white max-[680px]:text-sm max-[680px]:p-1">
                                            編集
                                        </button>
                                    </div>
                                    <div>
                                        {moment(p.updatedAt).format("YYYY/MM/DD")}
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