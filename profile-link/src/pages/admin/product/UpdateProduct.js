import * as React from 'react';
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {useEffect, useState} from "react";
import TextEditor from "../../../components/Textedit";
import {Close} from "@mui/icons-material";
import {Apis} from "../../../api";
import {toast} from "react-toastify";
import {useNavigate, useSearchParams} from "react-router-dom";
import {FileUpload} from "../../../utilities/upload";

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
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [logoColor, setLogoColor] = useState("white");
    const [isPublic, setIsPublic] = useState(true);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const [backImageUrls, setBackImageUrls] = useState([]);
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(0);
    const [priceWithoutFee, setPriceWithoutFee] = useState(0);
    const [fee, setFee] = useState(0);

    useEffect(() => {
        // TODO load product from product id
        const product_id = params.get('id');
        if (product_id) {
            loadProduct(product_id).then();
        } else {
            toast.error("Invalid product url");
            navigate("/admin/products");
        }
    }, []);

    const loadProduct = async (id) => {
        setLoading(true);
        const res = await Apis.myGet(`shop/product?id=${id}`);
        if (res && res.success) {
            const product = res.data;
            setLogoColor(product.logo_color);
            setIsPublic(product.is_public);
            setCode(product.code);
            setName(product.title);
            setImageUrls(product.image_urls);
            setBackImageUrls(product.back_image_urls);
            setDescription(product.description)
            setStock(product.stock);
            setPriceWithoutFee(product.price_without_fee);
            setFee(product.price - product.price_without_fee);
        } else {
            toast.error("Invalid product");
            navigate("/admin/products");
        }
        setLoading(false)
    }

    const handleUpdateProduct = async () => {
        if(!name) {
            return toast.error(`Please fill product name!`);
        }

        if(!code) {
            return toast.error(`Please fill product code!`);
        }

        if(!imageUrls.length) {
            return toast.error(`Please fill product images!`);
        }

        if(!priceWithoutFee) {
            return toast.error(`Please fill product price!`);
        }

        const payload = {
            id: Number(params.get('id')),
            code,
            title: name,
            image_urls: imageUrls,
            back_image_urls: backImageUrls,
            price_without_fee: priceWithoutFee,
            price: priceWithoutFee + fee,
            stock,
            description,
            is_public: isPublic,
            logo_color: logoColor,
        }

        const res = await Apis.myPut("shop/product", payload);
        if (res && res.success) {
            toast.success(`Product is successfully updated!`);
            navigate('/admin/products');
            return;
        }
        if (res && res.data.error) {
            toast.error(res.data.error);
        } else {
            toast.error(`Failed! Please try again!`);
        }
    }


    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const upload_url = await FileUpload(file);
            setImageUrls([...imageUrls, upload_url]);
        }
    };

    const handleBackImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const upload_url = await FileUpload(file);
            setBackImageUrls([...backImageUrls, upload_url]);
        }
    };

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
                        <input type="file" accept="image/jpeg,image/png" className='w-full p-1 text-lg border rounded-md' name="product-image" onChange={handleImageUpload} />
                        {
                            imageUrls.map((img, index) => <div key={index} className="relative w-[px] mt-2">
                                <img src={img} alt=""/>
                                <Close className="absolute -right-8 top-0 cursor-pointer" onClick={() => setImageUrls(imageUrls.slice(0, index).concat(imageUrls.slice(index + 1)))}/>
                            </div>)
                        }
                    </div>
                </div>

                <div className="border-[1px] w-1/2 mx-auto my-4" />

                <div className="grid grid-cols-12 gap-4 mt-4">
                    <div className="col-span-3 text-right"><label htmlFor="product-image-back" className='text-md pt-2'>オリジナル画像(裏)</label></div>
                    <div className="col-span-6">
                        <input type="file" accept="image/jpeg,image/png" className='w-full p-1 text-lg border rounded-md' name="product-image-back" onChange={handleBackImageUpload} />
                        {
                            backImageUrls.map((img, index) => <div key={index} className="relative w-[px] mt-2">
                                <img src={img} alt=""/>
                                <Close className="absolute -right-8 top-0 cursor-pointer" onClick={() => setBackImageUrls(backImageUrls.slice(0, index).concat(backImageUrls.slice(index + 1)))}/>
                            </div>)
                        }
                    </div>
                </div>

                <div className="border-[1px] w-1/2 mx-auto my-4" />

                <div className="grid grid-cols-12 gap-4 mt-4">
                    <div className="col-span-3 text-right"><label htmlFor="product-logo-color" className='text-md pt-2'>ロゴマークの色</label></div>
                    <div className="col-span-6">
                        <div className="flex justify-start">
                            <div className="flex flex-col justify-center text-center" onClick={() => setLogoColor("white")}>
                                <img src="/image/logo1-white.png" style={{ height: "160px" }} alt=""/>
                                <span>白</span>
                                <label><Radio name="is-public" value="white" checked={logoColor === "white"} /></label>
                            </div>
                            <div className="flex flex-col justify-center text-center" onClick={() => setLogoColor("black")}>
                                <img src="/image/logo1-black.png" style={{ height: "160px" }} alt=""/>
                                <span>黒</span>
                                <label><Radio name="is-public" value="black" checked={logoColor === "black"} /></label>
                            </div>
                            <div className="flex flex-col justify-center text-center" onClick={() => setLogoColor("blue")}>
                                <img src="/image/logo1-blue.png" style={{ height: "160px" }} alt=""/>
                                <span>青</span>
                                <label><Radio name="is-public" value="blue" checked={logoColor === "blue"} /></label>
                            </div>
                        </div>
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
                        <small>本体価格：</small><input type="number" className='w-[120px] p-1 text-lg border rounded-md' name="product-price" value={priceWithoutFee} onChange={(e) => setPriceWithoutFee(Number(e.target.value))}  />
                        <small className="pl-2">＋ 消費税額：</small><input type="number" className='w-[120px] p-1 text-lg border rounded-md' name="product-price" value={fee} onChange={(e) => setFee(Number(e.target.value))} />
                        <small className="pl-2">＝ 税込価格：</small><input type="number" className='w-[120px] p-1 text-lg border rounded-md' name="product-price" value={priceWithoutFee + fee} /><small className="pl-1">円</small>
                    </div>
                </div>

                <div className="border-[1px] w-1/2 mx-auto my-4" />

                <div className="grid grid-cols-12 gap-4 mt-4">
                    <div className="col-span-3 text-right"><label htmlFor="product-description" className='text-md pt-2'>商品説明文</label></div>
                    <div className="col-span-6">
                        <TextEditor isClear={false} content={description} onChangeData={(text) => setDescription(text.data)} />
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
                        <button className='ml-auto block w-[150px] text-center p-2 mt-3 rounded-md bg-slate-300 hover:bg-slate-400 active:bg-slate-500 cursor-pointer' onClick={handleUpdateProduct}>変更する</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
