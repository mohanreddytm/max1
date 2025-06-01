import React, { useEffect, useRef, useState } from 'react';
import Header from '../Header'

import homeappliences from '../../images/homeappliences1.png'
import mobilesandlaptops from '../../images/mobilesandlaptops.jpg'
import kichenone from '../../images/kichen2.png'
import electronic from '../../images/electronic.jpg'
import fashion from '../../images/fashion.jpg'
import sports from '../../images/sports2.png'
import food from '../../images/food.png'
import maxsale from '../../images/maxsale.png'
import saleimage from '../../images/1.png'
import trendingTshirtsImage from '../../images/trendingTshirts.jpg'
import trendingKichen from '../../images/trendingKichen.jpg'
import trendingMobiles from '../../images/trendingMobiles.jpg'

import {SaleCont, TrendingMainLeftCont,TrendingMainRightContentOne, TrendingMainRightContentTwo} from './extreameStyle.js'

import { FaChevronRight, FaChevronLeft  } from "react-icons/fa";



import './index.css'

const majorCategories = [{
  id:1,
  name:"Home Appliencess",
  image:homeappliences,
},
{
  id:2,
  name:"Mobiles And Laptops",
  image:mobilesandlaptops,
},
{
  id:3,
  name:"Kichen Appliences",
  image:kichenone,
},
{
  id:4,
  name:"Electronics",
  image:electronic,
},
{
  id:5,
  name:"Fashion And Clothing",
  image:fashion
},
{
  id:6,
  name:"Sports and Gym",
  image:sports,
},{
  id:7,
  name:"Food and Snacks",
  image:food,
},{
  id:8,
  name:"Home Appliencess",
  image:homeappliences,
},
{
  id:9,
  name:"Mobiles And Laptops",
  image:mobilesandlaptops,
},
{
  id:10,
  name:"Kichen Appliences",
  image:kichenone,
},
{
  id:11,
  name:"Electronics",
  image:electronic,
}

]

const Home = () => {
  const scrollRef = useRef(null);

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [trendingTshirts, setTrendingTshirts] = useState([])

  const eachTrendingOnetrue = (each) => {
    return(
      <li>
        <img src={each.thumbnailImages[0].imageUrl} alt="trending item" />
        <h1>${each.price.value}</h1>
      </li>
    )
  }

  




  useEffect(() => {
    const getTheItems = async () => {
      const url = "https://maxbackendnew.onrender.com/search-ebay-products/gun&limit=50&offset=0";
            const response = await fetch(url);
      const data = await response.json();

      const filteredOne = data.itemSummaries.filter(each => each.priorityListing === true && each.topRatedBuyingExperience === true )
      setTrendingProducts(filteredOne);
      console.log(data)
    }

    const getTheTshirts = async () => {
      const url = "https://maxbackendnew.onrender.com/search-ebay-products/iphone16&limit=2&offset=0";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.itemSummaries)
      setTrendingTshirts(data.itemSummaries)
    }

    getTheItems()
    getTheTshirts()
  }, [])

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'right' ? 400 : -400,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className='home-initial-cont'>
      <Header />
      <div className='home-main-cont'>
          <div className='home-category-section-main-one'>
            <FaChevronLeft onClick={() => scroll('left')} className='left-arrow-topics' />
            <ul ref={scrollRef}  className='home-category-section'>
            
            {
              majorCategories.map(each => <li className='every-category-list-element' key={each.id}>
                <img src={each.image} alt={each.name} />
                <h1>{each.name}</h1>
              </li> )
            }
            
          </ul>
          <FaChevronRight onClick={() => scroll('right')} className='right-arrow-topics' />
          </div>
          
          <div className='home-bottom-main-cont'>
            <SaleCont image={maxsale} className='home-bottom-left-cont'>
              <div className='home-left-max-sale-cont'>              
                <svg className='triagle-cont' viewBox="0 0 200 200" width="100" height="100">
                  <polygon points="100,10 40,130 162,130" fill="#F90003" stroke="none" strokeWidth="2" />
                  <polygon points="40,130 100,130 100,190 10,190" fill="#03ECCF" stroke="none" strokeWidth="2" />
                  <polygon points="100,130 162,130 190,190 100,190" fill="#0379C4" stroke="none" strokeWidth="2" />
                  <polygon points="100,10 10,190 190,190" fill="none" stroke="none" strokeWidth="2" />
                  <text x="100" y="100" fontSize="30" textAnchor="middle" fill="white">M</text>
                  <text x="60" y="170" fontSize="30" textAnchor="middle" fill="white">A</text>
                  <text x="140" y="170" fontSize="30" textAnchor="middle" fill="white">X</text>
                </svg>
                <h1>Sale <br/> Today</h1>

              </div>
              <h1 className='sale-name-max-sale'>Black Friday - <span>Min 40% Off</span></h1>
              <div className='small-content-max-sale'>
                <img src={saleimage} alt="sale image" className='sale-image-max-sale' />
              </div>
              <div className='button-content-max-sale'>
                  <button className='button-max-sale'>Explore Sale</button> 
              </div>
              
            </SaleCont>
            <div className='home-bottom-middle-cont'>
              <div className='home-bottom-middle-items'>
                <h1 className='trending-items'>Trending ...</h1>
                <div className='trending-main-cont'>
                  <TrendingMainLeftCont image={trendingTshirtsImage} className='trending-main-left-cont'>
                    <div>
                    <h1>Trending T-Shirts</h1>
                    <button className='explore-now-button'>Explore Now</button>
                    </div>

                  </TrendingMainLeftCont>
                  <div className='trending-main-right-cont'>
                    <TrendingMainRightContentOne image={trendingKichen} className='trending-main-right-content'>
                      
                    <div>
                    <h1>Most Selling Kichen <br/> Appliences</h1>
                    <button className='explore-now-button-kichen'>Explore Now</button>
                    </div>
                    </TrendingMainRightContentOne>
                    <TrendingMainRightContentTwo image={trendingMobiles} className='trending-main-right-content'>
            
                      <div>
                    <h1>Most Selling Mobiles</h1>
                    <button className='explore-now-button-kichen'>Explore Now</button>
                    </div>
                    </TrendingMainRightContentTwo>
                  </div>
                </div>
              </div>
              <div className='home-bottom-middle-items'>
                <p className='trending-items'>You Might Also Love ...</p>
                  {trendingProducts.length === 0 ? <div className='loading-home'>
                    <div>
                      <p></p>
                    </div>
                    </div> : <ul className='trending-items-list'>
                  {
                    trendingProducts.slice(0,4).map(each => eachTrendingOnetrue(each))
                  }
                </ul> }
              </div>
              
            </div>
            <div className='home-bottom-right-cont'>
              <div className='home-bottom-right-items'>
                {trendingTshirts.length === 0 ? <p>Loading...</p> : 
                (
                  <>
                    <img src={trendingTshirts[0].image.imageUrl} />
                    <h1>{trendingTshirts[0].title}</h1>
                    <p>${trendingTshirts[0].price.value}</p>
                    <button>Buy Now</button>
                  </>
                )
                }

              </div>
              <div className='home-bottom-right-items'>

              </div>
            </div>
          </div>
       </div>

    </div>
  )
}

export default Home
