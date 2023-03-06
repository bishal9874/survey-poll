import React from 'react'
import "./smallCard.css"
const SmallCard = (props) => {
  return (
    <div className="small_Card">{props.children}</div>
  )
}

export default SmallCard