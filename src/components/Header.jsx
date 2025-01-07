import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <h1 style={styles.title}>Xe Khách Tuấn Trung</h1>
      </div>
      <div style={styles.right}>
        <span style={styles.profile}>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            style={styles.profileImage}
          />
          <span style={styles.profileName}>Admin</span>
        </span>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    width: "100%",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    position: 'fixed',
    top: 0,
    left: '0',
    right: 0,
    zIndex: 1000,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
  menuButton: {
    fontSize: '24px',
    marginRight: '10px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    outline: 'none',
    transition: 'transform 0.2s ease',
  },
  menuButtonHover: {
    transform: 'scale(1.1)',
  },
  right: {
    width: '250px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  icon: {
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  iconHover: {
    color: '#ffeb3b',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  profileImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid #fff',
  },
  profileName: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#fff',
  },
};

export default Header;
