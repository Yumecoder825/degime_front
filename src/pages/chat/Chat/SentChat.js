import React from 'react'

export default function SentChat({user, avatar, text}) {
  return (
    <div className="flex justify-end">
      <div className="flex w-11/12 flex-row-reverse">
        <div className='flex-col items-center justify-center flex'>
          <img
            src={avatar}
            alt="avatar"
            className="inline-block h-10 w-10 rounded-full"
          />  
          <div>{user}</div>
        </div>

        <div className="mr-4" />
        <div className="relative max-w-xl rounded-xl rounded-tr-none bg-blue-600 px-4 py-2 self-start">
          <span className="text-sm font-medium text-white">
          {text}
          </span>
        </div>
      </div>
    </div>
  )
}
