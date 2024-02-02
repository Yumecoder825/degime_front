import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import UserListTable from '../../components/userlistTable';
import { CSVLink } from "react-csv";


export function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          {children}
        </Box>
      )}
    </div>
  );
}

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Gennealogylist() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const headers = [
    { label: "ID", key: "id" },
    { label: "User name", key: "username" },
    { label: "User ID", key: "userId" },
    { label: "Public URL", key: "url" },
    { label: "Register Date", key: "registerDate" },
    { label: "Invited ID", key: "inviteId" }
  ];
  const data = [{id:1, username:"Yoshiaki Tanaka", userId:"STAR", url:"https://degime.net/r/3R3uL", registerDate:"2022/02/22", inviteId:"Superstar"},
                {id:2, username:"Yoshiaki Tanaka", userId:"STAR", url:"https://degime.net/r/3R3uL", registerDate:"2022/02/22", inviteId:"Superstar"},
                {id:3, username:"Yoshiaki Tanaka", userId:"STAR", url:"https://degime.net/r/3R3uL", registerDate:"2022/02/22", inviteId:"Superstar"},
                {id:4, username:"Yoshiaki Tanaka", userId:"STAR", url:"https://degime.net/r/3R3uL", registerDate:"2022/02/22", inviteId:"Superstar"},
                {id:5, username:"Yoshiaki Tanaka", userId:"STAR", url:"https://degime.net/r/3R3uL", registerDate:"2022/02/22", inviteId:"Superstar"},
                {id:6, username:"Yoshiaki Tanaka", userId:"STAR", url:"https://degime.net/r/3R3uL", registerDate:"2022/02/22", inviteId:"Superstar"},
                {id:7, username:"Yoshiaki Tanaka", userId:"STAR", url:"https://degime.net/r/3R3uL", registerDate:"2022/02/22", inviteId:"Superstar"},
                {id:8, username:"Yoshiaki Tanaka", userId:"STAR", url:"https://degime.net/r/3R3uL", registerDate:"2022/02/22", inviteId:"Superstar"},
                {id:9, username:"Yoshiaki Tanaka", userId:"STAR", url:"https://degime.net/r/3R3uL", registerDate:"2022/02/22", inviteId:"Superstar"},
                {id:10, username:"Yoshiaki Tanaka", userId:"STAR", url:"https://degime.net/r/3R3uL", registerDate:"2022/02/22", inviteId:"Superstar"},
                {id:11, username:"Yoshiaki Tanaka", userId:"STAR", url:"https://degime.net/r/3R3uL", registerDate:"2022/02/22", inviteId:"Superstar"},
                {id:12, username:"Yoshiaki Tanaka", userId:"STAR", url:"https://degime.net/r/3R3uL", registerDate:"2022/02/22", inviteId:"Superstar"},
                {id:13, username:"Yoshiaki Tanaka", userId:"STAR", url:"https://degime.net/r/3R3uL", registerDate:"2022/02/22", inviteId:"Superstar"}]
  return (
    <div>
      <CSVLink data={data} headers={headers}>
        <div className='csvDownload absolute z-30 top-36 right-10 cursor-pointer max-[600px]:w-[50px] bg-indigo-700 opacity-80 hover:opacity-90 active:opacity-50 text-white py-2 max-md:px-1 md:px-5 rounded-full text-center'>CSV<span className='max-[600px]:hidden min-[600px]:inline-block'>ファイルのダウンロード</span></div>
      </CSVLink>
      <Box sx={{ width: '100%' }} className="px-10">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
            <Tab label="購入者リスト" {...a11yProps(0)} style={{backgroundColor:"#f87171", borderTopLeftRadius:"10px", borderTopRightRadius:"10px"}} />
            <Tab label="系譜図" {...a11yProps(1)}  style={{backgroundColor:"#38bdf8", borderTopLeftRadius:"10px", borderTopRightRadius:"10px"}}/>
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <UserListTable data={data} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className='overflow-x-auto'>
            <img className='min-w-[800px] w-full h-full' alt="diagram" src="/image/genealogy.png"  />
          </div>
        </CustomTabPanel>
      </Box>
    </div>

  );
}