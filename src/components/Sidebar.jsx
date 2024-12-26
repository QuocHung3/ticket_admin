import React from 'react';

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h3 style={styles.logo}>DANH MỤC</h3>
      <ul style={styles.menu}>
        <li style={styles.menuItem}>
          <a href="/" style={styles.menuLink}>Tổng Quan</a>
        </li>
        <li style={styles.menuItem}>
          <a href="#danh-muc" style={styles.menuLink}>Danh Mục</a>
          <ul style={styles.subMenu}>
            <li style={styles.subMenuItem}><a href="/route-management" style={styles.subMenuLink}>Quản lý tuyến đi</a></li>
            <li style={styles.subMenuItem}><a href="/ticket-management" style={styles.subMenuLink}>Quản lý vé xe</a></li>
            <li style={styles.subMenuItem}><a href="/passenger-management" style={styles.subMenuLink}>Quản lý hành khách</a></li>
          </ul>
        </li>
        <li style={styles.menuItem}>
          <a href="/reports" style={styles.menuLink}>Báo cáo Thống Kê</a>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    background: '#2e3b4e', // Màu nền sidebar
    color: '#fff',
    minHeight: '100vh',
    padding: '20px',
    position: "fixed",
    top: '60px',
    fontFamily: 'Arial, sans-serif',
  },
  logo: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  menu: {
    listStyle: 'none',
    padding: 0,
  },
  menuItem: {
    marginBottom: '15px',
  },
  menuLink: {
    color: '#ffffff',
    textDecoration: 'none',
    display: 'block',
    padding: '10px 15px',
    borderRadius: '5px',
    background: '#394a59',
    transition: 'background 0.3s',
  },
  menuLinkHover: {
    background: '#54667a', // Màu khi hover
  },
  subMenu: {
    listStyle: 'none',
    paddingLeft: '15px',
    marginTop: '10px',
  },
  subMenuItem: {
    marginBottom: '8px',
  },
  subMenuLink: {
    color: '#c5c5c5',
    textDecoration: 'none',
    display: 'block',
    padding: '8px 15px',
    borderRadius: '5px',
    transition: 'color 0.3s, background 0.3s',
  },
  subMenuLinkHover: {
    background: '#475a6d', // Màu hover submenu
    color: '#fff',
  },
};

export default Sidebar;
