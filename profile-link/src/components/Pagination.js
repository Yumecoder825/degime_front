import React from "react";

export default function Pagination({ page, perPage, total, onChangePerPage, onChangePage}) {
    return (
        <div className="w-full p-3 flex justify-around items-center">
            <div className="">{`${
                page * perPage - (perPage - 1)
            }-${
                page * perPage > total
                    ? total
                    : page * perPage
            } of ${total}`}</div>
            <div>
                <div>
                    <span className="text-black/70 hidden md:inline-block">ページあたりの行数：</span>
                    <select
                        className="border-2 border-black/40 rounded-md"
                        value={perPage}
                        onChange={(e) => onChangePerPage(e.target.value)}
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
                        onChangePage(page - 1);
                    }}
                    disabled={page === 1}
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
            {page} / {Math.ceil(total / perPage)}
          </span>
                <button
                    onClick={() => onChangePage(page + 1)}
                    disabled={page === Math.ceil(total / perPage)}
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
    )
}
