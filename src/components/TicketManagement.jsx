import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TicketManagement = () => {
  const [idTuyen, setIdTuyen] = useState(null);
  const [idTaiXe, setIdTaiXe] = useState(null);
  const [idXe, setIdXe] = useState(null);
  const [listTuyenXe, setListTuyenXe] = useState([]);
  const [listChuyenXe, setListChuyenXe] = useState([]);
  const [listTaiXe,setListTaiXe] = useState([]);
  const [listXe,setListXe] = useState([]);

  const [ngaydi, setNgaydi] = useState("");
  const [ngayden, setNgayden] = useState("");
  const [giodi, setGiodi] = useState("");
  const [gioden, setGioden] = useState("");

  const [startDateD, setStartDateD] = useState(new Date());
  const [startDateV, setStartDateV] = useState(new Date());

  const handleChange = (event) => {
    setIdTuyen(event.target.value);
  };

  const handleChangeTX = (event) => {
    setIdTaiXe(event.target.value);
  };

  const handleChangeXe = (event) => {
    setIdXe(event.target.value);
  };

  useEffect(()=> {
    getAllTuyenXe();
    getAllTaiXe();
    getAllXe();
  },[])


  useEffect(()=> {
    getChuyenTheoTuyen();
  },[idTuyen])

  useEffect(()=> { 
    setNgaydi(() => `${startDateD.getFullYear()}-${startDateD.getMonth() + 1}-${startDateD.getDate()}`);
  },[startDateD])

  useEffect(()=> {
    setNgayden(() => `${startDateV.getFullYear()}-${startDateV.getMonth() + 1}-${startDateV.getDate()}`);
  },[startDateV])

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

  const getChuyenTheoTuyen = async () => {
    try {
      await axios.post('http://192.168.31.45:9999/api/getChuyenTheoTuyen',{id:idTuyen})
      .then(response => {
        if(response && response.data) {
          setListChuyenXe(response.data.data)
        }
      })
      .catch(error => {
        setListChuyenXe([])
        console.log("không có chuyến nào");
      });
    } catch (error) {
      console.log("không có chuyến nào");
    }
  }


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
          ngaydi,
          ngayden,
          giodi,
          gioden,
          id_xe: idXe,
          id_tuyenxe: idTuyen,
          id_taixe: idTaiXe
        }),
      });
  
      if (!response.ok) {
        throw new Error('Đã xảy ra lỗi khi thêm chuyen xe');
      }
  
      // Xử lý khi thêm thành công
      console.log('Thêm chuyến xe thành công');
      setIdTuyen(null)
      setIdTaiXe(null)
      setIdXe(null)
      setNgaydi("")
      setNgayden("")
      setGiodi("null")
      setGioden("null")
    } catch (error) {
      console.error('Lỗi:', error);
      // Hiển thị thông báo lỗi cho người dùng
    }
  };

  console.log({idTuyen,idTaiXe,idXe})

  return (
    <div style={{ marginLeft: '250px', marginTop: '80px', padding: '20px' }}>
      <div style={{display: "flex",justifyContent:'space-between'}}>
        <div>
        <h2>Quản lý chuyến xe</h2>
        <select value={idTuyen} onChange={handleChange}>
          {listTuyenXe.map((option) => (
            <option key={option.ID_TuyenXe} value={option.ID_TuyenXe}>
              {option.TenTuyenXe}
            </option>
          ))}
        </select>
      </div>
      <div>
      <form onSubmit={handleSubmit}>
          <div>
            <label>Ngày đi:</label>
            <DatePicker
              selected={startDateD}
              onChange={(date) => setStartDateD(date)}
              selectsStart
              startDate={startDateD}
              endDate={null}
            />  
          </div>
          <div>
            <label>Ngày đến:</label>
            <DatePicker
              selected={startDateV}
              onChange={(date) => setStartDateV(date)}
              selectsStart
              startDate={startDateV}
              endDate={null}
            />
          </div>
          <div>
            <label>Giờ đi:</label>
            <input aria-label="Time" type="time" value={giodi} onChange={(e)=> setGiodi(e.target.value)}/>
          </div>
          <div>
            <label>Giờ đến:</label>
            <input aria-label="Time" type="time" value={gioden} onChange={(e)=> setGioden(e.target.value)}/>
          </div>
            <label>Tài xế:</label>
              <select value={idTaiXe} onChange={handleChangeTX}>
              {listTaiXe.map((option) => (
                <option key={option.ID_TaiXe} value={option.ID_TaiXe}>
                  {option.TenTaiXe}
                </option>
              ))}
            </select>
            <label>Xe: </label>
            <select value={idXe} onChange={handleChangeXe}>
              {listXe.map((option) => (
                <option key={option.ID_Xe} value={option.ID_Xe}>
                  {option.SoXe}
                </option>
              ))}
            </select>
          <button type="submit">Thêm chuyến xe</button>
        </form>
        
        </div>
    </div>
      
    

    <div className="tuyen-xe-container">
      <table>
        <thead>
          <tr>
            <th>ID Tuyến Xe</th>
            <th>Tên Tuyến Xe</th>
            <th>Điểm Đi</th>
            <th>Ngày Đi</th>
            <th>Giờ Đi</th>
            <th>Ghế Còn Trống</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {listChuyenXe && listChuyenXe.map((tx) => (
            <tr key={tx.ID_TuyenXe}>
              <td>{tx.ID_TuyenXe}</td>
              <td>{tx.TenTuyenXe}</td>
              <td>{tx.DiemDi}</td>
              <td>{tx.NgayDi}</td>
              <td>{tx.GioDi}</td>
              <td>{tx.GheConTrong}</td>
              <td>
                {/* <button onClick={() => handleClickOpen(tx)}>Sửa</button>
                <button onClick={() => handleDelete(tx.ID_TuyenXe)}>Xóa</button> */}
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
