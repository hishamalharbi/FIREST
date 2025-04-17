import React from 'react';

function LoginPage() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>تسجيل الدخول</h2>
      <input placeholder="البريد الإلكتروني" style={{ margin: '10px' }} /><br />
      <input type="password" placeholder="كلمة المرور" style={{ margin: '10px' }} /><br />
      <button>دخول</button>
    </div>
  );
}

export default LoginPage;
