import React from 'react';
import Charts from './Charts';

const Dashboard = () => {
  return (
    <div style={{ marginLeft: '250px', marginTop: '80px', padding: '20px' }}>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>0 Đơn Hàng</h3>
          <p>Số lượng đơn hàng trong quý</p>
        </div>
        <div style={styles.card}>
          <h3>0 Triệu</h3>
          <p>Tổng Doanh Thu trong quý</p>
        </div>
      </div>
      <Charts />
    </div>
  );
};

const styles = {
  cardContainer: {
    display: 'flex',
    gap: '20px',
  },
  card: {
    background: '#f8f9fa',
    borderRadius: '5px',
    padding: '20px',
    flex: '1',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
};

export default Dashboard;
