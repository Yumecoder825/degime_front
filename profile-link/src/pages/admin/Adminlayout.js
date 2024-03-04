import React, {useEffect, useState} from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import SearchBar from '../../components/SearchBar';
import {Collapse, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {
  AddBusiness, CardGiftcard,
  DescriptionOutlined, Email,
  ExpandLess,
  ExpandMore,
  Group, ListAlt,
  Store,
  TrendingUpOutlined
} from "@mui/icons-material";

const menus = [
  { icon: <Group/>, path: "/admin/users", label: "ユーザーリスト"},
  { icon: <DescriptionOutlined/>, path: "/admin/genealogies", label: "系譜一覧"},
  { icon: <Store />, path: "/admin/primaryagency", label: "１次代理店"},
  { icon: <AddBusiness/>, path: "/admin/secondaryagency", label: "２次代理店"},
  { icon: <CardGiftcard/>, label: "商品管理",
    subItems: [
      {path: "/admin/products", label: "商品一覧"},
      {path: "/admin/products/new", label: "商品登録"},
      {path: "/admin/products/update", label: "商品変更", hidden: true}
    ]
  },
  { icon: <ListAlt/>, label: "注文管理",
    subItems: [
      {path: "/admin/orders/shipping", label: "発送待ち一覧"},
      {path: "/admin/orders/shipped", label: "発送済み一覧"},
      {path: "/admin/orders/canceled", label: "キャンセル一覧"},
    ]
  },
  { icon: <TrendingUpOutlined/>, path: "/admin/sales", label: "売上一覧"},
  { icon: <Email/>, path: "/admin/emails", label: "メール設定"}
]

export default function Adminlayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState(null);
  const tabList = menus;

  useEffect(() => {
    for (const tab of tabList) {
      if (tab.path === location.pathname) {
        setTab(tab);
        return;
      }
      if (tab.subItems) {
        for (const child of tab.subItems) {
          if (child.path === location.pathname) {
            setTab(child);
            return;
          }
        }
      }
    }

    if (tab === null) {
      navigate("/admin/users");
    }
  }, [location]);

  const SingleLevel = ({ item, curPath }) => {
    return (
        <li onClick={() => navigate(item.path)} className={`px-8 py-2 mt-5 justify-start flex cursor-pointer hover:underline ${!!curPath && curPath === item.path && 'bg-gray-100 text-neutral-500 border-l-8 border-l-orange-600'}`}>
          {item.icon}
          <span className="pl-4">{item.label}</span>
        </li>
    );
  };

  const MultiLevel = ({ item, curPath }) => {
    const { subItems } = item;
    const shouldOpen = subItems.find(s => s.path === curPath);
    const [open, setOpen] = useState(!!shouldOpen);

    const handleClick = () => {
      setOpen((prev) => !prev);
    };

    return (
        <React.Fragment>
          <li className={`px-8 py-2 mt-5 justify-between flex cursor-pointer hover:underline ${!!curPath && curPath === item.path && 'bg-gray-100 text-neutral-500 border-l-8 border-l-orange-600'}`} onClick={handleClick}>
            <div className="flex items-center">{item.icon}<span className="pl-4">{item.label}</span></div>
            {open ? <ExpandLess /> : <ExpandMore />}
          </li>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {subItems.filter(i => !i.hidden).map((child, key) => (
                  <li onClick={() => navigate(child.path)} key={key} className={`px-14 py-2 mt-5 justify-start flex cursor-pointer hover:underline ${!!curPath && curPath === child.path && 'bg-gray-100 text-neutral-500 border-l-8 border-l-orange-600'}`}>
                    <span className="pl-4">{child.label}</span>
                  </li>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
    );
  };

  const MenuItem = ({ item, curPath }) => {
    const Component = item.subItems ? MultiLevel : SingleLevel;
    return <Component item={item} curPath={curPath} />;
  };

  return (
    <div className='absolute left-0 w-full min-h-[100vh] bg-gray-100'>
      <div className="sidebar fixed flex flex-col top-0 left-0 max-md:w-14 max-md:text-xs hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow" style={{backgroundImage:"linear-gradient(#ECBA6D, #CF7E8C, #B67995)"}}>
          <Link to="/dashboard"><img alt="logo" src="/image/logo1.png"  /></Link>
          <ul className='text-white text-center h-full max-md:mt-24'>
            {
              tabList.map((item, index)=><MenuItem key={index} item={item} curPath={location.pathname}/>)
            }
          </ul>
          <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2024</p>
        </div>
      </div>
      <div className='max-md:ml-8 md:ml-64 overflow-auto'>
        <div className='h-[80px] w-full max-md:mb-16 flex justify-center items-center' style={{backgroundImage:"linear-gradient(to right, #ECBA6D, #CF7E8C, #B67995)"}}>
          <SearchBar />
        </div>
        <div className='px-10 py-5 hidden md:flex'>トップ画面 ＞
          { tab && <div onClick={()=>navigate(tab.path)} className="cursor-pointer hover:opacity-70 hover:underline text-blue-600">{tab.label}</div>}
        </div>
        <Outlet />
      </div>
    </div>
  )
}
