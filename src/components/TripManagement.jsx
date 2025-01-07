import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import {  toast } from 'react-toastify'
import { LocalizationProvider, DateTimePicker,DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';


const TicketManagement = () => {
  const [idTuyen, setIdTuyen] = useState(null);
  const [idTaiXe, setIdTaiXe] = useState(null);
  const [idXe, setIdXe] = useState(null);
  const [listTuyenXe, setListTuyenXe] = useState([]);
  const [listChuyenXe, setListChuyenXe] = useState([]);
  const [listChuyenXeO, setListChuyenXeO] = useState([]);
  const [listTaiXe,setListTaiXe] = useState([]);
  const [listXe,setListXe] = useState([]);
  
  const [ngayGiodi, setNgayGiodi] = useState(dayjs());
  const [ngayGioden, setNgayGioden] = useState(dayjs());

  const [ID_ChuyenXe, setIdTuyenLoc] = useState(null);
  const [NgayDi, setNgayDiLoc] = useState(null);

  useEffect(()=> {
    getAllTuyenXe();
    getAllTaiXe();
    getAllXe();
  },[])

  const getAllTaiXe = async() => {
    try {
      await axios.get('http://192.168.31.45:9999/api/getAllTaiXe')
      .then(response => {
        if(response && response.data) {
          setListTaiXe(response.data.data)
        }
      })
      .catch(error => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const getAllXe = async() => {
    try {
      await axios.get('http://192.168.31.45:9999/api/getAllXe')
      .then(response => {
        if(response && response.data) {
          setListXe(response.data.data)
        }
      })
      .catch(error => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getChuyenTheoTuyen();
  }, [idTuyen]);

  const getChuyenTheoTuyen = async () => {
    try {
      const response = await axios.get('http://192.168.31.45:9999/api/getAllChuyen');
      if (response && response.data) {
        setListChuyenXeO(response.data.data);
        setListChuyenXe(response.data.data);
      } else {
        setListChuyenXe([]);
        console.log("không có chuyến nào");
      }
    } catch (error) {
      console.log("không có chuyến nào");
      setListChuyenXe([]); // Set an empty list in case of errors
    }
  };

  const getAllTuyenXe = async ()=> {
    try {
      await axios.get('http://192.168.31.45:9999/api/AlltuyenXe')
      .then(response => {
        if(response && response.data) {
          setListTuyenXe(response.data.data)
        }
      })
      .catch(error => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://192.168.31.45:9999/api/addChuyenXe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ngaydi: ngayGiodi.format("YYYY-MM-DD"),
          ngayden : ngayGioden.format("YYYY-MM-DD"),
          giodi: ngayGiodi.format("HH:mm:ss"),
          gioden: ngayGioden.format("HH:mm:ss"),
          id_xe: idXe,
          id_tuyenxe: idTuyen,
          id_taixe: idTaiXe
        }),
      });
  
      if (!response.ok) {
        throw new Error('Đã xảy ra lỗi khi thêm chuyen xe');
      }
      
      toast("Thêm chuyến xe thành công");
      // Xử lý khi thêm thành công
      getChuyenTheoTuyen();
    } catch (error) {
      toast("Không thể thêm chuyến" ,{type:'error'});
      console.error('Lỗi:', error);
      // Hiển thị thông báo lỗi cho người dùng
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://192.168.31.45:9999/api/deleteChuyenXe/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setListChuyenXe(listChuyenXe.filter((tx) => tx.ID_TuyenXe !== id));
        toast("xoá chuyến xe thành công");
        getChuyenTheoTuyen()
      } else {
        console.error('Lỗi khi xóa tuyến xe');
      }
    } catch (error) {
      console.error('Lỗi khi xóa tuyến xe:', error);
    }
  };




  useEffect(()=> {
    if(!ID_ChuyenXe && !NgayDi) return;
    const dataChuyen = listChuyenXeO;
    
    const dataC = dataChuyen.filter((item) => {
      if(ID_ChuyenXe && NgayDi) return item.ID_TuyenXe == ID_ChuyenXe && item["NgayDi"]?.substring(0,10) == NgayDi?.format("YYYY-MM-DD");
      else if(ID_ChuyenXe) return item.ID_TuyenXe == ID_ChuyenXe
      else return item["NgayDi"]?.substring(0,10) == NgayDi?.format("YYYY-MM-DD")
    });

    setListChuyenXe(dataC)

  },[ID_ChuyenXe,NgayDi])



  return (
    <div className="ml-64 mt-20 p-6 bg-gray-50 rounded-lg shadow-xl">
    <div className="mb-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Quản lý chuyến xe</h2>
    </div>

    <div className="grid  w-100 grow md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Tìm chuyến
        </h2>
        <div
          className="grid grid-cols-1 md:grid-cols-1 gap-2"
        >
          {/* Chuyến xe */}
          <div>
            <label
              htmlFor="tuyen-xe"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tuyến xe:
            </label>
            <select
              id="tuyen-xe"
              className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={ID_ChuyenXe}
              onChange={(e) => setIdTuyenLoc(e.target.value)}
            >
              <option key={0} value={"Chọn tuyến"}>
                Chọn tuyến xe
              </option>
              {listTuyenXe.map((option) => (
                <option key={option.ID_TuyenXe} value={option.ID_TuyenXe}>
                  {option.TenTuyenXe}
                </option>
              ))}
            </select>
          </div>

          {/* Ngày đi */}
          <div>
            <label
              htmlFor="ngay-di"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ngày đi:
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Chọn ngày và giờ đi"
                value={NgayDi || null}
                minDate={dayjs()}
                onChange={(newValue) => setNgayDiLoc(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="ngay-di"
                    className="w-full"
                  />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
  
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Thêm Chuyến Xe
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-2"
        >
          {/* Chuyến xe */}
          <div>
            <label
              htmlFor="tuyen-xe"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Chuyến xe:
            </label>
            <select
              id="tuyen-xe"
              className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={idTuyen}
              onChange={(e) => setIdTuyen(e.target.value)}
            >
              <option key={0} value={"Chọn tuyến"}>
                Chọn tuyến xe
              </option>
              {listTuyenXe.map((option) => (
                <option key={option.ID_TuyenXe} value={option.ID_TuyenXe}>
                  {option.TenTuyenXe}
                </option>
              ))}
            </select>
          </div>

          {/* Ngày đi */}
          <div>
            <label
              htmlFor="ngay-di"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ngày đi:
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Chọn ngày và giờ đi"
                value={ngayGiodi || null}
                minDate={dayjs()}
                onChange={(newValue) => setNgayGiodi(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="ngay-di"
                    className="w-full"
                  />
                )}
              />
            </LocalizationProvider>
          </div>

          {/* Ngày đến */}
          <div>
            <label
              htmlFor="ngay-den"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ngày đến:
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Chọn ngày và giờ đến"
                minDate={ngayGiodi || dayjs()}
                value={ngayGioden || null}
                onChange={(newValue) => setNgayGioden(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="ngay-den"
                    className="w-full"
                  />
                )}
              />
            </LocalizationProvider>
            {ngayGioden < ngayGiodi && <div className='text-yellow'>Ngày giờ đến phải nhỏ hơn ngày giờ khởi hành</div>}
            
          </div>

          {/* Tài xế */}
          <div>
            <label
              htmlFor="tai-xe"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tài xế:
            </label>
            <select
              id="tai-xe"
              className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={idTaiXe}
              onChange={(e) => setIdTaiXe(e.target.value)}
            >
              {listTaiXe.map((option) => (
                <option key={option.ID_TaiXe} value={option.ID_TaiXe}>
                  {option.TenTaiXe}
                </option>
              ))}
            </select>
          </div>

          {/* Xe */}
          <div>
            <label
              htmlFor="xe"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Xe:
            </label>
            <select
              id="xe"
              className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={idXe}
              onChange={(e) => setIdXe(e.target.value)}
            >
              {listXe.map((option) => (
                <option key={option.ID_Xe} value={option.ID_Xe}>
                  {option.SoXe}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Thêm chuyến xe
            </button>
          </div>
        </form>
      </div>
    </div>

    <div className="mt-8 overflow-x-auto bg-white shadow-md rounded-lg">
      <button
        className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => getChuyenTheoTuyen()}
      >
              Tải lại
      </button>
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tuyến Xe</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Điểm Đi</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Điểm đến</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ngày giờ đi</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ngày giờ đến</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {listChuyenXe &&
            listChuyenXe.map((tx,index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 text-sm text-gray-800">{tx.TenTuyenXe}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{tx.DiemDi}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{tx.DiemDen}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{tx.NgayDi?.substring(0, 10)}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{tx.NgayDen?.substring(0, 10)}</td>
                <td className="px-6 py-3 text-sm">
                  <button
                    onClick={() => handleDelete(tx.ID_ChuyenXe)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
  

  );
};

export default TicketManagement;
