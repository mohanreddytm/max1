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
import sportsOne from '../../images/sports.jpg'
import gym from '../../images/gym.png'

import {SaleCont, TrendingMainLeftCont,TrendingMainRightContentOne, TrendingMainRightContentTwo,BallOne} from './extreameStyle.js'

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
  const [trendingIphones, setTrendingIphones] = useState([])
  const [suggestionItems, setSuggestionItems] = useState([]);

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
    }

    const getTheTshirts = async () => {
      const url = "https://maxbackendnew.onrender.com/search-ebay-products/iphone16&limit=5&offset=0";
      const response = await fetch(url);
      const data = await response.json();

      setTrendingIphones(data.itemSummaries)
    }

    const getTheSuggestionItems = async() => {
      const url = "https://maxbackendnew.onrender.com/search-ebay-products/air%20conditioner%20split&limit=50&offset=0"
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.itemSummaries)
    const sortedByDiscount = data.itemSummaries
      .filter(item => item.marketingPrice && item.marketingPrice.discountPercentage)
      .sort((a, b) => 
        parseInt(b.marketingPrice.discountPercentage) - parseInt(a.marketingPrice.discountPercentage)
      );
      console.log(sortedByDiscount)
      setSuggestionItems(sortedByDiscount.slice(0,4))
    }

    getTheItems()
    getTheTshirts()
    getTheSuggestionItems()
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
            <div className='home-bottom-main-left-cont'>
              <div className='home-bottom-main-protected-cont'>
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
              </div>
              <div className='home-bottom-main-left-bottom-cont-p'>
                  <div className='home-bottom-left-p-one'>
                    <div className='home-bottom-left-p-one-left'>
                      <h1>Suggested For You</h1>
                      <div className='home-bottom-left-p-one-left-content'>
                        {suggestionItems.length === 0 ? 
                        <div className='loading-home-suggestion-items'>
                          <div>
                            <p></p>
                          </div>
                        </div> :
                        <>
                          <div className='home-bottom-left-p-one-left-content-top'>
                            <img src={suggestionItems[0].image.imageUrl} />
                            <div className='suggestione-items-top-cont-inner'>
                              <h1>{suggestionItems[0].title}</h1>
                              <div className='suggestione-items-top-cont-inner-price-cont'>
                                <h1 className='original-price'>${suggestionItems[0].marketingPrice.originalPrice.value}</h1>
                                <h1 className='price'>${suggestionItems[0].price.value}</h1>
                                <p>( {suggestionItems[0].marketingPrice.discountPercentage}% OFF )</p>
                              </div>
                              <button className='view-details-button-home'>View Details</button>
                            </div>
                          </div>
                          <div className='home-bottom-left-p-one-left-content-bottom'>
                            <div>

                            </div>
                            <div>

                            </div>
                            <div>

                            </div>
                          </div>
                        </>
                        }
                        

                      </div>
                    </div>
                    <div className='home-bottom-left-p-one-ball'>
                      <h1><span>M</span><span>A</span><span>X</span> - Ball</h1>
                      <BallOne image={sportsOne} className='max-ball-main-cont'>  
                        <div>
                          <h1 className='ball-head'>Sports <br/> Equipments</h1>
                          <button className='ball-button'>See what</button>
                        </div>
                        <div>
                          <h1 className='ball-head'>Sports and Gym <br/> Traning</h1>
                          <button className='ball-button'>See what</button>
                        </div>
                        <div>
                          <h1 className='ball-head'>Gym <br/> Equiments</h1>

                          <button className='ball-button'>See what</button>
                        </div>
                      </BallOne>
                    </div>
                  </div>
              </div>
            </div>

            <ul className='home-bottom-right-cont'>
              {trendingIphones.length === 0 ? (
                <p>Loading...</p>
              ) : (
                trendingIphones.map((each, index) => (
                  <li className='home-bottom-right-items' key={index}>
                    <img src={each.image.imageUrl} alt={each.title} />
                    <h1>{each.title}</h1>
                    <div>
                      {each.marketingPrice && (
                        
                        <p className="original-price">
                          ${each.marketingPrice.originalPrice.value}
                        </p>
                        
                      )}
                      <p>${each.price.value}</p>
                      {each.marketingPrice && (
                        
                        <p className="discount-percent-home">
                          ( {each.marketingPrice.discountPercentage}% Off )
                        </p>
                        
                      )}
                    </div>
                    <button>Buy Now</button>
                  </li>
                ))
              )}
            </ul>

          </div>
       </div>

    </div>
  )
}

export default Home
