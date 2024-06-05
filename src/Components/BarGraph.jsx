/* eslint-disable react/prop-types */
import { useContext } from "react"
import { BarChart, CartesianGrid, ResponsiveContainer, XAxis, Tooltip, YAxis, Bar, Legend, Rectangle } from "recharts"
import { ApiContext } from "../Context/DataContext"


const BarGraph = () => {
    const {globalData} = useContext(ApiContext)
  return (
    <div>
      <ResponsiveContainer width="90%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={globalData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarGraph
