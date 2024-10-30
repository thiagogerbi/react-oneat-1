import React from 'react';
import Insights from '../components/Insights';
import RecentOrders from '../components/RecentOrders';
import SalesAnalytics from '../components/SalesAnalytics';
import style from "../globals.css"

export default function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="date">
        <input type="date" />
      </div>
      <div className='flex flex-row'>
      <Insights />
      <Insights />
      <Insights />
      </div>
      <RecentOrders />
      <div className="right">
      <SalesAnalytics />
      </div>
    </main>
  );
};


