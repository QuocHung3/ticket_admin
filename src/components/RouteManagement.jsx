import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minWidth: '400px',
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const RouteManagement = () => {
  const [tuyenXe, setTuyenXe] = useState([]);
  const [tenTuyenXe, setTenTuyenXe] = useState('');
  const [diemDi, setDiemDi] = useState('');
  const [diemDen, setDiemDen] = useState('');
  const [khoangCach, setKhoangCach] = useState('');

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [tuyenXeSua, setTuyenXeSua] = useState({});
  

  

  useEffect(() => {
    getAllTX();
  }, []);

  const getAllTX =async () => {
    try {
      await axios.get('http://192.168.31.45:9999/api/AlltuyenXe')
      .then(response => {
        if(response && response.data) {
          setTuyenXe(response.data.data)
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
      const response = await fetch(`http://192.168.31.45:9999/api/deleteTuyenXe/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setTuyenXe(tuyenXe.filter((tx) => tx.ID_TuyenXe !== id));
      } else {
        console.error('Lỗi khi xóa tuyến xe');
      }
    } catch (error) {
      console.error('Lỗi khi xóa tuyến xe:', error);
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
        body: JSON.stringify({
          tenTuyenDi:tenTuyenXe,
          diemDi:diemDi,
          diemDen:diemDen,
          KhoangCach:khoangCach,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Đã xảy ra lỗi khi thêm tuyến xe');
      }
  
      // Xử lý khi thêm thành công
      console.log('Thêm tuyến xe thành công');
      setTenTuyenXe("")
      setDiemDi("")
      setDiemDen("")
      setKhoangCach("");
      getAllTX();
    } catch (error) {
      console.error('Lỗi:', error);
      // Hiển thị thông báo lỗi cho người dùng
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

    const dataChange = {
      tenTuyenDi: tuyenXeSua.TenTuyenXe, 
      huyenDiemDi: tuyenXeSua.DiemDi, 
      huyenDiemDen: tuyenXeSua.DiemDen, 
      khoangCach: tuyenXeSua.KhoangCach
    }


    try {
      const response = await axios.put(`http://192.168.31.45:9999/api/updateTuyenXe/${tuyenXeSua.ID_TuyenXe}`, dataChange); // Thay thế `/api/tuyen-xe/${id}` bằng URL thực tế của API
      if (response.status === 200) {
        console.log('Cập nhật tuyến xe thành công:', response.data);
        getAllTX();
        handleClose();
      } else {
        console.error('Lỗi cập nhật tuyến xe:', response.data);
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };

  return (
    <div style={{ marginLeft: '250px', marginTop: '50px', padding: '20px' }}>
      <div>
      <h2>Thêm Tuyến Xe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên tuyến xe:</label>
          <input
            type="text"
            value={tenTuyenXe}
            onChange={(e) => setTenTuyenXe(e.target.value)}
          />
        </div>
        <div>
          <label>Điểm đi:</label>
          <input
            type="text"
            value={diemDi}
            onChange={(e) => setDiemDi(e.target.value)}
          />
        </div>
        <div>
          <label>Điểm đến:</label>
          <input
            type="text"
            value={diemDen}
            onChange={(e) => setDiemDen(e.target.value)}
          />
        </div>
        <div>
          <label>Khoảng cách:</label>
          <input
            type="number"
            value={khoangCach}
            onChange={(e) => setKhoangCach(e.target.value)}
          />
        </div>
        <button type="submit">Thêm tuyến xe</button>
      </form>
    </div>

      <div className="tuyen-xe-container">
      <div>
      <h2>Quản lý Tuyến Xe</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID Tuyến Xe</th>
            <th>Tên Tuyến Xe</th>
            <th>Điểm Đi</th>
            <th>Điểm Đến</th>
            <th>Khoảng Cách</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {tuyenXe.map((tx) => (
            <tr key={tx.ID_TuyenXe}>
              <td>{tx.ID_TuyenXe}</td>
              <td>{tx.TenTuyenXe}</td>
              <td>{tx.DiemDi}</td>
              <td>{tx.DiemDen}</td>
              <td>{tx.KhoangCach} km</td>
              <td>
                <button onClick={() => handleClickOpen(tx)}>Sửa</button>
                <button onClick={() => handleDelete(tx.ID_TuyenXe)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog open={open} onClose={handleClose} classes={{ paper: classes.dialogPaper }}>
        <DialogTitle>Sửa Tuyến Xe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="tenTuyenXe"
            label="Tên tuyến xe"
            type="text"
            fullWidth
            className={classes.textField}
            value={tuyenXeSua.TenTuyenXe}
            onChange={(e) =>
              setTuyenXeSua({ ...tuyenXeSua, TenTuyenXe: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="diemDi"
            label="Điểm đi"
            type="text"
            fullWidth
            className={classes.textField}
            value={tuyenXeSua.DiemDi}
            onChange={(e) =>
              setTuyenXeSua({ ...tuyenXeSua, DiemDi: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="diemDen"
            label="Điểm đến"
            type="text"
            fullWidth
            className={classes.textField}
            value={tuyenXeSua.DiemDen}
            onChange={(e) =>
              setTuyenXeSua({ ...tuyenXeSua, DiemDen: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="khoangCach"
            label="Khoảng cách"
            type="number"
            fullWidth
            className={classes.textField}
            value={tuyenXeSua.KhoangCach}
            onChange={(e) =>
              setTuyenXeSua({ ...tuyenXeSua, KhoangCach: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={(e) => handleSubmitSua(e,tuyenXeSua.ID_TuyenXe)} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
      </div>
      
    </div>
    
  );
};

export default RouteManagement;
