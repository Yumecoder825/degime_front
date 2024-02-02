import React from 'react';
import { CSVLink } from "react-csv";
import UserListTable from '../../components/userlistTable';

export default function Userlist() {
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
    <div className='px-10'>
      <CSVLink data={[]}>
        <div className='csvDownload absolute z-30 top-24 right-10 cursor-pointer max-[600px]:w-[50px] bg-indigo-700 opacity-80 hover:opacity-90 active:opacity-50 text-white py-2 max-md:px-1 md:px-5 rounded-full text-center'>CSV<span className='max-[600px]:hidden min-[600px]:inline-block'>ファイルのダウンロード</span></div>
      </CSVLink>
      <UserListTable data={data} />
    </div>
  )
}
