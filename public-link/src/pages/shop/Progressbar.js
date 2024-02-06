import React from "react";

export default function Progressbar({progressState}) {
  return (
    <div className="block py-[50px] mx-auto w-[80%]">
      <ul className="regi_progress_list relative flex justify-center m-auto p-0 max:w-[1000px] leading-[1.3rem] list-none rounded-[4px] overflow-hidden z-0">
        <li className={`regi_progress_item ${progressState === 0 ? "now" : "not_yet"}`}>
          <span className="regi_progress_no">1</span>
          <span className="regi_progress_title">お客様情報</span>
        </li>
        <li className={`regi_progress_item ${progressState === 1 ? "now" : "not_yet"}`}>
          <span className="regi_progress_no">2</span>
          <span className="regi_progress_title">支払い方法</span>
        </li>
        <li className={`regi_progress_item ${progressState === 2 ? "now" : "not_yet"}`}>
          <span className="regi_progress_no">3</span>
          <span className="regi_progress_title">注文内容の確認</span>
        </li>
        <li className={`regi_progress_item ${progressState === 3 ? "now" : "not_yet"}`}>
          <span className="regi_progress_no">4</span>
          <span className="regi_progress_title">完了</span>
        </li>
      </ul>
    </div>

  );
}
