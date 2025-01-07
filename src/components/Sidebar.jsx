import React, { useState } from 'react';

const Sidebar = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.logo}>DANH MỤC</h3>
      <ul style={styles.menu}>
        <li style={styles.menuItem}>
          <a href="/" style={styles.menuLink}>Tổng Quan</a>
        </li>
        <li style={styles.menuItem}>
          <div
            onClick={toggleSubMenu}
            style={{ ...styles.menuLink, cursor: 'pointer' }}
          >
            Danh Mục
          </div>
            <ul style={styles.subMenu}>
              <li style={styles.subMenuItem}>
                <a href="/route-management" style={styles.subMenuLink}>Quản lý tuyến đi</a>
              </li>
              <li style={styles.subMenuItem}>
                <a href="/ticket-management" style={styles.subMenuLink}>Quản lý chuyến xe</a>
              </li>
              <li style={styles.subMenuItem}>
                <a href="/car-management" style={styles.subMenuLink}>Quản lý loại xe</a>
              </li>
              <li style={styles.subMenuItem}>
                <a href="/passenger-management" style={styles.subMenuLink}>Quản lý người dùng</a>
              </li>
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
    background: '#2e3b4e',
    color: '#fff',
    minHeight: '100vh',
    width: '250px',
    padding: '20px',
    position: 'fixed',
    top: '0',
    left: '0',
    fontFamily: 'Arial, sans-serif',
  },
  logo: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '22px',
    fontWeight: 'bold',
  },
  menu: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
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
    transition: 'background 0.3s ease',
  },
  menuLinkHover: {
    background: '#54667a',
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
    background: '#475a6d',
    color: '#fff',
  },
};

export default Sidebar;
