import React, {useState} from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import {a11yProps, CustomTabPanel} from "../../components/TabPanel";
import EstimatedEarnings from "../../components/EstimatedEarnings";
import TransferHistory from "../../components/TransferHistory";

export default function AgencyManagement() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const earnings = [{id:1, connected:3, monthlyIncreased:5, buyers:23, date:"2022/02/22", totalSales:23563, transferred: 13200, result: "pending" }, {id:1, connected:3, monthlyIncreased:5, buyers:23, date:"2022/02/22", totalSales:23563, transferred: 13200, result: "completed", transferredDate: "2022/02/22" }]
    const transfers = [{id:1, connected:3, monthlyIncreased:5, buyers:23, date:"2022/02/22", totalSales:23563, transferred: 13200, result: "pending"}, {id:1, connected:3, monthlyIncreased:5, buyers:23, date:"2022/02/22", totalSales:23563, transferred: 13200, result: "completed", transferredDate: "2022/02/22" }]

    return (
        <div className='mx-10'>
            <div className='flex flex-col md:flex-row justify-around p-2 mt-5 mb-3 gap-4'>
                <div className='border bg-white shadow-lg rounded-md w-full p-4 sm:p-8 flex-grow'>
                    <h1 className='text-2xl text-blue-500'>推定収益額</h1>
                    <div className="flex items-center justify-around text-green-500 mt-4">
                        <div>
                            <div>本日（現時点）</div>
                            <h4 className='text-2xl text-center my-2 text-blue-500'>¥<span className='text-blue-600'>0</span></h4>
                        </div>
                        <div>
                            <div>昨日</div>
                            <h4 className='text-2xl text-center my-2 text-blue-500'>¥<span className='text-blue-600'>0</span></h4>
                        </div>
                        <div>
                            <div>過去7日間</div>
                            <h4 className='text-2xl text-center my-2 text-blue-500'>¥<span className='text-blue-600'>0</span></h4>
                        </div>
                        <div>
                            <div>過去30日間</div>
                            <h4 className='text-2xl text-center my-2 text-blue-500'>¥<span className='text-blue-600'>0</span></h4>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-blue-500 mt-4">
                        <div className="">
                            <div>先週の同じ曜日との比較</div>
                            <h4 className='text-2xl'>+ ¥<span className=''>12, 500</span></h4>
                        </div>
                        <div className="">
                            <div>先月の同じ日との比較</div>
                            <h4 className='text-2xl text-red-500'>- ¥<span className=''>58,900</span></h4>
                        </div>
                    </div>
                </div>
                <div className='border bg-white shadow-lg rounded-md p-4 sm:p-8 w-[50%]'>
                    <h1 className='text-2xl text-blue-500'>残高</h1>
                    <h4 className='text-2xl text-center my-9 text-blue-500'>¥<span className=''>7,900</span></h4>
                    <p className='text-end mr-10 text-green-500'>前回の支払い：<span className="text-blue-500">¥12,500</span></p>
                </div>
            </div>
            <Box sx={{ width: '100%' }} className="p-2 my-4 relative">
                <div className="absolute left-0 right-0 top-3 flex items-center justify-center text-center gap-8">
                    <div className="border-[3px] border-[#FF0000] px-4 py-2 rounded-xl leading-none">
                        <div>代理店登録日</div>
                        <div>23/12/14</div>
                    </div>
                    <div className="border-[3px] border-[#9747FF] px-4 py-2 rounded-xl leading-none">
                        <div>更新日</div>
                        <div>23/12/14</div>
                    </div>
                </div>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
                        <Tab label="推定収益" {...a11yProps(0)} style={{color:"white", backgroundColor:"#FF8F61", borderTopLeftRadius:"10px", borderTopRightRadius:"10px", padding: "20px 32px", fontSize: "20px" }} />
                        <Tab label="振り込み履歴" {...a11yProps(1)}  style={{color:"white", backgroundColor:"#2AC3FF", borderTopLeftRadius:"10px", borderTopRightRadius:"10px", padding: "20px 32px", fontSize: "20px"}}/>
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <EstimatedEarnings data={earnings} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <TransferHistory data={transfers} />
                </CustomTabPanel>
            </Box>
        </div>
    )
}