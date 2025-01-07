import React,{useState,useEffect} from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Bus, CreditCard, TrendingUp } from 'lucide-react';
import axios from 'axios';

  // Dữ liệu mẫu cho biểu đồ doanh thu
  const revenueData = [
    { month: 'T1', revenue: 120000000 },
    { month: 'T2', revenue: 150000000 },
    { month: 'T3', revenue: 180000000 },
    { month: 'T4', revenue: 160000000 },
    { month: 'T5', revenue: 200000000 },
    { month: 'T6', revenue: 220000000 },
  ];

  // Dữ liệu mẫu cho biểu đồ số lượng vé theo tuyến
  const routeData = [
    { route: 'HN-SG', tickets: 500 },
    { route: 'HN-DN', tickets: 300 },
    { route: 'SG-DN', tickets: 400 },
    { route: 'HN-HP', tickets: 200 },
    { route: 'SG-CT', tickets: 250 },
  ];

  // Dữ liệu mẫu cho biểu đồ tròn phương thức thanh toán
  const paymentData = [
    { name: 'Tiền mặt', value: 40 },
    { name: 'Banking', value: 35 },
    { name: 'Ví điện tử', value: 25 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Dashboard = () => {
  const [count,setCount] = useState(0);
  const [choDat,setChoDat] = useState(0);

      useEffect(()=> {
        getAllChoDat();
        getAllChuyen();
      },[])
    
      const getAllChuyen= () => {
        try {
          axios.get('http://192.168.31.45:9999/api/getAllChuyen')
          .then(response => {
            if(response && response.data) {
              setCount(response.data.data.length)
            }
          })
          .catch(error => {
            console.log(error);
          });
        } catch (error) {
          console.log(error);
        }
      }
    
      const getAllChoDat= ()=> {
        try {
          axios.get('http://192.168.31.45:9999/api/getAllChoDat')
          .then(response => {
            if(response && response.data) {
              setChoDat(response.data.data.length)
            }
          })
          .catch(error => {
            console.log(error);
          });
        } catch (error) {
          console.log(error);
        }
      }

  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  return (
    <div className="p-4 space-y-4" style={{ marginLeft: '250px', marginTop: '80px', padding: '20px' }}>
      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng khách hàng</p>
              <h3 className="text-2xl font-bold">{choDat}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-green-100 rounded-full">
              <Bus className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Số chuyến</p>
              <h3 className="text-2xl font-bold">{count}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-yellow-100 rounded-full">
              <CreditCard className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Doanh thu tháng</p>
              <h3 className="text-2xl font-bold">{formatVND(choDat*350000)}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Tăng trưởng</p>
              <h3 className="text-2xl font-bold">+12.5%</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">Doanh thu theo tháng</h2>
        </div>
        <div className="p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip formatter={(value) => formatVND(value)} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Doanh thu" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Biểu đồ số lượng vé theo tuyến */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold">Số lượng vé theo tuyến</h2>
          </div>
          <div className="p-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={routeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="route" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tickets" fill="#82ca9d" name="Số vé" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Biểu đồ phương thức thanh toán */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold">Phương thức thanh toán</h2>
          </div>
          <div className="p-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
