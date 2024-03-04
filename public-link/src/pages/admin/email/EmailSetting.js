import * as React from 'react';
import {Box, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import AutoEmailList from "./AutoEmailList";
import AskList from "./AskList";
import {useState} from "react";
import OtherEmailList from "./OtherEmailList";

export default function EmailSetting() {
    const [tab, setTab] = useState("1");

    return (
        <div className='px-10 mb-3'>
            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={(e, value) => setTab(value)}>
                        <Tab label="自動メール設定" value="1" className="w-1/2"/>
                        <Tab label="その他メール設定" value="2" className="w-1/2"/>
                        <Tab label="問い合わせ" value="3" className="w-1/2"/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <AutoEmailList/>
                </TabPanel>
                <TabPanel value="2">
                    <OtherEmailList/>
                </TabPanel>
                <TabPanel value="3">
                    <AskList/>
                </TabPanel>
            </TabContext>
        </div>

    );
}