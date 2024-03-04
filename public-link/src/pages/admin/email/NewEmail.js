import * as React from 'react';
import {useState} from "react";
import ReactQuill from "react-quill";

// id,
// code,
// title,
// imageUrl,
// priceWithoutFee,
// price,
// isNew,
// isRecommended,
// isPublic,
// stock,
// createdAt,
// updatedAt
export default function NewEmail() {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [header, setHeader] = useState("");
    const [content, setContent] = useState("");
    const [footer, setFooter] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sendTestEmail = () => {

    }

    const saveEmail = () => {

    }

    const modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image'],
            [{ 'align': [] }],
            ['clean']
        ]
    };

    return (
        <div className='py-2 px-10'>
            <div className='py-1 px-4 border-l-4 border-l-indigo-600 text-2xl'>新規メール</div>

            <div className="py-8">
                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-3 text-right"><label htmlFor="product-code" className='text-md pt-2'>テンプレートタイトル<span className="text-red-500 px-1">*</span></label></div>
                    <div className="col-span-6">
                        <input type="text" className='w-full p-1 text-lg border rounded-md' name="product-code" value={code} onChange={(event) => setCode(event.target.value)} />
                    </div>
                </div>

                <div className="border-[1px] w-1/2 mx-auto my-4" />

                <div className="grid grid-cols-12 gap-2 mt-4">
                    <div className="col-span-3 text-right"><label htmlFor="product-name" className='text-md pt-2'>件名<span className="text-red-500 px-1">*</span></label></div>
                    <div className="col-span-6">
                        <input type="text" className='w-full p-1 text-lg border rounded-md' name="product-name" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                </div>

                {/*<div className="border-[1px] w-1/2 mx-auto my-4" />*/}

                {/*<div className="grid grid-cols-12 gap-2 mt-4">*/}
                {/*    <div className="col-span-3 text-right"><label htmlFor="product-name" className='text-md pt-2'>店舗通知(bcc)</label></div>*/}
                {/*    <div className="col-span-6">*/}
                {/*        <label><input type="checkbox" name="to-main-bbc"/>ショップEmail（admin@shop.jp）</label>*/}
                {/*        <input type="text" className='w-full p-1 mt-2 text-lg border rounded-md' name="product-name" value={name} onChange={(event) => setName(event.target.value)} />*/}
                {/*        <small className="text-orange-400">※店舗控えとして同じ内容のメールが送信されます。</small>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="border-[1px] w-1/2 mx-auto my-4" />

                <div className="grid grid-cols-12 gap-2 mt-4">
                    <div className="col-span-3 text-right"><label htmlFor="product-name" className='text-md pt-2'>ヘッダー<span className="text-red-500 px-1">*</span></label></div>
                    <div className="col-span-6 h-[360px]">
                        <ReactQuill className="h-[310px]" value={header} onChange={(e)=>{setHeader(e)}} modules={modules} />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-2 mt-4">
                    <div className="col-span-3 text-right"><label htmlFor="product-name" className='text-md pt-2'>本文<span className="text-red-500 px-1">*</span></label></div>
                    <div className="col-span-6 h-[360px]">
                        <ReactQuill className="h-[310px]" value={content} onChange={(e)=>{setContent(e)}} modules={modules} />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-2 mt-4">
                    <div className="col-span-3 text-right"><label htmlFor="product-name" className='text-md pt-2'>フッター<span className="text-red-500 px-1">*</span></label></div>
                    <div className="col-span-6 h-[360px]">
                        <ReactQuill className="h-[310px]" value={footer} onChange={(e)=>{setFooter(e)}} modules={modules} />
                    </div>
                </div>

                <div className="border-[1px] w-1/2 mx-auto my-4" />

                <div className='grid grid-cols-12 gap-4 mt-4 mb-8'>
                    <div className="col-span-3">
                    </div>
                    <div className="col-span-6">
                        <div className="flex items-center gap-4">
                            <button className='ml-auto block w-[150px] text-center p-2 mt-3 rounded-md bg-slate-300 hover:bg-slate-400 active:bg-slate-500 cursor-pointer'>初期値に戻す</button>
                            <button className='ml-auto block w-[150px] text-center p-2 mt-3 rounded-md bg-slate-300 hover:bg-slate-400 active:bg-slate-500 cursor-pointer' onClick={() => setIsModalOpen(true)}>プレビュー</button>
                            <button className='ml-auto block w-[150px] text-center p-2 mt-3 rounded-md bg-blue-300 hover:bg-blue-400 active:bg-blue-500 cursor-pointer' onClick={saveEmail}>保存</button>
                            <button className='ml-auto block w-[150px] text-center p-2 mt-3 rounded-md bg-slate-300 hover:bg-slate-400 active:bg-slate-500 cursor-pointer'>キャンセル</button>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <>
                    <div className='fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  max-[530px]:w-[500px] w-[500px] h-[660px] p-6 bg-white rounded-lg' style={{border:"solid 1px black"}}>
                        <h2 className='text-zinc-600 font-bold text-[18px] mt-2'>メールプレビュー</h2>

                        <div className="border-[1px] w-full mx-auto my-4" />

                        <span className="mr-4">宛先:</span>
                        <input className="w-2/3 text-lg border rounded-md px-2" type="text" name="to-test-mail"/>


                        <label className="mt-2" htmlFor="content-test-mail">件名:</label>
                        <textarea className="h-[400px] w-full p-2 text-lg border rounded-md" name="content-test-mail"/>

                        <div className="border-[1px] w-fulll mx-auto my-4" />

                        <div className='flex justify-between mt-4 font-light px-6'>
                            <button className="text-zinc-600 font-bold border py-1 px-6 rounded-xl" onClick={sendTestEmail} >テストメール送信</button>
                            <button className="text-white font-bold border py-1 px-6 rounded-xl bg-orange-400 hover:bg-orange-500" onClick={()=>{setIsModalOpen(false)}}>閉じる</button>
                        </div>
                    </div>
                    <div className='fixed w-full h-full right-0 top-0 bg-black opacity-10 z-30'></div>
                </>)
            }
        </div>
    );
}