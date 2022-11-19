import React from 'react'
import img from '../assets/404-SVG-Animated-Page-Concept.png'
const NotFound = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img style={{ width: '80vv', height: '50vh' }} src={img} />
    </div>
  )
}

export default NotFound