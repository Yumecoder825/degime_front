import React, { useEffect, useState } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter
} from "tw-elements-react";

export default function Modal({onChangeName, isShow, isModify}) {
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [alternate, setAlternate] = useState("create");
  useEffect(() => {
    
    isShow && setShowModal(true);
    if (isShow) {isModify !== "" ? setAlternate(isModify) : setAlternate("create"); isModify !== "" && setFolderName(isModify);}
  }, [isShow, isModify]);
  const handleClick = () => {
    if (folderName){
      alternate === "create" ? onChangeName({content:folderName, type:"create"}) : onChangeName({content:folderName, type:"modify"}) 
      alternate === "create" && setFolderName("");
      setShowModal(false);
    } 
  }
  const handleDelete = () => {
    onChangeName({content:"", type:"delete"});
    setShowModal(false);
  }
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <TERipple rippleColor="white">
        <button
          type="button"
          className="fixed bottom-10 left-1/2 -translate-x-1/2 inline-block rounded-lg bg-success px-6 p-3 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
          onClick={() => {setShowModal(true); setAlternate("create")}}
        >
          マイフォルダ作成・編集
        </button>
      </TERipple>

      {/* <!-- Modal --> */}
      {/* <div class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"> */}
        <TEModal show={showModal} setShow={setShowModal} staticBackdrop>
          <TEModalDialog style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}>
            <TEModalContent>
              <TEModalHeader>
                {/* <!--Modal title--> */}
                <h5 className="ml-3 text-xl font-bold leading-normal text-neutral-800 dark:text-neutral-200">
                {alternate === "create" ? "フォルダーを作成する" : "フォルダー名を変更・削除する"}
                </h5>
                {/* <!--Close button--> */}
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </TEModalHeader>
              {/* <!--Modal body--> */}
              <TEModalBody>
                <div className="flex flex-col items-center">
                  <div>
                    <input className="rounded-md py-2 px-5 border" value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="フォルダー名を入力" />
                    <button
                      type="button"
                      className="ml-3 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      onClick={handleClick}
                      aria-label="Close"
                    >
                      {alternate === "create" ? "登録" : "編集"}
                    </button>
                  </div>
                  <p className="px-10 text-center mt-4">削除するとフォルダー内のデータがすべて消去されますがよろしいですか？</p>
                </div>
              </TEModalBody>
              <TEModalFooter>
              {alternate !== "create" && (
                <div className="w-full flex justify-around">
                  <button
                    type="button"
                    className="inline-block rounded bg-primary-accent-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  >
                    いいえ
                  </button>
                  <TERipple>
                    <button
                      type="button"
                      className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                      onClick={handleDelete}
                      aria-label="Close"
                    >
                      削除する
                    </button>
                  </TERipple>
                </div>
              )
              }
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      {/* </div> */}
    </div>
  );
}