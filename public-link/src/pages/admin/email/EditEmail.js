import * as React from "react";

export default function EditEmail({}) {
    return (
        <div>
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
        </div>
    )
}