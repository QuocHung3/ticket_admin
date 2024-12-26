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

const PassengerManagement = () => {
  const [listUser, setListUser] = useState([]);
  const [ten, setTen] = useState('');
  const [email, setEmail] = useState('');
  const [sdt, setSdt] = useState('');
  const [matkhau, setMatKhau] = useState('');

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [userSua, setUserSua] = useState({});
  
  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser =async () => {
    try {
      await axios.get('http://192.168.31.45:9999/api/getAllUser')
      .then(response => {
        if(response && response.data) {
          setListUser(response.data.data)
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
      const response = await fetch(`http://192.168.31.45:9999/api/deleteUser/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setListUser(listUser.filter((tx) => tx.ID_NguoiDung !== id));
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
      const response = await fetch(`http://192.168.31.45:9999/api/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email:email,
          matkhau:matkhau,
          sdt:sdt,
          ten:ten,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Đã xảy ra lỗi khi thêm tuyến xe');
      }
  
      // Xử lý khi thêm thành công
      console.log('Thêm tuyến xe thành công');
      setTen("")
      setEmail("")
      setSdt("")
      setMatKhau("");
      getAllUser();
    } catch (error) {
      console.error('Lỗi:', error);
      // Hiển thị thông báo lỗi cho người dùng
    }
  };
  
  const handleClickOpen = (u) => {
    setOpen(true);
    setUserSua(u);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitSua = async (e) => {
    e.preventDefault();

    const dataChange = {
      email: userSua.Email,
      sdt: userSua.SDT,
      ten: userSua.Ten ,
      matkhau: userSua.MatKhau  
    }


    try {
      const response = await axios.put(`http://192.168.31.45:9999/api/updateUser/${userSua.ID_NguoiDung}`, dataChange); // Thay thế `/api/tuyen-xe/${id}` bằng URL thực tế của API
      if (response.status === 200) {
        console.log('Cập nhật tuyến xe thành công:', response.data);
        getAllUser();
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
      <h2>Thêm người dùng</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên:</label>
          <input
            type="text"
            value={ten}
            onChange={(e) => setTen(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Số điện thoại:</label>
          <input
            type="text"
            value={sdt}
            onChange={(e) => setSdt(e.target.value)}
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input
            type="text"
            value={matkhau}
            onChange={(e) => setMatKhau(e.target.value)}
          />
        </div>
        <button type="submit">Thêm người dùng</button>
      </form>
      </div>

      <div className="tuyen-xe-container">
      <div>
      <h2>Quản lý người dùng</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID người dùng</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Tên</th>
            <th>Mật khẩu</th>
            <th>Quyền</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listUser.map((tx) => (
            <tr key={tx.ID_NguoiDung}>
              <td>{tx.ID_NguoiDung}</td>
              <td>{tx.Email}</td>
              <td>{tx.SDT}</td>
              <td>{tx.Ten}</td>
              <td>{tx.MatKhau}</td>
              <td>{tx.Ten_Quyen}</td>
              <td>
                <button onClick={() => handleClickOpen(tx)}>Sửa</button>
                <button onClick={() => handleDelete(tx.ID_NguoiDung)}>Xóa</button>
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
            label="Tên"
            type="text"
            fullWidth
            className={classes.textField}
            value={userSua.Ten}
            onChange={(e) =>
              setUserSua({ ...userSua, Ten: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="diemDi"
            label="Email"
            type="text"
            fullWidth
            className={classes.textField}
            value={userSua.Email}
            onChange={(e) =>
              setUserSua({ ...userSua, Email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="diemDen"
            label="Số điện thoại"
            type="text"
            fullWidth
            className={classes.textField}
            value={userSua.SDT}
            onChange={(e) =>
              setUserSua({ ...userSua, SDT: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="khoangCach"
            label="Mật khẩu"
            type="text"
            fullWidth
            className={classes.textField}
            value={userSua.MatKhau}
            onChange={(e) =>
              setUserSua({ ...userSua, MatKhau: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={(e) => handleSubmitSua(e,userSua.ID_TuyenXe)} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
      </div>
      
    </div>
  );
};

export default PassengerManagement;
