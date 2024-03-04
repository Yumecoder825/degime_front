import * as React from 'react';
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {useEffect, useState} from "react";
import {ChromePicker} from "react-color";
import TextEditor from "../../../components/Textedit";
import {Close} from "@mui/icons-material";

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
export default function UpdateProduct() {
    const [product, setProduct] = useState({});
    const [logoColor, setLogoColor] = useState("white");
    const [isPublic, setIsPublic] = useState(true);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const [images, setImages] = useState([]);
    const [backImageUrls, setBackImageUrls] = useState([]);
    const [backImages, setBackImages] = useState([]);
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(0);

    useEffect(() => {
        // TODO load product from product id

        setLogoColor("blue");
        setIsPublic(true);
        setCode("A000000001");
        setName("degimeカード");
        setImageUrls(["https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg"]);
        setBackImageUrls(["https://www23.easy-myshop.jp/emsrsc/degime/itemimg/1/list.item.1.1.jpg"]);
        setDescription("<p>デスと</p>")
        setStock(10);

    }, []);

    return (
        <div className='py-2 px-10'>
            <div className='py-1 px-4 border-l-4 border-l-indigo-600 text-2xl'>商品変更</div>

            <div className="py-8">
                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-3 text-right"><label htmlFor="product-code" className='text-md pt-2'>商品コード<span className="text-red-500 px-1">*</span></label></div>
                    <div className="col-span-6">
                        <input type="text" className='p-1 text-lg border rounded-md' name="product-code" value={code} onChange={(event) => setCode(event.target.value)} />
                        <button className="bg-gray-200 border-[1px] border-gray-300 rounded-md text-sm px-2 py-1 ml-4">自動採番</button>
                        <small className="ml-4">※登録後の変更不可</small>
                    </div>
                </div>

                <div className="border-[1px] w-1/2 mx-auto my-4" />

                <div className="grid grid-cols-12 gap-2 mt-4">
                    <div className="col-span-3 text-right"><label htmlFor="product-name" className='text-md pt-2'>商品名<span className="text-red-500 px-1">*</span></label></div>
                    <div className="col-span-6">
                        <input type="text" className='w-full p-1 text-lg border rounded-md' name="product-name" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                </div>

                <div className="border-[1px] w-1/2 mx-auto my-4" />

                <div className="grid grid-cols-12 gap-2 mt-4">
                    <div className="col-span-3 text-right"><label htmlFor="product-image" className='text-md pt-2'>オリジナル画像(表)<span className="text-red-500 px-1">*</span></label></div>
                    <div className="col-span-6">
                        <input type="file" accept="image/jpeg,image/png" className='w-full p-1 text-lg border rounded-md' name="product-image" onChange={(event) => {
                            if (event.target.files.length) {
                                const fr = new FileReader();
                                fr.onload = function () {
                                    setImages([...images, fr.result]);
                                }
                                fr.readAsDataURL(event.target.files[0]);
                            }
                        }} />
                        {
                            imageUrls.map((img, index) => <div className="relative w-[px] mt-2">
                                <img src={img} alt=""/>
                                <Close className="absolute -right-8 top-0 cursor-pointer" onClick={() => setImageUrls(imageUrls.slice(0, index).concat(imageUrls.slice(index + 1)))}/>
                            </div>)
                        }
                        {
                            images.map((img, index) => <div className="relative w-[px] mt-2">
                                <img src={img} alt=""/>
                                <Close className="absolute -right-8 top-0 cursor-pointer" onClick={() => setImages(images.slice(0, index).concat(images.slice(index + 1)))}/>
                            </div>)
                        }
                    </div>
                </div>

                <div className="border-[1px] w-1/2 mx-auto my-4" />

                <div className="grid grid-cols-12 gap-4 mt-4">
                    <div className="col-span-3 text-right"><label htmlFor="product-image-back" className='text-md pt-2'>オリジナル画像(裏)</label></div>
                    <div className="col-span-6">
                        <input type="file" accept="image/jpeg,image/png" className='w-full p-1 text-lg border rounded-md' name="product-image-back" onChange={(event) => {
                            if (event.target.files.length) {
                                const fr = new FileReader();
                                fr.onload = function () {
                                    setBackImages([...backImages, fr.result]);
                                }
                                fr.readAsDataURL(event.target.files[0]);
                            }
                        }} />
                        {
                            backImageUrls.map((img, index) => <div className="relative w-[px] mt-2">
                                <img src={img} alt=""/>
                                <Close className="absolute -right-8 top-0 cursor-pointer" onClick={() => setBackImageUrls(backImageUrls.slice(0, index).concat(backImageUrls.slice(index + 1)))}/>
                            </div>)
                        }
                        {
                            backImages.map((img, index) => <div className="relative w-[px] mt-2">
                                <img src={img} alt=""/>
                                <Close className="absolute -right-8 top-0 cursor-pointer" onClick={() => setBackImages(backImages.slice(0, index).concat(backImages.slice(index + 1)))}/>
                            </div>)
                        }
                    </div>
                </div>

                <div className="border-[1px] w-1/2 mx-auto my-4" />

                <div className="grid grid-cols-12 gap-4 mt-4">
                    <div className="col-span-3 text-right"><label htmlFor="product-logo-color" className='text-md pt-2'>ロゴマークの色</label></div>
                    <div className="col-span-6">
                        <RadioGroup
                            aria-labelledby="logo-color-group-label"
                            name="is-public"
                            value={logoColor}
                            onChange={(event, value) => setLogoColor(value)}
                            >
                            <FormControlLabel value="white" control={<Radio />} label="白色" />
                            <FormControlLabel value="black" control={<Radio />} label="黒色" />
                            <FormControlLabel value="blue" control={<Radio />} label="青色" />
                        </RadioGroup>
                        <div style={{backgroundColor: logoColor}} className="w-[120px] h-[40px] mt-2"></div>
                    </div>
                </div>

                <div className="border-[1px] w-1/2 mx-auto my-4" />

                <div className="grid grid-cols-12 gap-4 mt-4">
                    <div className="col-span-3 text-right"><label htmlFor="product-is-public" className='text-md pt-2'>公開</label></div>
                    <div className="col-span-6">
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="is-public"
                            value={isPublic ? "public" : "non-public"}
                            onChange={(event, value) => setIsPublic(value === "public")}
                        >
                            <FormControlLabel value="public" control={<Radio />} label="公開" />
                            <FormControlLabel value="non-public" control={<Radio />} label="非公開" />
                        </RadioGroup>
                    </div>
                </div>

                <div className="border-[1px] w-1/2 mx-auto my-4" />

                <div className="grid grid-cols-12 gap-2 mt-4">
                    <div className="col-span-3 text-right"><label htmlFor="product-price" className='text-md pt-2'>販売価格<span className="text-red-500 px-1">*</span></label></div>
                    <div className="col-span-9 flex items-center">
                        <small>本体価格：</small><input type="number" className='w-[120px] p-1 text-lg border rounded-md' name="product-price" />
                        <small className="pl-2">＋ 消費税額：</small><input type="number" className='w-[120px] p-1 text-lg border rounded-md' name="product-price" />
                        <small className="pl-2">＝ 税込価格：</small><input type="number" className='w-[120px] p-1 text-lg border rounded-md' name="product-price" /><small className="pl-1">円</small>
                    </div>
                </div>

                <div className="border-[1px] w-1/2 mx-auto my-4" />

                <div className="grid grid-cols-12 gap-4 mt-4">
                    <div className="col-span-3 text-right"><label htmlFor="product-description" className='text-md pt-2'>商品説明文</label></div>
                    <div className="col-span-6">
                        <TextEditor isClear={false} onChangeData={(text) => {}} />
                    </div>
                </div>

                <div className="border-[1px] w-1/2 mx-auto my-4" />

                <div className="grid grid-cols-12 gap-4 mt-4">
                    <div className="col-span-3 text-right"><label htmlFor="stock" className='text-md pt-2'>在庫</label></div>
                    <div className="col-span-6">
                        <input type="number" className='p-1 text-lg border rounded-md' name="stock"　value={stock} onChange={(event) => setStock(Number(event.target.value))} />
                    </div>
                </div>

                <div className="border-[1px] w-1/2 mx-auto my-4" />

                <div className='grid grid-cols-12 gap-4 mt-4 mb-8'>
                    <div className="col-span-6"></div>
                    <div className="col-span-3 text-right">
                        <button className='ml-auto block w-[150px] text-center p-2 mt-3 rounded-md bg-slate-300 hover:bg-slate-400 active:bg-slate-500 cursor-pointer'>変更する</button>
                    </div>
                </div>
            </div>
        </div>
    );
}