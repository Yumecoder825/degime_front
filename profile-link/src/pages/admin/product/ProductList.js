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
import {Checkbox, DialogContentText} from "@mui/material";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import moment from "moment";
import {Apis} from "../../../api";
import Pagination from "../../../components/Pagination";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";

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

export default function ProductList() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(50);
    const [total, setTotal] = useState(0);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(null);

    useEffect(() => {
        loadProducts().then();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        const res = await Apis.myGet(`shop/product?page=${page}&per_page=${perPage}`);
        if (res && res.success) {
            setProducts(res.data.items);
            setPage(res.data.page);
            setPerPage(res.data.per_page);
            setTotal(res.data.total);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadProducts().then();
    }, [page, perPage]);

    const onChange = async (id, field, checked) => {
        const p = products.find(p => p.id === id);
        let payload = {...p, [field]: checked};

        const res = await Apis.myPut("shop/product", payload);
        if (res && res.success) {
            toast.success(`Product is successfully updated!`);
            loadProducts().then();
            return;
        }
        if (res && res.data.error) {
            toast.error(res.data.error);
        } else {
            toast.error(`Failed! Please try again!`);
        }
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

    const handleDeleteProduct = async (id) => {
        setLoading(true);
        const res = await Apis.myDelete(`shop/product?id=${id}`);
        if (res.success) {
            toast.success("Successfully deleted!");
            loadProducts().then();
        } else {
            setLoading(false)
        }
    }

    const csvData = [["商品コード", "商品名", "価格(税抜)", "価格(税込)", "新着", "おすすめ", "公開", "在庫", "最終更新日時"]];
    for(const product of products) {
        csvData.push([
            product.code,
            product.title,
            product.price_without_fee,
            product.price,
            product.is_new ? '新着': '',
            product.is_recommended ? 'おすすめ' : '',
            product.is_public ? '公開中' : '非公開',
            product.stock,
            moment(product.updated_at).format("YYYY/MM/DD"),
        ]);
    }

    return (
        <div className='px-10 mb-3'>
            <div className="flex justify-between items-center mb-2">
                <Link to="/admin/products/new" className="bg-indigo-700 opacity-80 hover:opacity-90 active:opacity-50 text-white py-2 max-md:px-1 md:px-5 rounded-full text-center">商品登録</Link>
                <CSVLink data={csvData} filename={`商品一覧_${page}.csv`}>
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
                                <StyledTableCell align="center"><img src={p.image_urls[0]} className="w-[80px] mx-auto"
                                                                     alt=""/></StyledTableCell>
                                <StyledTableCell align="center">{p.title}</StyledTableCell>
                                <StyledTableCell
                                    align="center">{new Intl.NumberFormat().format(p.price_without_fee)}<br/>({new Intl.NumberFormat().format(p.price)})</StyledTableCell>
                                <StyledTableCell align="center"><Checkbox checked={p.is_new}
                                                                          onChange={(event, checked) => onChange(p.id, "is_new", checked)}/></StyledTableCell>
                                <StyledTableCell align="center"><Checkbox checked={p.is_recommended}
                                                                          onChange={(event, checked) => onChange(p.id, "is_recommended", checked)}/></StyledTableCell>
                                <StyledTableCell align="center">{p.is_public ?
                                    <span className="text-blue-500">公開中</span> :
                                    <span className="text-gray-500">非公開</span>}</StyledTableCell>
                                <StyledTableCell align="center">{p.stock}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <div className="px-2 py-2 flex flex-col text-[16px]">
                                        <button
                                            className="rounded-lg cursor-pointer bg-red-400 hover:bg-red-500 active:bg-red-600 text-white max-[680px]:text-sm max-[680px]:p-1"
                                            onClick={() => setOpenConfirmDelete(p.id)}
                                        >
                                            削除
                                        </button>
                                        <button
                                            className="mt-3 rounded-lg cursor-pointer bg-lime-400 hover:bg-lime-500 active:bg-lime-600 text-white max-[680px]:text-sm max-[680px]:p-1"
                                            onClick={() => navigate(`/admin/products/edit?id=${p.id}`)}
                                        >
                                            編集
                                        </button>
                                    </div>
                                    <div>
                                        {moment(p.updated_at).format("YYYY/MM/DD")}
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                page={page}
                perPage={perPage}
                total={total}
                onChangePage={(p) => setPage(p)}
                onChangePerPage={(l) => setPerPage(l)}
            />
            <Dialog
                open={!!openConfirmDelete}
                onClose={() => setOpenConfirmDelete(null)}
            >
                <DialogTitle>
                    この製品を削除してもよろしいですか？
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDelete(null)}>キャンセル</Button>
                    <Button onClick={() => handleDeleteProduct(openConfirmDelete)} autoFocus>
                        削除
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}
