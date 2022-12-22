import React from 'react'
import Homepage from './Homepage'
import ProductPage from './ProductPage'
import { useContext } from 'react'
import { CategoryContext } from '../App'


function Content() {

    const { category, setCategory} = useContext(CategoryContext)

  return (
    <div></div>
  )
}

export default Content