import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import axiosConfig from '../axiosConfig'

import ImageCarousel from '../components/general/ImageCarousel'
import Layout from '../components/general/Layout'
import ListProduct from '../components/general/ListProduct'
import ProductCarousel from '../components/general/ProductCarousel'

import content1 from '../public/content1.png'
import content2 from '../public/content2.jpg'
import content3 from '../public/content3.jpg'
import content4 from '../public/content4.jpg'


export default function Home({err, listProduct}) {
  
  return err == 0 ? (
    <Layout>

      <ImageCarousel/>

      <div className='w-full flex flex-row items-center justify-between overflow-x-auto mt-[20px] mb-[30px]'>
          <div className='w-[292.5px] h-[153.73px]'>
            <Image
              src={content1}
              width={292.5}
              height={153.73}
              className='w-full h-full object-cover rounded-[4px]'
            />
          </div>

          <div className='w-[292.5px] h-[153.73px]'>
            <Image
              src={content2}
              width={292.5}
              height={153.73}
              className='w-full h-full object-cover rounded-[4px]'
            />
          </div>

          <div className='w-[292.5px] h-[153.73px]'>
            <Image
              src={content3}
              width={292.5}
              height={153.73}
              className='w-full h-full object-cover rounded-[4px]'
            />
          </div>

          <div className='w-[292.5px] h-[153.73px]'>
            <Image
              src={content4}
              width={292.5}
              height={153.73}
              className='w-full h-full object-cover rounded-[4px]'
            />
          </div>
        </div>

      <ProductCarousel  productData={listProduct}/>
      <ListProduct title='APPLE AUTHORISED RESELLER' kindProduct='Apple' listProduct={listProduct}/>
    </Layout>
  )
  :
  (
    <Layout>
      Error
    </Layout>
  )
}

export async function getStaticProps() {
  try {
    const res = await axiosConfig()({
      method: 'POST',
      url: 'api/v1/product/all'
    })

    console.log(res.data.response)

    const data = [] 
    
    res.data.response.map((item, i) => {
      if(i > 0 && item.name !== res.data.response[i-1].name){
           data.push(item)
      }   
      else if(i == 0){
        data.push(item)
      }
    })

    console.log(data)
    return {
      props: {
        err: 0,
        listProduct: data
      }
    }

  } catch (err) {
    return {
      props: {
        err: 1,
        listProduct: []
      }
    }
  }
}