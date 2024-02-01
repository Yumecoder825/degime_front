import React from 'react'
import Footer from './Chat/Footer'
import Header from './Chat/Header'

export default function Chatpane() {
  return (
    <div className='relative' style={{height:"100vh"}}>
      <div className='Chatheader'>
        <Header />
      </div>
      <div className="Chatbody">
        </div>
      {/* <div className='Chatfooter fixed  bottom-5 left-1/2 -translate-x-1/2'> */}
      <div className='absolute bottom-0 w-full'>
        <Footer />
      </div>
    </div>
  )
}
