import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import { ToastContainer } from "react-toastify";
// import NavBar from "./components/NavBar.js";
// import Profile from "./pages/Profile.js";
// import Feed from "./pages/Feed.js";
// import NotFound from "./pages/NotFound.js";
import Dashboard from "./pages/Dashboard.js";
import Login from "./pages/Login.js";

// To use styles, import the necessary CSS files
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
// import Useful from "./components/useful.js";
import Register from "./pages/Register.js";
import Online from "./pages/Online.js";
import Social from "./pages/Social.js";
import EditOnline from "./pages/EditOnline.js";
import EditSocial from "./pages/EditSocial.js";
import NocontactList from "./pages/list/NocontactList.js";
import DeletedList from "./pages/list/DeletedList.js";
import BlockList from "./pages/list/BlockList.js";
import Useful from "./components/useful.js";
import Layout from "./pages/Layout.js";
import ContactList from "./pages/Contactlist.js";
import Chatlist from "./pages/chat/Chatlist.js";
import Chatpane from "./pages/chat/Chatpane.js";
import ShopList from "./pages/shop/ShopList.js";
import Shopdetail from "./pages/shop/Shopdetail.js";
import ContractOne from "./pages/shop/ContractOne.js";
import ContractTwo from "./pages/shop/ContractTwo.js";
import ContractThree from "./pages/shop/ContractThree.js";
import ContractFour from "./pages/shop/ContractFour.js";
import Adminlayout from "./pages/admin/Adminlayout.js";
import Userlist from "./pages/admin/Userlist.js";
import Emailmarketing from "./pages/admin/Emailmarketing.js";
import Gennealogylist from "./pages/admin/Genealogylist.js";
import Primaryagency from "./pages/admin/Primaryagency.js";
import Secondaryagency from "./pages/admin/Secondaryagency.js";
import Chartlist from "./pages/admin/Chartlist.js";
import PublicShow from "./components/PublicShow.js";
import Pagenotfound from "./pages/Pagenotfound.js";
import Setting from "./pages/Setting.js";
import ChatAddList from "./pages/chat/ChatAddList.js";

import { profileButton, pendingList, acceptedList } from "./data.js";
/**
 * Define the "App" component as a function.
 */
const App = () => {
  // Required lifecycle method: defines what
  // shows up on screen

  return (

    <div className="App-container">
        {/* <NavBar /> */}    
        <ToastContainer
          position="top-right"
          autoClose={2000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          {/* <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} /> */}
          <Route path='*' element={<Pagenotfound />} />
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" redirect element={<Dashboard contact_badge = {4} chat_badge = {8} />} />
          <Route path="/login" element={<Login/>} />
          {/* <Route path="/useful" element={<Useful/>} /> */}
          <Route path="/register" element={<Register/>} />
          <Route path="/online" element={<Online/>} />
          <Route path="/social" element={<Social/>} />
          <Route path="/editonline" element={<EditOnline profileButton={profileButton}/>} />
          <Route path="/editsocial" element={<EditSocial profileButton={profileButton}/>} />

          <Route path="/useful" element={<Useful/>} />
          <Route path="/layout" element={<Layout contact_badge = {4} chat_badge = {8}/>} >
            <Route path="list" >
              <Route index element={<Navigate to="nocontactlist" />} />
              <Route path="nocontactlist" element={<NocontactList/>} />
              <Route path="deletedlist" element={<DeletedList  />} />
              <Route path="blocklist" element={<BlockList  />} />
            </Route>
          </Route>
          <Route path="contact/*" element={<ContactList />} />
          <Route path="/chat" >
            <Route index element={<Navigate to="list" />} />
            <Route path="list" element={<Chatlist pendingList={pendingList} acceptedList = {acceptedList}  />} />
            <Route path="channel" element={<Chatpane />}/>
            <Route path="add" element={<ChatAddList />} />
          </Route>
          <Route path="/shop" >
            <Route index element={<Navigate to="list" />} />
            <Route path="list" element={<ShopList  />} />
            <Route path="detail" element={<Shopdetail />}/>
            <Route path="contract/1" element={<ContractOne />}/>
            <Route path="contract/2" element={<ContractTwo />}/>
            <Route path="contract/3" element={<ContractThree />}/>
            <Route path="contract/4" element={<ContractFour />}/>
          </Route>
          <Route path="/admin" element={<Adminlayout />}>
            <Route index element={<Navigate to="ユーザーリスト" />} />
            <Route path="ユーザーリスト" element={<Userlist />} />
            <Route path="系譜一覧" element={<Gennealogylist />} />
            <Route path="１次代理店" element={<Primaryagency />} />
            <Route path="２次代理店" element={<Secondaryagency />} />
          </Route>
          <Route path="data" element={<Chartlist />} />
          <Route path="mail" element={<Emailmarketing />} />
          <Route path="public/:url_name" element={<PublicShow />} />
          <Route path="setting" element={<Setting />} />
        </Routes>

    </div>
    
  );
};

export default App;
