import React from 'react'
import Header from '../Header'

import homeappliences from '../../images/homeappliences1.png'
import mobilesandlaptops from '../../images/mobilesandlaptops.jpg'
import kichenone from '../../images/kichen2.png'
import electronic from '../../images/electronic.jpg'
import fashion from '../../images/fashion.jpg'
import sports from '../../images/sports2.png'
import food from '../../images/food.png'

import { FaChevronRight } from "react-icons/fa";



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
}

]

const Home = () => {
  return (
    <div className='home-initial-cont'>
      <Header />
      <div className='home-main-cont'>
          <ul className='home-category-section'>
            {
              majorCategories.map(each => <li className='every-category-list-element' key={each.id}>
                <img src={each.image} alt={each.name} />
                <h1>{each.name}</h1>
              </li> )
            }
            <FaChevronRight className='right-arrow-topics' />
          </ul>
          <div>
            <div></div>
          </div>
       </div>

    </div>
  )
}

export default Home
