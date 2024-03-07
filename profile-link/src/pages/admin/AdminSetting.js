import React, {useState} from 'react'
import {Close} from "@mui/icons-material";

export default function AdminSetting() {
    const [dashboardTopPCImages, setDashboardTopPCImages] = useState([]);
    const [dashboardTopMobileImages, setDashboardTopMobileImages] = useState([]);
    const [shopTopImages, setShopTopImages] = useState([]);

    return (
        <div className='p-10'>
            <div className="mt-4">
                <div className='py-3 px-4 border-l-4 border-l-indigo-600'>トップ画像（PC）</div>
                <div className="mt-4 ml-4">
                    <input type="file" accept="image/jpeg,image/png" className='p-1 text-lg border rounded-md'
                           name="product-image" onChange={(event) => {
                        if (event.target.files.length) {
                            const fr = new FileReader();
                            fr.onload = function () {
                                setDashboardTopPCImages([...dashboardTopPCImages, fr.result]);
                            }
                            fr.readAsDataURL(event.target.files[0]);
                        }
                    }}/>
                    {
                        dashboardTopPCImages.map((img, index) => <div className="relative max-w-[400px] mt-2">
                            <img src={img} alt=""/>
                            <Close className="absolute -right-8 top-0 cursor-pointer"
                                   onClick={() => setDashboardTopPCImages(dashboardTopPCImages.slice(0, index).concat(dashboardTopPCImages.slice(index + 1)))}/>
                        </div>)
                    }
                </div>
            </div>

            <div className="mt-4">
                <div className='py-3 px-4 border-l-4 border-l-indigo-600'>トップ画像（アプリ）</div>
                <div className="mt-4 ml-4">
                    <input type="file" accept="image/jpeg,image/png" className='p-1 text-lg border rounded-md'
                           name="product-image" onChange={(event) => {
                        if (event.target.files.length) {
                            const fr = new FileReader();
                            fr.onload = function () {
                                setDashboardTopMobileImages([...dashboardTopMobileImages, fr.result]);
                            }
                            fr.readAsDataURL(event.target.files[0]);
                        }
                    }}/>
                    {
                        dashboardTopMobileImages.map((img, index) => <div className="relative max-w-[400px] mt-2">
                            <img src={img} alt=""/>
                            <Close className="absolute -right-8 top-0 cursor-pointer"
                                   onClick={() => setDashboardTopMobileImages(dashboardTopMobileImages.slice(0, index).concat(dashboardTopMobileImages.slice(index + 1)))}/>
                        </div>)
                    }
                </div>
            </div>

            <div className="mt-4">
                <div className='py-3 px-4 border-l-4 border-l-indigo-600'>ショップページトップ画像</div>
                <div className="mt-4 ml-4">
                    <input type="file" accept="image/jpeg,image/png" className='p-1 text-lg border rounded-md'
                           name="product-image-back" onChange={(event) => {
                        if (event.target.files.length) {
                            const fr = new FileReader();
                            fr.onload = function () {
                                setShopTopImages([...shopTopImages, fr.result]);
                            }
                            fr.readAsDataURL(event.target.files[0]);
                        }
                    }}/>
                    {
                        shopTopImages.map((img, index) => <div className="relative max-w-[400px] mt-2">
                            <img src={img} alt=""/>
                            <Close className="absolute -right-8 top-0 cursor-pointer"
                                   onClick={() => setShopTopImages(shopTopImages.slice(0, index).concat(shopTopImages.slice(index + 1)))}/>
                        </div>)
                    }
                </div>
            </div>

            <div className='p-5'>
                <div className='flex justify-start'>
                    <div className='mt-5 py-2 px-4 mr-10 inline-block text-white bg-sky-500 rounded-lg cursor-pointer'>設定する</div>
                </div>
            </div>
        </div>
    )
}
