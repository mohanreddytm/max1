import React from 'react'
import Header from '../Header'

import homeappliences from '../../images/homeappliences.png'
import mobilesandlaptops from '../../images/mobilesandlaptops.jpg'

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
          </ul>
       </div>
    </div>
  )
}

export default Home
