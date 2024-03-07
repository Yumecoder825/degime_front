import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import SearchChat from '../../components/SearchChat';
import Chatitem from '../../components/Chatitem';
import {toast} from 'react-toastify';
import {Apis} from "../../api";

export default function Chatlist() {

    const navigate = useNavigate();

    // Array to hold navigation tab data
    const navTab = [{title: "申請者", id: 0}, {title: "承認者", id: 1}];

    // State variables
    const [isActive, setIsActive] = useState(0);
    const [isDeleteState, setIsDeleteState] = useState(false);
    const [selectedList, setSelectedList] = useState([]);
    const [contactList, setContactList] = useState([]);
    const [chatGroup, setChatGroup] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [isCreate, setIsCreate] = useState(false);

    // begin Chat
    const startChat = async (index) => {
        // console.log(index);
        await localStorage.setItem('chatroom', chatGroup[index].room_name);
        navigate('/chat/channel');
    }

    // Function to enable delete state
    const handleDeleteState = (isPressed) => {
        isPressed && setIsDeleteState(true);
    };

    // Function to handle deletion
    const handleDelete = async () => {

        for (const index in selectedList) {
            let response = await Apis.myDelete(`social/private/chatroom?room_name=${chatGroup[index].room_name}`);
            console.log(response);
        }
        let appliedData = await Apis.myGet('social/private/chatroom');
        if (appliedData) {
            for (const id in appliedData) {
                const newMember = appliedData[id].member.filter((item) => item.username !== localStorage.getItem('username'));
                appliedData[id] = {...appliedData[id], member: newMember};
            }
            setChatGroup(appliedData);
            console.log(appliedData);
        }
        setIsDeleteState(false);
        setIsModalOpen(false);
    };

    // Function to handle creation Group
    const handleCreate = async () => {
        let memberList = [];
        for (const index in selectedList) {
            const names = chatGroup[index].member.map(item => item.username);
            memberList = memberList.concat(names);
        }
        memberList = memberList.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        console.log({chat_group: groupName, member: memberList});
        if (memberList.length < 2) toast.error("Members must be large than 2");
        else {
            let res = await Apis.myPut('social/private/chatroom?new_room=True', {
                chat_group: groupName,
                member: memberList
            });
            console.log("Res: ", res);

            let appliedData = await Apis.myGet('social/private/chatroom');
            if (appliedData) {
                for (const id in appliedData) {
                    const newMember = appliedData[id].member.filter((item) => item.username !== localStorage.getItem('username'));
                    appliedData[id] = {...appliedData[id], member: newMember};
                }
                setChatGroup(appliedData);
                console.log(appliedData);
            }
            setIsNewGroupModalOpen(false);
            setIsCreate(false);
            setIsDeleteState(false);
            setSelectedList([]);
        }

    }

    // Function to handle new group creation
    const handleNewGroup = () => {
        setIsNewGroupModalOpen(true);
        console.log("Creating a new group...");
    };

    // Function to handle selection of an item
    const handleSelect = (id) => {
        if (!selectedList.includes(id)) {
            const list = [...selectedList];
            list.push(id);
            setSelectedList(list);
            console.log(list);
        } else {
            const list = selectedList.filter((index) => index !== id);
            setSelectedList(list);
            console.log(list);
        }
    };

    // get Data
    useEffect(() => {
        async function dispatch() {
            if (isActive) {
                let appliedData = await Apis.myGet('social/private/chatroom');
                if (appliedData) {
                    for (const id in appliedData) {
                        const newMember = appliedData[id].member.filter((item) => item.username !== localStorage.getItem('username'));
                        appliedData[id] = {...appliedData[id], member: newMember};
                    }
                    setChatGroup(appliedData);
                    console.log(appliedData);
                }
            } else {
                let incomeData = await Apis.myGet('social/private/contactdata?is_incoming=True');
                console.log(incomeData);
                if (incomeData) incomeData = incomeData.filter((item) => item.is_chat_available !== 'True')
                incomeData ? setContactList(incomeData) : setContactList([]);
            }
        }

        dispatch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive])
    return (
        <div>
            <div className='header pt-8 px-10'>
                <div className='flex items-center mb-[70px]'>
                    <Link to="/dashboard"><img src="/image/turn-left.png" alt="return"
                                               className="absolute top-3 w-[40px] h-[60px] cursor-pointer py-2"></img></Link>
                    <h1 className='mx-auto text-2xl font-bold'>チャットページ</h1>
                </div>
                <SearchChat/>
            </div>
            <div className="w-[80%] mx-auto relative">
                {
                    isDeleteState &&
                    <div
                        className='absolute right-5 top-24 trash rounded-md cursor-pointer hover:opacity-60 active:opacity-90'
                        onClick={() => {
                            setIsModalOpen(true)
                        }}>
                        <img width="24" height="24" alt="trash" src="/image/codicon_trash.png"/>
                    </div>
                }
                {
                    (isDeleteState || isCreate) &&
                    <div
                        className='absolute -right-5 top-24 close rounded-md cursor-pointer hover:opacity-60 active:opacity-90'
                        onClick={() => {
                            setIsCreate(false);
                            setIsDeleteState(false)
                        }}>
                        <img width="24" height="24" alt="close" src="/image/close.png"/>
                    </div>
                }
                <div className='flex gap-x-2'>
                    {
                        isCreate && (
                            selectedList.map((item, index) => (
                                <img key={index} alt="selected user"
                                     src={chatGroup[item].member.length > 1 ? '/image/focus-group.png' : chatGroup[item].member[0].avatar || '/image/user_default.png'}
                                     width={50} height={50} className='rounded-full'/>
                            ))
                        )
                    }
                </div>

                <ul className="w-full flex justify-around overflow-x mb-5">
                    {
                        navTab.map((item, index) => (
                            <li
                                key={index}
                                className={`text-xl mt-[50px] text-center h-30 cursor-pointer ${
                                    isActive === index ? "text-purple-500 border-b-2 border-purple-500" : "text-slate-600"
                                }`}
                                onClick={() => {
                                    setIsActive(index);
                                }}
                            >
                                {item.title}
                            </li>
                        ))
                    }
                </ul>

                <ul className="p-6">
                    {!isActive ? contactList.length > 0 &&
                        contactList.map((person, index) => (
                            <Chatitem
                                key={index}
                                url={person.member_avatar}
                                username={person.member}
                                content=""
                                is_online={person.is_online}
                                date={person.date}
                                id={index}
                                tab={isActive}
                                isLongPressedState={handleDeleteState}
                                isTrashShow={isDeleteState}
                                isSelectedState={handleSelect}
                                isCreateShow={isCreate}
                            />
                        )) :
                        chatGroup.map((person, index) => (
                            <Chatitem
                                key={index}
                                url={person.member.length > 1 ? '/image/focus-group.png' : person.member[0].avatar}
                                username={person.chat_group}
                                content=""
                                is_online={person.is_online}
                                date={person.date}
                                id={index}
                                tab={isActive}
                                isLongPressedState={handleDeleteState}
                                isTrashShow={isDeleteState}
                                isSelectedState={handleSelect}
                                isCreateShow={isCreate}
                                onClick={(e) => startChat(e)}
                            />
                        ))
                    }
                </ul>
            </div>
            {
                isActive === 1 && (
                    <div
                        className='fixed bottom-10 left-[65%] bg-orange-400 p-4 rounded-full cursor-pointer hover:bg-orange-500 active:bg-orange-600'
                        onClick={handleNewGroup}>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="17.5" x2="35" y2="17.5" stroke="white" strokeWidth="2"/>
                            <line x1="17.5" x2="17.5" y2="35" stroke="white" strokeWidth="2"/>
                        </svg>
                    </div>
                )
            }

            {isModalOpen && (
                <>
                    <div
                        className='fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  max-[530px]:w-[300px] w-[500px] h-[250px] p-6 bg-white rounded-lg'
                        style={{border: "solid 3px black"}}>
                        <h2 className='text-zinc-600 text-center font-bold text-[24px] mt-2'>本当に削除しますか？<br/>チャット内容はすべて消去されます
                        </h2>
                        <div className='flex justify-between max-[530px]:mt-[20px] mt-[70px] font-light px-6'>
                            <button className="text-zinc-600 font-bold border py-1 px-6 rounded-xl"
                                    onClick={handleDelete}>はい
                            </button>
                            <button
                                className="text-white font-bold border py-1 px-6 rounded-xl bg-orange-400 hover:bg-orange-500"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setIsDeleteState(false);
                                    setSelectedList([])
                                }}>いいえ
                            </button>
                        </div>
                    </div>
                    <div className='fixed w-full h-full right-0 top-0 bg-black opacity-10 z-30'></div>
                </>)
            }
            {isNewGroupModalOpen && (
                <>
                    <div
                        className='fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  max-[530px]:w-[300px] w-[500px] h-[250px] p-6 bg-white rounded-lg'
                        style={{border: "solid 3px black"}}>
                        <input
                            type="text"
                            placeholder="グループ名を入力"
                            className='border rounded-md mt-5 text-lg px-2 py-3 mb-3 block w-full'
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                        <div className='flex justify-between max-[530px]:mt-[20px] mt-[70px] font-light px-6'>
                            <button className="text-zinc-600 font-bold border py-1 px-6 rounded-xl" onClick={() => {
                                setIsCreate(true);
                                setIsNewGroupModalOpen(false)
                            }}>はい
                            </button>
                            <button
                                className="text-white font-bold border py-1 px-6 rounded-xl bg-orange-400 hover:bg-orange-500"
                                onClick={() => {
                                    setIsNewGroupModalOpen(false);
                                    setGroupName("")
                                }}>いいえ
                            </button>
                        </div>
                    </div>
                    <div className='fixed w-full h-full right-0 top-0 bg-black opacity-10 z-30'></div>
                </>)
            }
            {
                isCreate && (
                    <div
                        className='fixed right-1/2 bottom-10 translate-x-1/2 px-7 py-3 bg-red-400 button inline-block z-4 hover:bg-red-500 active:bg-red-600 text-white'
                        onClick={handleCreate}>完成</div>
                )
            }
        </div>
    )
}
