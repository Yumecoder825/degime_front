import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalBody,
  TEModalFooter
} from "tw-elements-react";

import HorizontalSlider from '../../components/Slidecomponent';

export default function Shopdetail() {
  const related_goods=[{img:"/image/card_1.jpg", id:"A000000001", name:"degimeカード_1", url:"https://degime.easy-myshop.jp/c-item-detail?ic=A000000001", price:"3,300円"},
                        {img:"/image/card_2.jpg", id:"A000000002", name:"degimeカード_2", url:"https://degime.easy-myshop.jp/c-item-detail?ic=A000000002", price:"3,500円"},
                        {img:"/image/card_3.jpg", id:"A000000003", name:"degimeカード_3", url:"https://degime.easy-myshop.jp/c-item-detail?ic=A000000003", price:"3,700円"},
                        {img:"/image/card_4.jpg", id:"A000000004", name:"degimeカード_4", url:"https://degime.easy-myshop.jp/c-item-detail?ic=A000000004", price:"3,100円"},
                        {img:"/image/card_5.jpg", id:"A000000005", name:"degimeカード_5", url:"https://degime.easy-myshop.jp/c-item-detail?ic=A000000005", price:"3,900円"},
                      ];
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Link to="/dashboard"><img alt="logo" src="/image/logo.png" width="150" className='pt-3 pl-5' /></Link>
      <div className='mx-auto pt-10 w-full'>
        <img alt="item" src="/image/detail-card.png" className='w-[50%] mx-auto' />
      </div>
      <div className='px-10'>
        <h1 className='text-2xl font-bold my-3'>degimeカード</h1>
        <Divider />
        <div className='my-2'>商品コード A000000001</div>
        <div className='my-2 text-xl'>価格  <span className='ml-2 text-red-500'>3,300円</span></div>
        <div className='my-2'>送料  <Link to="https://degime.easy-myshop.jp/c-law" className='ml-2 underline text-sky-400 hover:text-sky-500 active:text-sky-700'>詳細はこちら</Link></div>
        <div className='my-2'>数量 
          <select className='ml-3 border text-lg'>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
          </select>
        </div>
        <div className='my-2 flex flex-col items-center justify-center'>
          <TERipple rippleColor="white" className='w-[50%]'>
            <button className='flex items-center min-[400px]:px-10 max-[400px]:px-2 py-3 w-full bg-neutral-600 justify-center text-white cursor-pointer max-[400px]:text-sm' onClick={()=>setShowModal(true)}><img alt="cart" src="/image/cart.svg" width={20} height={20} className='mr-3' />カートに入れる</button>
            <div className='absolute left-0 -bottom-10'>返品について</div> 
          </TERipple>
          <TERipple rippleColor="black" className='mt-16'>
            <button className='flex justify-center items-center text-black rounded-full border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'>
              <svg width="24" height="18" className='mr-5' viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.91667 23.3333C2.11459 23.3333 1.42771 23.0475 0.856044 22.4758C0.284377 21.9042 -0.000969746 21.2178 2.47595e-06 20.4167V2.91667C2.47595e-06 2.11459 0.285836 1.42771 0.857503 0.856044C1.42917 0.284377 2.11556 -0.000969746 2.91667 2.47595e-06H26.25C27.0521 2.47595e-06 27.739 0.285836 28.3106 0.857502C28.8823 1.42917 29.1676 2.11556 29.1667 2.91667V20.4167C29.1667 21.2188 28.8808 21.9056 28.3092 22.4773C27.7375 23.049 27.0511 23.3343 26.25 23.3333H2.91667ZM14.5833 13.125L26.25 5.83334V2.91667L14.5833 10.2083L2.91667 2.91667V5.83334L14.5833 13.125Z" fill="#545454"/>
              </svg>
              この商品について問合せる
            </button>
          </TERipple>
        </div>
        <div className='border-l-4 px-3 my-2 text-lg'>商品説明</div>
        <div className='px-4 text-wrap w-full'>degimeカードは専用アプリと連携すると、スマホに近づけるだけでそのスマホにデジタル名刺を表示させることができます。</div>
      </div>
      <div className='w-full mt-12 min-[400px]:p-[80px] max-[400px]:p-[30px] aspect-[4/1] bg-neutral-300'>
        <div className='mb-5'><Link className='text-indigo-600 hover:underline hover:text-indigo-700 active:text-indigo-800' to="https://degime.easy-myshop.jp/c-law">特定商取引法に基づく表示</Link>   |   <Link className='text-indigo-600 hover:underline hover:text-indigo-700 active:text-indigo-800' to="https://degime.easy-myshop.jp/c-law">プライバシーポリシー</Link></div>
        <div>Copyright ©degimeカード All Rights Reserved.</div>
      </div>
      <TEModal show={showModal} setShow={setShowModal} staticBackdrop>
        <TEModalDialog style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}>
          <TEModalContent style={{padding:"30px"}}>
            {/* <!--Modal body--> */}
            <TEModalBody>
              <div className="flex flex-col items-center">
                <div>ショッピングカートに登録しました。</div>
                <div>
                  <img alt="good" src="/image/nfc-card.png" />
                  <div>
                    <p>A0000000002</p>
                    <p className='text-lg font-bold'>degimeカード2</p>
                    <p>数量: 1</p>
                    <p className='text-lg text-red-500'>3,300円</p>
                  </div>
                </div>
                <div className='border-l-4 border-t-2 p-4 mt-5'>これを見た人はこれも見ています</div>
                <div className='flex w-full gap-x-2 my-5'>
                  <HorizontalSlider data={related_goods} />
                </div>
              </div>
            </TEModalBody>
            <TEModalFooter>
            {(
              
              <div className="w-full flex justify-around">
                <TERipple>
                  <a
                    // type="button"
                    className="inline-block rounded-sm border-2 bg-secondary border-secondary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:border-secondary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-secondary-600 focus:border-secondary-600 focus:text-secondary-600 focus:outline-none focus:ring-0 active:border-secondary-700 active:text-secondary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                    aria-label="c-cart"
                    href="/shop/contract/1"
                  >
                    カートを見る
                  </a>
                </TERipple>
                <TERipple>
                  <button
                    type="button"
                    className="inline-block rounded-sm bg-secondary-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-secondary-700 transition duration-150 ease-in-out hover:bg-secondary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  >
                    ショッピングを続ける
                  </button>
                </TERipple>
              </div>
            )
            }
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  )
}
