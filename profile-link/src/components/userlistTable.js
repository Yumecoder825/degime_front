import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserListTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState(50);
  const [currentPageItems, setCurrentPageItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedValue(parseInt(event.target.value));
  };
  // Calculate the index of the first item on the current page
  const startIndex = (currentPage - 1) * selectedValue;

  useEffect(() => {
    const pageItems = data.slice(startIndex, startIndex + selectedValue);
    // console.log(pageItems, selectedValue);
    setCurrentPageItems(pageItems);
    if(!pageItems.length) setCurrentPage(1);
  }, [currentPage, selectedValue, data, startIndex]);
  // Get the items for the current page

  const onSelectItem = (id, checked) => {
    if (selectAll) {
      setSelectAll(false);
      setSelectedIds([id]);
    } else {
      if(checked) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds(selectedIds.filter(s => s !== id));
      }
    }
  }

  // Render the table
  return (
    <div className="shadow rounded-lg py-5 overflow-x-auto">
      <table className="w-full min-w-[900px] text-center ">
        <tbody>
          <tr>
            <th className="py-3">No</th>
            <th className="py-3">氏名</th>
            <th className="py-3">ユーザーID</th>
            <th className="py-3">名刺URL</th>
            <th className="py-3">新規登録日時</th>
            <th className="py-3">紹介した人ID</th>
            <th className="py-3"><Link to="/mail"><img alt="mail" src="/image/email.png" width="21" className="mx-auto" /></Link></th>
            <th className="py-3"><div className="cursor-pointer" onClick={() => setSelectAll(!selectAll)}>すべて</div></th>
          </tr>
          {currentPageItems.map((item, index) => (
            <tr key={index} className={`even:bg-white odd:bg-slate-50`}>
              <td className="p-2">{item.id}</td>
              <td className="p-2">{item.username}</td>
              <td className="p-2">{item.userId}</td>
              <td className="p-2">{item.url}</td>
              <td className="p-2">{item.registerDate}</td>
              <td className="p-2">{item.inviteId}</td>
              <td className="p-2">
                <input type="checkbox" onChange={(event) => onSelectItem(item.id, event.target.checked)} name="select_for_mail" checked={selectAll || selectedIds.includes(item.id)} />
              </td>
              <td className="p-2">
                <div className="flex gap-2 justify-center items-center">
                  <Link to="/shop/detail" className="rounded-lg cursor-pointer bg-red-400 hover:bg-red-500 active:bg-red-600 text-white text-sm px-1 md:px-4">
                    削除
                  </Link>
                  <Link to="/shop/detail" className="rounded-lg cursor-pointer bg-lime-400 hover:bg-lime-500 active:bg-lime-600 text-white text-sm px-1 md:px-4">
                    編集
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render the pagination controls here */}
      <div className="w-full p-3 flex justify-around items-center">
        <div className="">{`${
          currentPage * selectedValue - (selectedValue - 1)
        }-${
          currentPage * selectedValue > data.length
            ? data.length
            : currentPage * selectedValue
        } of ${data.length}`}</div>
        <div>
          <div>
            <span className="text-black/70 hidden md:inline-block">ページあたりの行数：</span>
            <select
              className="border-2 border-black/40 rounded-md"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            disabled={currentPage === 1}
            className="mr-2 max-[400px]:ml-2 ml-10"
          >
            <svg
              width="14"
              height="23"
              viewBox="0 0 14 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 22L1 11.5L13 1"
                stroke="#868FA0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="max-[500px]:text-sm max-w-[70px]">
            {currentPage} / {Math.ceil(data.length / selectedValue)}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(data.length / selectedValue)}
            className="mx-2"
          >
            <svg
              width="14"
              height="23"
              viewBox="0 0 14 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L13 11.5L1 22"
                stroke="#868FA0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserListTable;
