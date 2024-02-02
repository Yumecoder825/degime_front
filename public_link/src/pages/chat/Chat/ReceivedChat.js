import React from 'react'

export default function ReceivedChat({user, avatar, text}) {
  return (
    <div className="flex justify-start">
      <div className="flex w-11/12">
        <div className='flex-col items-center justify-center flex'>
          {
            console.log(avatar)
          }
          <img
            src={avatar}
            alt="avatar"
            className="inline-block h-10 w-10 rounded-full"
          />  
          <div>{user}</div>
        </div>
        <div className="mr-4" />
        <div className="relative max-w-xl rounded-xl rounded-tl-none bg-neutral-300  px-4 py-2 self-start">
          <span className="text-sm font-medium text-heading">
            {text}
          </span>
        </div>
      </div>
    </div>
  )
}
