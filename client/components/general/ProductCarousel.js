
import React, { useEffect } from 'react';
import { useRef, useState } from 'react';

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useSelector } from 'react-redux';
import ItemProductCustom from './ItemProductCustom';

// import phone1 from '../public/phone1.png'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

function ProductCarousel({productData}) {
    const listProduct = productData.slice(0,5)
    const {changeWidth} = useSelector(state => state.app)
    const [amountShow, setAmountShow] = useState(0)

    const amount = 0
    // productData.map((item) => {
    //     if(item.store.includes(product)){ listProduct.push(item)}
    // })
    
    const [click, setClick] = useState(0)
    const slider = useRef(null)

    const setting = {
        infinite: true,
        speed: 500,
        slidesToShow: amountShow,
        slidesToScroll: amountShow,
        arrows: false,
    }

    const handleClickNext = () => {

        if (click + 1 > 3) {
            slider.current.slickGoTo(0)
            setClick(0)
        }
        else {
            slider.current.slickGoTo(click + 1)
            setClick(i => i + 1)
        }
    }

    const handleClickPrev = () => {
        if (click - 1 < 0) {
            slider.current.slickGoTo(3)
            setClick(3)
        }
        else {
            slider.current.slickGoTo(click - 1)
            setClick(i => i - 1)
        }
    }

    const showListProduct = () => {
        return listProduct?.map((item, i) => {
            return <ItemProductCustom 
                product={item}
                // oldPrice='23,990,000'
                // promotion='Nhận gói 6 tháng Apple Music miễn phí'
                // imageOutStading=''
                // isCarousel={true}
            />
        })
    }

    useEffect(() => {
        if(changeWidth >= 1000) setAmountShow(5)
        if(changeWidth >= 900 && changeWidth < 1000) setAmountShow(4)
        if(changeWidth < 900 && changeWidth >= 450) setAmountShow(3)
        if(changeWidth < 450) setAmountShow(2)
    }, [changeWidth])

    return (
        <div className={`bg-white drop-shadow-primary w-full  px-[50px] max-[900px]:px-[10px] py-[10px] rounded-[12px] relative`}>
            <Slider ref={slider} {...setting}>
                {showListProduct()}
            </Slider>

            {changeWidth > 900 && (<div onClick={handleClickPrev} className='absolute left-[10px] top-[50%] w-[46px] h-[46px] rounded-[50%] flex justify-center items-center bg-[#C2C2C273] hover:bg-[#E6E4E473] cursor-pointer'>
                <AiFillCaretLeft color='white' size={20} />
            </div>)}

            {changeWidth > 900 && (<div onClick={handleClickNext} className='absolute right-[10px] top-[50%] w-[46px] h-[46px] rounded-[50%] flex justify-center items-center bg-[#C2C2C273] hover:bg-[#E6E4E473] cursor-pointer'>
                <AiFillCaretRight color='white' size={20} />
            </div>)}
        </div>
    )
}

export default ProductCarousel