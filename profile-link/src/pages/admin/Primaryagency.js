import * as React from 'react';
import { CSVLink } from "react-csv";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(id, name, userId, registerDate, inviteCount, increasing, buyCount, totalSales, agencyRegister, estimatedTotal, result) {
  return { id, name, userId, registerDate, inviteCount, increasing, buyCount, totalSales, agencyRegister, estimatedTotal, result };
}

const rows = [
  createData(1, "Yoshiaki Tanaka", "STAR1", "2022/02/25", 5, 23, 55, 23800, 0, 13200, null),
  createData(2, "Yoshiaki Tanaka", "STAR1", "2022/02/25"),
  createData(3, "Yoshiaki Tanaka", "STAR1", "2022/02/25"),
  createData(4, "Yoshiaki Tanaka", "STAR1", "2022/02/25"),
  createData(5, "Yoshiaki Tanaka", "STAR1", "2022/02/25"),
  createData(6, "Yoshiaki Tanaka", "STAR1", "2022/02/25"),
  createData(7, "Yoshiaki Tanaka", "STAR1", "2022/02/25"),
  createData(8, "Yoshiaki Tanaka", "STAR1", "2022/02/25"),
  createData(9, "Yoshiaki Tanaka", "STAR1", "2022/02/25"),
  createData(10, "Yoshiaki Tanaka", "STAR1", "2022/02/25"),
  createData(11, "Yoshiaki Tanaka", "STAR1", "2022/02/25"),
  createData(12, "Yoshiaki Tanaka", "STAR1", "2022/02/25"),
  createData(13, "Yoshiaki Tanaka", "STAR1", "2022/02/25"),
  createData(14, "Yoshiaki Tanaka", "STAR1", "2022/02/25"),
  createData(15, "Yoshiaki Tanaka", "STAR1", "2022/02/25"),
  createData(16, "Yoshiaki Tanaka", "STAR1", "2022/02/25"),
];

export default function Primaryagency() {
  return (
    <div className='px-10 mb-3'>
      <CSVLink data={[]}>
        <div className='csvDownload absolute z-30 top-24 right-10 cursor-pointer max-[600px]:w-[50px] bg-indigo-700 opacity-80 hover:opacity-90 active:opacity-50 text-white py-2 max-md:px-1 md:px-5 rounded-full text-center'>CSV<span className='max-[600px]:hidden min-[600px]:inline-block'>ファイルのダウンロード</span></div>
      </CSVLink>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">氏名</StyledTableCell>
              <StyledTableCell align="center">ユーザーID</StyledTableCell>
              <StyledTableCell align="center">新規登録日時</StyledTableCell>
              <StyledTableCell align="center">つながり人数</StyledTableCell>
              <StyledTableCell align="center">前月増加分</StyledTableCell>
              <StyledTableCell align="center">購入者数</StyledTableCell>
              <StyledTableCell align="center">販売代金合計</StyledTableCell>
              <StyledTableCell align="center">代理店登録</StyledTableCell>
              <StyledTableCell align="center">推定収益合計</StyledTableCell>
              <StyledTableCell align="center">振込結果</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.userId}</StyledTableCell>
                <StyledTableCell align="center">{row.registerDate}</StyledTableCell>
                <StyledTableCell align="center">{row.inviteCount}</StyledTableCell>
                <StyledTableCell align="center">{row.increasing}</StyledTableCell>
                <StyledTableCell align="center">{row.buyCount}</StyledTableCell>
                <StyledTableCell align="center">{row.totalSales}</StyledTableCell>
                <StyledTableCell align="center">{row.agencyRegister}</StyledTableCell>
                <StyledTableCell align="center">{row.estimatedTotal}</StyledTableCell>
                <StyledTableCell align="center">{row.result}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}