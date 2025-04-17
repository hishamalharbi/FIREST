import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/orders/merchant')
      .then(res => setOrders(res.data))
      .catch(err => console.error('خطأ في جلب الطلبات:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📦 قائمة الطلبات</h2>
      {orders.length === 0 ? (
        <p>لا توجد طلبات حالياً.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>المنتج</th>
              <th>الكمية</th>
              <th>الإجمالي</th>
              <th>الحالة</th>
              <th>العنوان</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order.items[0]?.product?.name || 'غير معروف'}</td>
                <td>{order.items[0]?.quantity}</td>
                <td>{order.total} ريال</td>
                <td>{order.status}</td>
                <td>{order.shippingAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrdersPage;
