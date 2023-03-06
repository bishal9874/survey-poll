import React from 'react'
import './Dashboardcard.css'
const DashboardCard = (props) => {
  return (
    <div className="dashboard_Card">{props.children}</div>
  )
}

export default DashboardCard