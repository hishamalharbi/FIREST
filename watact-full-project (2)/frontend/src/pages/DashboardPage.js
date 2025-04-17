import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>لوحة التحكم</h1>
      <p>مرحبًا بك في نظام Watact!</p>
      <button onClick={() => navigate('/orders')}>📦 عرض الطلبات</button>
    </div>
  );
}

export default DashboardPage;
