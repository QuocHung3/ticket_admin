import React,{useState,useEffect} from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Bus, CreditCard, TrendingUp } from 'lucide-react';
import axios from 'axios';

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Dashboard = () => {
  const [count,setCount] = useState(0);
  const [choDat,setChoDat] = useState(0);
  const [chuyenTrongThang,setChuyenTrongThang] = useState(0);
  const [routeData,setRouteData] = useState([]);
  const [dtTheoTuyen,setDTTheoTuyen] = useState([]);
  const [veTheoNgay,setVeTheoNgay] = useState([]);

      useEffect(()=> {
        getAllChoDat();
        getAllChuyen();
        getAllVeTheoTuyen();
        getAllDoanhThuTheoTuyen();
        getAllChuyenTrongThang();
        getAllVeTheoNgay();
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
          axios.get('http://192.168.31.45:9999/api/getTongChoDat')
          .then(response => {
            if(response && response.data) {
              setChoDat(response.data.data[0].TongSoChoDat)
            }
              console.log("🚀 ~ getAllChoDat ~ response.data.data:", response.data.data[0].TongSoChoDat)
          })
          .catch(error => {
            console.log(error);
          });
        } catch (error) {
          console.log(error);
        }
      }

      const getAllVeTheoTuyen= ()=> {
        try {
          axios.get('http://192.168.31.45:9999/api/getAllVeTheoTuyen')
          .then(response => {
            if(response && response.data) {
              const veTheoTuyen =  response.data.data.map(item => ({
                route: item.TenTuyenXe,
                tickets: item.SoLuongVeDaDat
              }))

              setRouteData(veTheoTuyen)
            }
          })
          .catch(error => {
            console.log(error);
          });
        } catch (error) {
          console.log(error);
        }
      }

      const getAllVeTheoNgay= ()=> {
        try {
          axios.get('http://192.168.31.45:9999/api/getAllVeDatTheoNgay')
          .then(response => {
            if(response && response.data) {
              const veTheoTuyen =  response.data.data.filter(val => val.SoVeDaDat > 0)
              console.log("🚀 ~ getAllVeTheoNgay ~ response.data.data:", response.data.data)

              const result = new Map();

              veTheoTuyen.forEach(item => {
                const key = `${item.SoVeDaDat}-${item.SoVeDaHuy}`; // Tạo khóa duy nhất cho mỗi nhóm
                if (!result.has(key)) {
                  result.set(key, item); // Nếu chưa có trong map, thêm vào
                }
              });
              
              setVeTheoNgay(Array.from(result.values()))
            }
          })
          .catch(error => {
            console.log(error);
          });
        } catch (error) {
          console.log(error);
        }
      }

      const getAllDoanhThuTheoTuyen= ()=> {
        try {
          axios.get('http://192.168.31.45:9999/api/getAllDoanhThuTheoTuyen')
          .then(response => {
            if(response && response.data) {
              const dtTheoTuyen =  response.data.data.map(item => ({
                name: item.TenTuyenXe,
                value: item.TongDoanhThu
              }))

              setDTTheoTuyen(dtTheoTuyen)
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

  console.log(veTheoNgay)

  const revenueData = [
    { month: 'T1', revenue: choDat*350000 },
    { month: 'T2', revenue: 0 },
    { month: 'T3', revenue: 0 },
    { month: 'T4', revenue: 0 },
    { month: 'T5', revenue: 0 },
    { month: 'T6', revenue: 0 },
  ];

  const getAllChuyenTrongThang= ()=> {
    try {
      axios.get('http://192.168.31.45:9999/api/getAllChuyenTrongThang')
      .then(response => {
        if(response && response.data) {
          setChuyenTrongThang(response.data.data[0].SoLuongChuyen)
        }
          console.log("🚀 ~ getAllChoDat ~ response.data.data:", response.data.data[0].TongSoChoDat)
      })
      .catch(error => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="p-4 space-y-4" style={{ marginLeft: '250px', marginTop: '80px', padding: '20px' }}>
      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng khách hàng trong tháng</p>
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
              <p className="text-sm font-medium text-gray-600">Số chuyến trong tháng</p>
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
              <p className="text-sm font-medium text-gray-600">Doanh thu tháng này</p>
              <h3 className="text-2xl font-bold">{formatVND(choDat*350000)}</h3>
            </div>
          </div>
        </div>

        {/* <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Tăng trưởng</p>
              <h3 className="text-2xl font-bold">+12.5%</h3>
            </div>
          </div>
        </div> */}
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
            <h2 className="text-lg font-bold">Doanh thu theo từng tuyến</h2>
          </div>
          <div className="p-4">
            <div className="">
              {dtTheoTuyen.map((value,index)=> {
                return (
                  <div key={index} className='w-3/4 flex content-between justify-between flex-row'>
                    <div className=' text-lg font-bold' style={{display:"flex"}}>
                      {value.name}
                    </div>
                    <div>{formatVND(value.value)}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div> 

        {/* Biểu đồ thông kê số liệu */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold">Số liệu thống kê</h2>
          </div>
          <div className="p-4">
            <div className="h-80">
              <div className='flex content-between justify-between flex-row'>
                <div className=' text-lg font-bold' style={{display:"flex"}}>
                  Số chuyến trong tháng
                </div>
                <div>{chuyenTrongThang}</div>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID Chuyến Xe
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày Đi
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số Vé Đã Đặt
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số Vé Đã Hủy
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto max-h-[100px]">
                  {veTheoNgay && veTheoNgay.map((value, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{value.ID_ChuyenXe}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{value.NgayDi?.substring(0, 10)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{value.SoVeDaDat}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{value.SoVeDaHuy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Biểu đồ doanh thu */}
        <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">Doanh thu theo 6 tháng</h2>
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
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Doanh thu 2025" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        </div>
      </div>

        
    </div>
  );
};

export default Dashboard;
