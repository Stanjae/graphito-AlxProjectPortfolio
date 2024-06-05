/* eslint-disable react/prop-types */

import { useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ApiContext } from '../Context/DataContext';


export const AreaGraph =()=> {
    const {globalData} = useContext(ApiContext)
    return (
      <ResponsiveContainer width="90%" height={400}>
        <AreaChart
          width={500}
          height={400}
          data={globalData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
