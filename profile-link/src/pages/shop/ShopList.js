import React from 'react'
import { Link } from 'react-router-dom'
import {
  TECarousel,
  TECarouselItem
} from "tw-elements-react";

import Table from '../../components/ItemTable';

export default function ShopList() {
  const data = [{id:1, cardname:"NFCカード", image:"/image/nfc-card.png", price:"10,000JPY", stock:10, variant:10},
  {id:2, cardname:"NFCカード", image:"/image/nfc-card.png", price:"10,000JPY", stock:10, variant:10},
  {id:3, cardname:"NFCカード", image:"/image/nfc-card.png", price:"10,000JPY", stock:10, variant:10},
  {id:4, cardname:"NFCカード", image:"/image/nfc-card.png", price:"10,000JPY", stock:10, variant:10},
  {id:5, cardname:"NFCカード", image:"/image/nfc-card.png", price:"10,000JPY", stock:10, variant:10},
  {id:6, cardname:"NFCカード", image:"/image/nfc-card.png", price:"10,000JPY", stock:10, variant:10},
  {id:7, cardname:"NFCカード", image:"/image/nfc-card.png", price:"10,000JPY", stock:10, variant:10},
  {id:8, cardname:"NFCカード", image:"/image/nfc-card.png", price:"10,000JPY", stock:10, variant:10},
  {id:9, cardname:"NFCカード", image:"/image/nfc-card.png", price:"10,000JPY", stock:10, variant:10},
  {id:10, cardname:"NFCカード", image:"/image/nfc-card.png", price:"10,000JPY", stock:10, variant:10},
  {id:11, cardname:"NFCカード", image:"/image/nfc-card.png", price:"10,000JPY", stock:10, variant:10},
  {id:12, cardname:"NFCカード", image:"/image/nfc-card.png", price:"10,000JPY", stock:10, variant:10},
  {id:13, cardname:"NFCカード", image:"/image/nfc-card.png", price:"10,000JPY", stock:10, variant:10}]
  return (
    <div>
      <Link to="/dashboard"><img alt="logo" src="/image/logo.png" width="150" className='pt-3 pl-5' /></Link>
      <div className='mt-2'>
        <TECarousel showControls showIndicators ride="carousel">
          <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
            <TECarouselItem
              itemID={1}
              className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
                className="block w-full"
                alt="..."
              />
            </TECarouselItem>
            <TECarouselItem
              itemID={2}
              className="relative float-left hidden -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
                className="block w-full"
                alt="..."
              />
            </TECarouselItem>
            <TECarouselItem
              itemID={3}
              className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
                className="block w-full"
                alt="..."
              />
            </TECarouselItem>
            <TECarouselItem
              itemID={4}
              className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/new/slides/044.webp"
                className="block w-full"
                alt="..."
              />
            </TECarouselItem>
            <TECarouselItem
              itemID={5}
              className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/new/slides/045.webp"
                className="block w-full"
                alt="..."
              />
            </TECarouselItem>
          </div>
        </TECarousel>
      </div>
      <div>
        <Table data={data} />
      </div>

    </div>
  )
}
