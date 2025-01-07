import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RouteManagement = () => {
  const [tuyenXe, setTuyenXe] = useState([]);
  const [tenTuyenXe, setTenTuyenXe] = useState('');
  const [diemDi, setDiemDi] = useState('');
  const [diemDen, setDiemDen] = useState('');
  const [khoangCach, setKhoangCach] = useState('');

  const [open, setOpen] = useState(false);
  const [tuyenXeSua, setTuyenXeSua] = useState({});

  useEffect(() => {
    getAllTX();
  }, []);

  const getAllTX = async () => {
    try {
      const response = await axios.get('http://192.168.31.45:9999/api/AlltuyenXe');
      setTuyenXe(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://192.168.31.45:9999/api/deleteTuyenXe/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setTuyenXe(tuyenXe.filter((tx) => tx.ID_TuyenXe !== id));
        toast.success("Xóa tuyến xe thành công");
      } else {
        toast.error("Lỗi khi xóa tuyến xe");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi xóa tuyến xe");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://192.168.31.45:9999/api/tuyenXe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tenTuyenDi: tenTuyenXe, diemDi, diemDen, KhoangCach: khoangCach }),
      });
      if (response.ok) {
        toast.success("Thêm tuyến xe thành công");
        setTenTuyenXe('');
        setDiemDi('');
        setDiemDen('');
        setKhoangCach('');
        getAllTX();
      } else {
        toast.error("Lỗi khi thêm tuyến xe");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi thêm tuyến xe");
    }
  };

  const handleClickOpen = (tuyenXe) => {
    setOpen(true);
    setTuyenXeSua(tuyenXe);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitSua = async (e) => {
    e.preventDefault();

    console.log(tuyenXeSua)
    try {
      const response = await axios.put(
        `http://192.168.31.45:9999/api/updateTuyenXe/${tuyenXeSua.ID_TuyenXe}`,
        {
          tenTuyenDi: tuyenXeSua.TenTuyenXe,
          diemDi: tuyenXeSua.DiemDi,
          diemDen: tuyenXeSua.DiemDen,
          khoangCach: tuyenXeSua.KhoangCach,
        }
      );
      if (response.status === 200) {
        toast.success("Cập nhật tuyến xe thành công");
        getAllTX();
        handleClose();
      } else {
        toast.error("Lỗi khi cập nhật tuyến xe");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi cập nhật tuyến xe");
    }
  };


  return (
    <div className="p-10 mt-10 w-[80%] mx-auto" style={{marginTop: "80px",width:"80%" ,marginLeft: "250px"}}>
      {/* Form thêm tuyến xe */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">Thêm Tuyến Xe</h2>
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white shadow-md p-8 rounded-lg border border-gray-200"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Tên tuyến xe"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={tenTuyenXe}
            onChange={(e) => setTenTuyenXe(e.target.value)}
          />
          <input
            type="text"
            placeholder="Điểm đi"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={diemDi}
            onChange={(e) => setDiemDi(e.target.value)}
          />
          <input
            type="text"
            placeholder="Điểm đến"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={diemDen}
            onChange={(e) => setDiemDen(e.target.value)}
          />
          <input
            type="number"
            placeholder="Khoảng cách (km)"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={khoangCach}
            onChange={(e) => setKhoangCach(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all"
          >
            Thêm Tuyến Xe
          </button>
        </form>
      </div>

      {/* Danh sách tuyến xe */}
      <div>
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">Quản Lý Tuyến Xe</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-md shadow-sm bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-gray-700">ID</th>
                <th className="px-4 py-3 text-gray-700">Tên Tuyến Xe</th>
                <th className="px-4 py-3 text-gray-700">Điểm Đi</th>
                <th className="px-4 py-3 text-gray-700">Điểm Đến</th>
                <th className="px-4 py-3 text-gray-700">Khoảng Cách</th>
                <th className="px-4 py-3 text-gray-700">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {tuyenXe.map((tx) => (
                <tr key={tx.ID_TuyenXe} className="hover:bg-gray-100">
                  <td className="px-4 py-3 text-gray-700 border">{tx.ID_TuyenXe}</td>
                  <td className="px-4 py-3 text-gray-700 border">{tx.TenTuyenXe}</td>
                  <td className="px-4 py-3 text-gray-700 border">{tx.DiemDi}</td>
                  <td className="px-4 py-3 text-gray-700 border">{tx.DiemDen}</td>
                  <td className="px-4 py-3 text-gray-700 border">{tx.KhoangCach} km</td>
                  <td className="px-4 py-3 text-gray-700 border flex justify-center space-x-2">
                    <button
                      onClick={() => handleClickOpen(tx)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-all"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(tx.ID_TuyenXe)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
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

      {/* Modal chỉnh sửa */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-[90%] md:w-[50%]">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Sửa Tuyến Xe</h3>
            <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmitSua}>
              <input
                type="text"
                placeholder="Tên tuyến xe"
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={tuyenXeSua.TenTuyenXe}
                onChange={(e) => setTuyenXeSua({ ...tuyenXeSua, TenTuyenXe: e.target.value })}
              />
              <input
                type="text"
                placeholder="Điểm đi"
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={tuyenXeSua.DiemDi}
                onChange={(e) => setTuyenXeSua({ ...tuyenXeSua, DiemDi: e.target.value })}
              />
              <input
                type="text"
                placeholder="Điểm đến"
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={tuyenXeSua.DiemDen}
                onChange={(e) => setTuyenXeSua({ ...tuyenXeSua, DiemDen: e.target.value })}
              />
              <input
                type="number"
                placeholder="Khoảng cách (km)"
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={tuyenXeSua.KhoangCach}
                onChange={(e) => setTuyenXeSua({ ...tuyenXeSua, KhoangCach: e.target.value })}
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
  );
};

export default RouteManagement;
