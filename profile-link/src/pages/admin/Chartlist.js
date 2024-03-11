import React, {useState} from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TEChart } from "tw-elements-react";

import {a11yProps, CustomTabPanel} from "../../components/TabPanel";


function ChartLine({data}) {

  return (
    <TEChart
      type="line"
      data={{
        labels: [
          "2023-07-20",
          "2023-07-21",
          "2023-07-22",
          "2023-07-23",
          "2023-07-24",
          "2023-07-25",
          "2023-07-26",
        ],
        datasets: [
          {
            label: "A",
            borderColor:"orange",
            data: data[0],
          },
          {
            label: "B",
            data: data[1],
          },
        ],
      }}
      className="min-w-[600px] min-h-[350px] aspect-[4/3]"
    />
  );
}

export default function Chartlist() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }


  return (
    <div className='mx-10 border shadow-md'>
      <div className='flex flex-col md:flex-row justify-around p-2 mt-5 mb-3'>
        <div className='border bg-white shadow-lg rounded-md w-full py-5'>
          <h1 className='text-2xl ml-20'>月間訪問者数</h1>
          <h4 className='text-xl text-center my-2'><span className='text-2xl text-blue-600'>135</span>人</h4>
          <p className='text-end mr-10'>前日比：＋25</p>
        </div>
        <div className='border bg-white shadow-lg rounded-md w-full py-5'>
          <h1 className='text-2xl ml-20'>平均滞在時間</h1>
          <h4 className='text-xl text-center my-2'><span className='text-2xl text-green-500'>126</span>分/人</h4>
          <p className='text-end mr-10'></p>
        </div>
        <div className='border bg-white shadow-lg rounded-md w-full py-5'>
          <h1 className='text-2xl ml-20'>月間交換者数</h1>
          <h4 className='text-xl text-center my-2'><span className='text-2xl text-orange-400'>456</span>人</h4>
          <p className='text-end mr-10'>前日比：＋3</p>
        </div>
      </div>
      <Box sx={{ width: '100%' }} className="px-10">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
            <Tab label="日別" {...a11yProps(0)} style={{color:"white", backgroundColor:"#f87171", borderTopLeftRadius:"10px", borderTopRightRadius:"10px"}} />
            <Tab label="月別" {...a11yProps(1)}  style={{color:"white", backgroundColor:"#38bdf8", borderTopLeftRadius:"10px", borderTopRightRadius:"10px"}}/>
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className='overflow-auto'>
            <ChartLine data={[[2777, 4093, 10000, 3423, 401, 231, 4908],[31414, 40293, 6000, 34323, 40163, 62311, 45908]]} />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className='overflow-auto'>
            <ChartLine data={[[2112, 2343, 2545, 3423, 2365, 1985, 987],[2777, 4923, 10040, 9043, 4071, 2331, 4408]]} />
          </div>
        </CustomTabPanel>
      </Box>
      <div>
        <div className="flex flex-col overflow-x-auto px-10 mt-10">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">date</th>
                      <th scope="col" className="px-6 py-4">Number of Clicks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">2023-07-20</td>
                      <td className="whitespace-nowrap px-6 py-4">50</td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium ">2023-07-21</td>
                      <td className="whitespace-nowrap px-6 py-4">20</td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium ">2023-07-22</td>
                      <td className="whitespace-nowrap px-6 py-4">90</td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium ">2023-07-23</td>
                      <td className="whitespace-nowrap px-6 py-4">100</td>
                    </tr>
                    <tr className="border-b ">
                      <td className="whitespace-nowrap px-6 py-4 font-medium ">2023-07-24</td>
                      <td className="whitespace-nowrap px-6 py-4">60</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}