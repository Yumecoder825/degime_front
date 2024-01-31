import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Table = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState(5);
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
    <>
      <table className="w-full text-center">
        <tbody>
          <tr>
            <th className="py-3">No</th>
            <th className="py-3">カード名</th>
            <th className="py-3">製品イメージ</th>
            <th className="py-3">価格</th>
            <th className="py-3">在庫数</th>
            <th className="py-3">在庫量</th>
            <th className="py-3">詳細を見る/購入</th>
          </tr>
          {currentPageItems.map((item, index) => (
            <tr key={index} className={`even:bg-white odd:bg-slate-50`}>
              <td className="px-2">{item.id}</td>
              <td className="px-2">{item.cardname}</td>
              <td className="px-2 justify-center items-center">
                <img src={item.image || ""} alt={item.cardname} />
              </td>
              <td className="px-2 break-words max-[440px]:w-[50px]">{item.price}</td>
              <td className="px-2">{item.variant}</td>
              <td className="px-2">{item.stock}</td>
              <td className="px-2">
                <Link to="/shop/detail" className="min-[680px]:p-3 rounded-lg cursor-pointer bg-lime-400 hover:bg-lime-500 active:bg-lime-600 text-white max-[680px]:text-sm max-[680px]:p-1">
                  詳細
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render the pagination controls here */}
      <div className="w-full p-3 flex text-xl justify-around items-center">
        <div className="">{`${
          currentPage * selectedValue - (selectedValue - 1)
        }-${
          currentPage * selectedValue > data.length
            ? data.length
            : currentPage * selectedValue
        } of ${data.length}`}</div>
        <div>
          <div>
            <span className="text-black/70">ページあたりの行数：</span>
            <select
              className="border-2 border-black/40 rounded-md"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
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
    </>
  );
};

export default Table;
