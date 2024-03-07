import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TransferHistory = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState(10);
  const [currentPageItems, setCurrentPageItems] = useState([]);
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

  // Render the table
  return (
    <div className="shadow rounded-lg py-5 overflow-x-auto">
      <table className="w-full min-w-[900px] text-center ">
        <tbody>
          <tr>
            <th className="py-3">No</th>
            <th className="py-3">振込完了日</th>
            <th className="py-3">つながり人数</th>
            <th className="py-3">前月増加分</th>
            <th className="py-3">購入者数</th>
            <th className="py-3">販売代金合計</th>
            <th className="py-3">振込額</th>
            <th className="py-3">振込結果</th>
          </tr>
          {currentPageItems.map((item, index) => (
            <tr key={index} className={`even:bg-white odd:bg-slate-50`}>
              <td className="p-2">{item.id}</td>
              <td className="p-2">{item.date}</td>
              <td className="p-2">{item.connected}</td>
              <td className="p-2">{item.monthlyIncreased}</td>
              <td className="p-2">{item.buyers}</td>
              <td className="p-2">{item.totalSales}</td>
              <td className="p-2">{item.transferred}</td>
              <td className="p-2">
                {
                  item.result === "pending" ?
                      <div className="rounded-lg inline-block cursor-pointer bg-yellow-500 hover:bg-red-500 active:bg-yellow-600 text-white text-sm p-1 md:px-4">
                        未振込
                      </div>
                      :
                      <div className="rounded-lg inline-block cursor-pointer bg-blue-500 hover:bg-lime-500 active:bg-blue-600 text-white text-sm p-1 md:px-4">
                        振込完了<br/>{item.transferredDate}
                      </div>
                }
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
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
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

export default TransferHistory;
