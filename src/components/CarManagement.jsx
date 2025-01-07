import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import {  toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minWidth: '400px',
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const CarManagement = () => {
  const [soXe, setSoXe] = useState('');
  const [sdt, setSDT] = useState('');
  const [loaiXe, setLoaiXe] = useState('');
  const [soCho, setSoCho] = useState('');

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [xeSua, setXeSua] = useState({});

  const [listXe,setListXe] = useState([]);
  
    useEffect(() => {
        getAllXe();
    }, []);

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

    const handleDelete = async (id) => {
        try {
        const response = await fetch(`http://192.168.31.45:9999/api/deleteXe/${id}`, { method: 'DELETE' });
        if (response.ok) {
            setListXe(listXe.filter((tx) => tx.ID_Xe !== id));
            toast("Xe đã bị xoá");
        } else {
            console.error('Lỗi khi xóa xe');
            toast("Xe đã bị xoá",{type:"error"});
        }
        } catch (error) {
            toast("Xe đã bị xoá",{type:"error"});
            console.error('Lỗi khi xóa tuyến xe:', error);
        }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://192.168.31.45:9999/api/addXe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          soXe:soXe,
          sdt:sdt,
          loaiXe:loaiXe,
          soCho:soCho,
        }),
      });
  
      if (!response.ok) {
        toast("Lỗi!",{type:"error"});
        throw new Error('Đã xảy ra lỗi khi thêm tuyến xe');
      }
      
      toast("Xe đã được thêm");

      // Xử lý khi thêm thành công
      console.log('Thêm xe thành công');
      setSoXe("")
      setSDT("")
      setLoaiXe("")
      setSoCho("");
      getAllXe();
    } catch (error) {
        toast("Lỗi!",{type:"error"});
      console.error('Lỗi:', error);
      // Hiển thị thông báo lỗi cho người dùng
    }
  };
  
  const handleClickOpen = (u) => {
    setOpen(true);
    setXeSua(u);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitSua = async (e) => {
    e.preventDefault();

    const dataChange = {
      soXe: xeSua.SoXe,
      sdt: xeSua.SDT_Xe,
      loaiXe: xeSua.LoaiXe ,
      soCho: xeSua.SoCho  
    }

    const id = xeSua.ID_Xe;

    try {
      const response = await axios.put(`http://192.168.31.45:9999/api/updateXe/${id}`, dataChange); // Thay thế `/api/tuyen-xe/${id}` bằng URL thực tế của API
      if (response.status === 200) {
        console.log('Cập nhật xe thành công:', response.data);
        getAllXe();
        handleClose();
        toast("Xe đã được cập nhật");

      } else {
        toast("Lỗi khi cập nhật xe",{type:"error"});
        console.error('Lỗi cập nhật xe:', response.data);
      }
    } catch (error) {
        toast("Lỗi khi cập nhật xe",{type:"error"});
      console.error('Lỗi khi gọi API:', error);
    }
  };

  return (
    <div className="ml-64 mt-12 p-6">
  {/* Add Xe Form */}
  <div className="mb-8 w-4/5">
    <h2 className="text-2xl font-semibold mb-4">Thêm loại Xe</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Biển số xe:</label>
          <input
            type="text"
            value={soXe}
            onChange={(e) => setSoXe(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Số điện thoại xe:</label>
          <input
            type="text"
            value={sdt}
            onChange={(e) => setSDT(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Loại xe:</label>
          <input
            type="text"
            value={loaiXe}
            onChange={(e) => setLoaiXe(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Số chỗ:</label>
          <input
            type="text"
            value={soCho}
            onChange={(e) => setSoCho(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md w-full"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Thêm xe
      </button>
    </form>
  </div>

  {/* List of Xe */}
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">Danh sách xe hiện tại</h2>
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            <th className="px-4 py-2">ID Xe</th>
            <th className="px-4 py-2">Biển số xe</th>
            <th className="px-4 py-2">SĐT</th>
            <th className="px-4 py-2">Loại xe</th>
            <th className="px-4 py-2">Số chỗ</th>
            <th className="px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listXe.map((tx) => (
            <tr key={tx.ID_Xe} className="border-b">
              <td className="px-4 py-2">{tx.ID_Xe}</td>
              <td className="px-4 py-2">{tx.SoXe}</td>
              <td className="px-4 py-2">{tx.SDT_Xe}</td>
              <td className="px-4 py-2">{tx.LoaiXe}</td>
              <td className="px-4 py-2">{tx.SoCho}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleClickOpen(tx)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(tx.ID_Xe)}
                  className="text-red-500 hover:text-red-600"
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

  {/* Dialog Modal */}
  <Dialog open={open} onClose={handleClose} classes={{ paper: 'rounded-lg' }}>
    <DialogTitle className="text-lg font-semibold">Sửa Loại Xe</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="tenTuyenXe"
        label="Biển số xe"
        type="text"
        fullWidth
        value={xeSua.SoXe}
        onChange={(e) =>
          setXeSua({ ...xeSua, SoXe: e.target.value })
        }
        className="mb-4"
      />
      <TextField
        margin="dense"
        id="diemDi"
        label="Số điện thoại"
        type="text"
        fullWidth
        value={xeSua.SDT_Xe}
        onChange={(e) =>
          setXeSua({ ...xeSua, SDT_Xe: e.target.value })
        }
        className="mb-4"
      />
      <TextField
        margin="dense"
        id="diemDen"
        label="Loại xe"
        type="text"
        fullWidth
        value={xeSua.LoaiXe}
        onChange={(e) =>
          setXeSua({ ...xeSua, LoaiXe: e.target.value })
        }
        className="mb-4"
      />
      <TextField
        margin="dense"
        id="khoangCach"
        label="Số chỗ"
        type="text"
        fullWidth
        value={xeSua.SoCho}
        onChange={(e) =>
          setXeSua({ ...xeSua, SoCho: e.target.value })
        }
        className="mb-4"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Hủy
      </Button>
      <Button
        onClick={(e) => handleSubmitSua(e, xeSua.ID_Xe)}
        color="primary"
      >
        Lưu
      </Button>
    </DialogActions>
  </Dialog>
</div>

  );
};

export default CarManagement;
