import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Tháng 1', doanhThu: 400 },
  { name: 'Tháng 2', doanhThu: 300 },
  { name: 'Tháng 3', doanhThu: 200 },
  { name: 'Tháng 4', doanhThu: 278 },
  { name: 'Tháng 5', doanhThu: 189 },
];

const Charts = () => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Doanh Thu</h2>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="doanhThu" stroke="#007bff" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default Charts;
