import React from 'react'
import {Outlet} from 'react-router';
import {useLocation, useNavigate} from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import {useAuthContext} from "../auth/context";
import {CircularProgress} from "@mui/material";

export default function DashboardLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const {user, loading} = useAuthContext();

    if(loading) {
        return ( <CircularProgress
            variant="determinate"
            sx={{
                color: (theme) =>
                    theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
            }}
            size={40}
            thickness={4}
            value={100}
        />)
    } else if (!user && location.pathname !== "/dashboard") {
        navigate("/dashboard");
    }

    return (
        <div className="Dashboard min-h-[100vh]">
            <Sidebar/>
            <div className="">
                <Outlet/>
            </div>
        </div>
    )
}
