import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PDFDocument from './ExportTicket';

const PassengerManagement = () => {
  const [listUser, setListUser] = useState([]);
  const [listUserSearch, setListUserSearch] = useState([]);
  const [listTicket, setListTicket] = useState([]);
  const [ten, setTen] = useState('');
  const [email, setEmail] = useState('');
  const [sdt, setSdt] = useState('');
  const [tenV, setTenV] = useState('');
  const [emailV, setEmailV] = useState('');
  const [sdtV, setSdtV] = useState('');
  const [matkhau, setMatKhau] = useState('');
  const [open, setOpen] = useState(false);
  const [userSua, setUserSua] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [viewTicket, setViewTicket] = useState(false);

  useEffect(() => {
    getAllUser();
  }, []);

  const ticket = {
    id: '12345',
    name: 'Nguyen Van A',
    phone: '0901234567',
    trip: 'Hà Nội - Sài Gòn',
    seat: 'A1',
  };

  const getAllUser = async () => {
    try {
      const response = await axios.get('http://192.168.31.45:9999/api/getAllUser');
      if (response.data) setListUser(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetAllUser = () => {
    setListUserSearch([]);
    getAllUser();
  }

  const handleSearch = async () => {
    // Lọc người dùng theo tất cả tiêu chí
    setListUser([]);
    const filteredUsers = 
      listUser.filter((user) => 
        user.ID_NguoiDung === Number(searchTerm) ||
        user.Ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.SDT.includes(searchTerm)
      );

    setListUserSearch(filteredUsers);
    
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://192.168.31.45:9999/api/deleteUser/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setListUser(listUser.filter((user) => user.ID_NguoiDung !== id));
        toast.success("Người dùng đã bị xoá");
      } else {
        toast.error('Lỗi khi xóa người dùng');
      }
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const handleGetTicket = async (user) =>{

    try {
      const response = await axios.post('http://192.168.31.45:9999/api/getVeTheoNguoiDung', {id:user.ID_NguoiDung});
      if (response && response.data) {
        setListTicket(response.data.data);
        console.log(response.data.data);
      } else {
        console.log("không có vé nào");
      }
    } catch (error) {
      console.log("không có vé nào");// Set an empty list in case of errors
    }
  }

  const handleViewTicket = (user) => {
    handleGetTicket(user);
    setViewTicket(true)
    setTenV(user.Ten)
    setEmailV(user.Email)
    setSdtV(user.SDT)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.31.45:9999/api/addUser', {
        email,
        matkhau,
        sdt,
        ten,
      });
      toast.success("Người dùng đã được thêm");
      setTen('');
      setEmail('');
      setSdt('');
      setMatKhau('');
      getAllUser();
    } catch (error) {
      toast.error('Lỗi khi thêm người dùng');
    }
  };

  const handleClickOpen = (user) => {
    setOpen(true);
    setUserSua(user);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitSua = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://192.168.31.45:9999/api/updateUser/${userSua.ID_NguoiDung}`, {
        email: userSua.Email,
        sdt: userSua.SDT,
        ten: userSua.Ten,
        matkhau: userSua.MatKhau,
      });
      toast.success("Người dùng đã được cập nhật");
      getAllUser();
      handleClose();
    } catch (error) {
      toast.error('Lỗi khi cập nhật người dùng');
    }
  };

  const handleBack = () => {
    setViewTicket(false);
    setListTicket([]);
  }

  const handleDownload = async () => {
    const blob = await pdf(<PDFDocument ticket={ticket} />).toBlob();
    saveAs(blob, `ve-xe-${ticket.id}.pdf`);
  };

  return (
    <div className='bg-gray-100'> 
        {!viewTicket &&
          <div className="container mx-auto p-6 " style={{marginTop: "80px",width:"80%" ,marginLeft: "250px"}}>
          <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>
          {/* Form thêm người dùng */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-5/6 "
          >
            <h2 className="text-lg font-semibold mb-4">Thêm người dùng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block font-medium mb-1">Tên:</label>
                <input
                  type="text"
                  value={ten}
                  onChange={(e) => setTen(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Số điện thoại:</label>
                <input
                  type="text"
                  value={sdt}
                  onChange={(e) => setSdt(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Mật khẩu:</label>
                <input
                  type="password"
                  value={matkhau}
                  onChange={(e) => setMatKhau(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Thêm người dùng
            </button>
          </form>
          {/* Ô tìm kiếm */}
          <div className="w-full w-5/6 my-4">
            <div className="flex flex-col md:flex-row justify-between w-full">
              <div className="relative w-1/2">
              <label htmlFor="default-search" class="sr-only">Search</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                  <input onChange={(e) => setSearchTerm(e.target.value)} type="text" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                </div>
                <button onClick={handleSearch} type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>

              <button
                      className="inset-y-0 right-0 px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={handleGetAllUser}
                    >
                      Tất cả người dùng   
              </button>
            </div>
          </div>


          {/* Bảng danh sách người dùng */}
          <table className="min-w-full bg-white shadow rounded-lg" >
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">SĐT</th>
                <th className="px-4 py-2">Tên</th>
                <th className="px-4 py-2">Mật khẩu</th>
                <th className="px-4 py-2">Quyền</th>
                <th className="px-4 py-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {listUser && listUser.map((user) => (
                <tr key={user.ID_NguoiDung} className="border-t">
                  <td className="px-4 py-2">{user.ID_NguoiDung}</td>
                  <td className="px-4 py-2">{user.Email}</td>
                  <td className="px-4 py-2">{user.SDT}</td>
                  <td className="px-4 py-2">{user.Ten}</td>
                  <td className="px-4 py-2">{user.MatKhau}</td>
                  <td className="px-4 py-2">{user.Ten_Quyen}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleClickOpen(user)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                      Sửa
                    </button>
                    <button onClick={() => handleDelete(user.ID_NguoiDung)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Xóa
                    </button>
                    <button onClick={() => handleViewTicket(user)} className=" my-2 bg-blue-500 text-white px-3 py-1 rounded">
                      Vé đã đặt
                    </button>
                  </td>
                </tr>
              ))}

              {listUserSearch && listUserSearch.map((user) => (
                <tr key={user.ID_NguoiDung} className="border-t">
                  <td className="px-4 py-2">{user.ID_NguoiDung}</td>
                  <td className="px-4 py-2">{user.Email}</td>
                  <td className="px-4 py-2">{user.SDT}</td>
                  <td className="px-4 py-2">{user.Ten}</td>
                  <td className="px-4 py-2">{user.MatKhau}</td>
                  <td className="px-4 py-2">{user.Ten_Quyen}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleClickOpen(user)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                      Sửa
                    </button>
                    <button onClick={() => handleDelete(user.ID_NguoiDung)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Xóa
                    </button>

                    <button onClick={() => handleViewTicket(user.ID_NguoiDung)} className=" my-2 bg-blue-500 text-white my-2 px-3 py-1 rounded">
                      Vé đã đặt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {open && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white rounded-lg p-8 w-[90%] md:w-[50%]">
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">Sửa thông tin người dùng</h3>
                <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmitSua}>
                  <input
                    type="text"
                    placeholder="Email"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={userSua.Email}
                    onChange={(e) => setUserSua({ ...userSua, Email: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={userSua.SDT}
                    onChange={(e) => setUserSua({ ...userSua, SDT: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Điểm đến"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={userSua.Ten}
                    onChange={(e) => setUserSua({ ...userSua, Ten: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Mật khẩu"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={userSua.MatKhau}
                    onChange={(e) => setUserSua({ ...userSua, MatKhau: e.target.value })}
                  />
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
                    >
                      Hủy
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all">
                      Lưu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}


          </div>
        }
        {/* ---------------------------------------------------------------------------------- */}
          {viewTicket &&
          <div className="container mx-auto p-6 " style={{marginTop: "80px",width:"80%" ,marginLeft: "250px"}}>
            <div className="p-6 bg-gray-100 min-h-screen">
          {/* User Info Section */}
          <button
              onClick={handleBack}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Quay lại
            </button>

          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Thông tin người dùng</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="font-medium text-gray-600">Tên:</label>
                <p className="text-gray-800">{tenV}</p>
              </div>
              <div>
                <label className="font-medium text-gray-600">Email:</label>
                <p className="text-gray-800">{emailV}</p>
              </div>
              <div>
                <label className="font-medium text-gray-600">Số điện thoại:</label>
                <p className="text-gray-800">{sdtV}</p>
              </div>
            </div>
          </div>

          {/* Trip List Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Danh sách chuyến xe</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                    <th className="px-4 py-2 border">Trạng thái vé</th>
                    <th className="px-4 py-2 border">Ngày khởi hành</th>
                    <th className="px-4 py-2 border">Vị trí chỗ</th>
                    <th className="px-4 py-2 border">Số tiền</th>
                    <th className="px-4 py-2 border">Nơi đi</th>
                    <th className="px-4 py-2 border">Nơi đến</th>
                    <th className="px-4 py-2 border">Tuỳ chọn</th>
                  </tr>
                </thead>
                <tbody>
                  {listTicket.map((trip, index) => (
                    <tr
                      key={index}
                    >
                      <td className="px-4 py-2 border">{trip.TrangThaiVe}</td>
                      <td className="px-4 py-2 border">{trip.GioKhoiHanh?.substring(0,10)}</td>
                      <td className="px-4 py-2 border">{trip.ViTriCho}</td>
                      <td className="px-4 py-2 border">{trip.SoTien}</td>
                      <td className="px-4 py-2 border">{trip.noiDi}</td>
                      <td className="px-4 py-2 border">{trip.noiDen}</td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={handleDownload}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          Tải vé
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

          </div> 
        }
    </div>

  );
};

export default PassengerManagement;
