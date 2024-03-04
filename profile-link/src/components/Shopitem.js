import React from 'react'
import { Link } from 'react-router-dom'

export default function Shopitem({img, id, name, url, price}) {
  return (
    <div className='w-[90%]'>
      <img alt={id} src={img} className='w-full aspect-auto' />
      <p>{id}</p>
      <Link to={url} className='text-indigo-600 hover:underline hover:text-indigo-700 active:underline active:text-indigo-800'>{name}</Link>
      <p className='text-red-500 text-lg font-bold'>{price}</p>
    </div>
  )
}
