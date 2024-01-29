import React from 'react'
import { Link } from "react-router-dom";
import { TERipple } from "tw-elements-react";

import Progressbar from "./Progressbar";



export default function ContractOne() {
  return (
    <div>
      <Link to="/dashboard"><img alt="logo" src="/image/logo.png" width="150" className='pt-3 pl-5' /></Link>
      <Progressbar progressState={0} />
      <div className="px-10">
        <table className="w-full text-center">
          <tbody>
            <tr>
              <th className="py-3">削除</th>
              <th className="py-3">No</th>
              <th className="py-3">商品コード／商品名</th>
              <th className="py-3">価格</th>
              <th className="py-3">数量</th>
              <th className="py-3">小計(税込)</th>
            </tr>
            <tr className={`even:bg-white odd:bg-slate-50`}>
              <td className="px-2">
                <input type="checkbox" id="cart-check" />
              </td>
              <td className="px-2">1</td>
              <td className="px-2 flex justify-center py-2">
                <img src="/image/card_1.jpg" alt="card_1" width="72" />
                <div className="ml-3">
                  <p>A0000000001</p>
                  <p className="text-red-500">
                    <Link to="#">degimeカード</Link>
                  </p>
                </div>
              </td>
              <td className="px-2">3,300円</td>
              <td className="px-2 text-red-500">5</td>
              <td className="px-2">16,500円</td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-col p-6  w-full justify-end items-end bg-zinc-300">
          <div className="mr-32 mb-5 text-sm">
            商品合計
            <span className="ml-24 text-2xl text-blue-800">16,500円</span>
          </div>
          <div className="mr-32 text-green-500">(10%対象 16,500円)</div>
        </div>
        <div className="flex p-6  w-full justify-end items-center ">
          <div className="px-2 rounded-lg bg-red-600  text-sm text-white inline-block">
            必須
          </div>
          <span className="ml-4">は必須項目です</span>
        </div>
        <div className="w-full px-8 py-4 bg-slate-300 text-lg text-white">
          発送先登録
        </div>
        <table className="w-full">
          <tbody>
            <tr className="p-4 border-b-2 border-b-black/40">
              <td className="p-4">お名前</td>
              <td className="p-4">
                <div className="px-2 rounded-lg bg-red-600  text-sm text-white inline-block">
                  必須
                </div>
              </td>
              <td className="p-4">
                <input
                  type="text"
                  name="name"
                  className="px-3 py-2 border text-lg"
                  required
                />
              </td>
            </tr>
            <tr className="p-4 border-b-2 border-b-black/40">
              <td className="p-4">郵便番号</td>
              <td className="p-4">
                <div className="px-2 rounded-lg bg-red-600  text-sm text-white inline-block">
                  必須
                </div>
              </td>
              <td className="p-4 flex">
                <input
                  type="text"
                  name="name"
                  placeholder="012-3456"
                  className="px-3 py-2 border text-lg self-center mr-3"
                  required
                />
                <TERipple rippleColor="white">
                  <div className="bg-zinc-800 px-10 py-5 text-white self-center cursor-pointer">
                    住所取得
                  </div>
                </TERipple>
              </td>
            </tr>
            <tr className="p-4 border-b-2 border-b-black/40">
              <td className="p-4">都道府県</td>
              <td className="p-4">
                <div className="px-2 rounded-lg bg-red-600  text-sm text-white inline-block">
                  必須
                </div>
              </td>
              <td className="p-4">
                <select
                  name="buyer_ken"
                  size="1"
                  id="buyer_ken"
                  className="validate[required] p-2 border"
                  data-prompt-target="v_err_ken"
                  autoComplete="address-level1"
                  required
                >
                  <option value="" select="true">
                    --都道府県--
                  </option>
                  <option value="北海道">北海道</option>
                  <option value="青森県">青森県</option>
                  <option value="岩手県">岩手県</option>
                  <option value="宮城県">宮城県</option>
                  <option value="秋田県">秋田県</option>
                  <option value="山形県">山形県</option>
                  <option value="福島県">福島県</option>
                  <option value="茨城県">茨城県</option>
                  <option value="栃木県">栃木県</option>
                  <option value="群馬県">群馬県</option>
                  <option value="埼玉県">埼玉県</option>
                  <option value="千葉県">千葉県</option>
                  <option value="東京都">東京都</option>
                  <option value="神奈川県">神奈川県</option>
                  <option value="山梨県">山梨県</option>
                  <option value="長野県">長野県</option>
                  <option value="新潟県">新潟県</option>
                  <option value="富山県">富山県</option>
                  <option value="石川県">石川県</option>
                  <option value="福井県">福井県</option>
                  <option value="岐阜県">岐阜県</option>
                  <option value="静岡県">静岡県</option>
                  <option value="愛知県">愛知県</option>
                  <option value="三重県">三重県</option>
                  <option value="滋賀県">滋賀県</option>
                  <option value="京都府">京都府</option>
                  <option value="大阪府">大阪府</option>
                  <option value="兵庫県">兵庫県</option>
                  <option value="奈良県">奈良県</option>
                  <option value="和歌山県">和歌山県</option>
                  <option value="鳥取県">鳥取県</option>
                  <option value="島根県">島根県</option>
                  <option value="岡山県">岡山県</option>
                  <option value="広島県">広島県</option>
                  <option value="山口県">山口県</option>
                  <option value="徳島県">徳島県</option>
                  <option value="香川県">香川県</option>
                  <option value="愛媛県">愛媛県</option>
                  <option value="高知県">高知県</option>
                  <option value="福岡県">福岡県</option>
                  <option value="佐賀県">佐賀県</option>
                  <option value="長崎県">長崎県</option>
                  <option value="熊本県">熊本県</option>
                  <option value="大分県">大分県</option>
                  <option value="宮崎県">宮崎県</option>
                  <option value="鹿児島県">鹿児島県</option>
                  <option value="沖縄県">沖縄県</option>
                </select>
              </td>
            </tr>
            <tr className="p-4 border-b-2 border-b-black/40">
              <td className="p-4">住所１</td>
              <td className="p-4">
                <div className="px-2 rounded-lg bg-red-600  text-sm text-white inline-block">
                  必須
                </div>
              </td>
              <td className="p-4">
                <input
                  type="text"
                  name="name"
                  className="px-3 py-2 w-[80%] border text-lg"
                  required
                />
              </td>
            </tr>
            <tr className="p-4 border-b-2 border-b-black/40">
              <td className="p-4">住所 2</td>
              <td className="p-4"> </td>
              <td className="p-4">
                <input
                  type="text"
                  name="name"
                  className="px-3 py-2 w-[80%] border text-lg"
                />
              </td>
            </tr>
            <tr className="p-4 border-b-2 border-b-black/40">
              <td className="p-4">メールアドレス</td>
              <td className="p-4">
                <div className="px-2 rounded-lg bg-red-600  text-sm text-white inline-block">
                  必須
                </div>
              </td>
              <td className="p-4">
                <input
                  type="email"
                  name="name"
                  className="px-3 py-2 border text-lg"
                  required
                />
              </td>
            </tr>
            <tr className="p-4 border-b-2 border-b-black/40">
              <td className="p-4">電話番号</td>
              <td className="p-4">
                <div className="px-2 rounded-lg bg-red-600  text-sm text-white inline-block">
                  必須
                </div>
              </td>
              <td className="p-4">
                <input
                  type="text"
                  name="name"
                  className="px-3 py-2 border text-lg"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <TERipple rippleColor="white">
          <div className="bg-zinc-800 px-10 py-5 text-white mt-10  cursor-pointer flex items-center">
            <svg
              width="33"
              height="28"
              viewBox="0 0 33 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3"
            >
              <path
                d="M0 14.5833V21.875C0 22.2618 0.153645 22.6327 0.427136 22.9062C0.700626 23.1797 1.07156 23.3333 1.45833 23.3333H2.91667C2.91667 24.4937 3.3776 25.6065 4.19808 26.4269C5.01855 27.2474 6.13135 27.7083 7.29167 27.7083C8.45199 27.7083 9.56479 27.2474 10.3853 26.4269C11.2057 25.6065 11.6667 24.4937 11.6667 23.3333H20.4167C20.4167 24.4937 20.8776 25.6065 21.6981 26.4269C22.5185 27.2474 23.6313 27.7083 24.7917 27.7083C25.952 27.7083 27.0648 27.2474 27.8853 26.4269C28.7057 25.6065 29.1667 24.4937 29.1667 23.3333H30.625C31.0118 23.3333 31.3827 23.1797 31.6562 22.9062C31.9297 22.6327 32.0833 22.2618 32.0833 21.875V4.375C32.0833 3.21468 31.6224 2.10188 30.8019 1.28141C29.9815 0.460936 28.8687 0 27.7083 0H14.5833C13.423 0 12.3102 0.460936 11.4897 1.28141C10.6693 2.10188 10.2083 3.21468 10.2083 4.375V7.29167H7.29167C6.61247 7.29167 5.9426 7.4498 5.33511 7.75355C4.72761 8.05729 4.19919 8.49831 3.79167 9.04167L0.291667 13.7083C0.249012 13.7717 0.214702 13.8403 0.189583 13.9125L0.102083 14.0729C0.0377213 14.2356 0.00314277 14.4085 0 14.5833ZM23.3333 23.3333C23.3333 23.0449 23.4189 22.7629 23.5791 22.5231C23.7394 22.2833 23.9671 22.0964 24.2336 21.986C24.5001 21.8756 24.7933 21.8468 25.0762 21.903C25.3591 21.9593 25.6189 22.0982 25.8229 22.3021C26.0268 22.5061 26.1657 22.7659 26.222 23.0488C26.2783 23.3317 26.2494 23.6249 26.139 23.8914C26.0286 24.1579 25.8417 24.3857 25.6019 24.5459C25.3621 24.7061 25.0801 24.7917 24.7917 24.7917C24.4049 24.7917 24.034 24.638 23.7605 24.3645C23.487 24.091 23.3333 23.7201 23.3333 23.3333ZM13.125 4.375C13.125 3.98823 13.2786 3.61729 13.5521 3.3438C13.8256 3.07031 14.1966 2.91667 14.5833 2.91667H27.7083C28.0951 2.91667 28.466 3.07031 28.7395 3.3438C29.013 3.61729 29.1667 3.98823 29.1667 4.375V20.4167H28.0292C27.6191 19.9655 27.1193 19.6051 26.5618 19.3584C26.0042 19.1117 25.4013 18.9843 24.7917 18.9843C24.182 18.9843 23.5791 19.1117 23.0216 19.3584C22.464 19.6051 21.9642 19.9655 21.5542 20.4167H13.125V4.375ZM10.2083 13.125H4.375L6.125 10.7917C6.26084 10.6105 6.43698 10.4635 6.63948 10.3623C6.84198 10.261 7.06527 10.2083 7.29167 10.2083H10.2083V13.125ZM5.83333 23.3333C5.83333 23.0449 5.91886 22.7629 6.07911 22.5231C6.23935 22.2833 6.46711 22.0964 6.73359 21.986C7.00006 21.8756 7.29329 21.8468 7.57617 21.903C7.85906 21.9593 8.11891 22.0982 8.32286 22.3021C8.52682 22.5061 8.66571 22.7659 8.72198 23.0488C8.77825 23.3317 8.74937 23.6249 8.63899 23.8914C8.52861 24.1579 8.3417 24.3857 8.10187 24.5459C7.86205 24.7061 7.5801 24.7917 7.29167 24.7917C6.90489 24.7917 6.53396 24.638 6.26047 24.3645C5.98698 24.091 5.83333 23.7201 5.83333 23.3333ZM2.91667 16.0417H10.2083V20.0958C9.34767 19.3266 8.21791 18.9287 7.06518 18.9888C5.91245 19.0489 4.83018 19.5622 4.05417 20.4167H2.91667V16.0417Z"
                fill="white"
              />
            </svg>
            お届け先を別で指定する
          </div>
        </TERipple>
        <div className="w-full mt-10 px-8 py-4 bg-slate-300 text-lg text-white">
          その他
        </div>
        <div className="w-full flex items-center justify-around p-[30px] border-b-2">
          <div>ご要望</div>
          <textarea className="w-[70%] h-[200px]" />
        </div>
        <div>
          <TERipple rippleColor="white" style={{ display: "block" }}>
            <Link
              className="w-[70%] relative mx-auto justify-center bg-zinc-800 px-10 py-5 text-white mt-10 cursor-pointer flex items-center"
              to="/shop/contract/2"
            >
              お支払方法へ
              <svg
                className="absolute right-5"
                width="13"
                height="25"
                viewBox="0 0 13 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.547878 28.2862C1.27838 29.2379 2.46276 29.2379 3.19326 28.2862L12.4521 16.2233C13.1826 15.2715 13.1826 13.7285 12.4521 12.7767L3.19327 0.713804C2.46276 -0.237936 1.27838 -0.237936 0.547878 0.713804C-0.182625 1.66554 -0.182626 3.20861 0.547878 4.16035L8.48404 14.5L0.547878 24.8396C-0.182625 25.7914 -0.182625 27.3345 0.547878 28.2862Z"
                  fill="white"
                />
              </svg>
            </Link>
          </TERipple>
        </div>
        <TERipple
          rippleColor="white"
          style={{ display: "block", paddingBottom: "100px" }}
        >
          <Link
            className="w-[50%] mx-auto justify-center bg-neutral-600 px-10 py-5 text-white mt-10 cursor-pointer flex items-center"
            to="/shop/detail"
          >
            前の画面へ戻る
          </Link>
        </TERipple>
      </div>
    </div>
  );
}
