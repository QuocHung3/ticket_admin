import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Đăng ký font
Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/Roboto/Roboto-Regular.ttf' },  // Đảm bảo đường dẫn đúng
    { src: '/Roboto/Roboto-Bold.ttf', fontWeight: 'bold' },  // Font đậm
  ],
});

// Định nghĩa style cho PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
    fontSize: 12,
    backgroundColor: '#f4f4f9', // Màu nền nhẹ nhàng
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#2d3e50', // Màu chính
    fontWeight: 'bold',
    borderBottom: '2px solid #2d3e50', // Đường viền dưới
    paddingBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#2d3e50',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
  },
  label: {
    fontWeight: 'bold',
    color: '#2d3e50',
  },
  text: {
    fontFamily: 'Roboto',
    color: '#333',
  },
  footer: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 10,
    color: '#888',
  },
  logo: {
    width: 120,
    marginBottom: 20,
  },
});

// Component PDFDocument để tạo nội dung PDF
const ExportTicket = ({ ticket }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Nhà Xe Tuấn Trung</Text>
        <Text style={styles.subtitle}>Thông Tin Vé Xe</Text>
      </View>
      
      <View style={styles.section}>
        <Text>
          <Text style={styles.label}>Mã vé: </Text>
          {ticket.id}
        </Text>
      </View>

      <View style={styles.section}>
        <Text>
          <Text style={styles.label}>Tên khách hàng: </Text>
          {ticket.name}
        </Text>
      </View>

      <View style={styles.section}>
        <Text>
          <Text style={styles.label}>Số điện thoại: </Text>
          {ticket.phone}
        </Text>
      </View>

      <View style={styles.section}>
        <Text>
          <Text style={styles.label}>Chuyến: </Text>
          {ticket.trip}
        </Text>
      </View>

      <View style={styles.section}>
        <Text>
          <Text style={styles.label}>Ghế: </Text>
          {ticket.seat}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>&copy; 2025 Nhà Xe Tuấn Trung | Địa chỉ: Số 1, Đường ABC, Thành phố XYZ</Text>
      </View>
    </Page>
  </Document>
);

export default ExportTicket;
