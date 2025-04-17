import React from 'react';

function LoginPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>تسجيل الدخول</h1>
      <form>
        <div>
          <label>البريد الإلكتروني:</label><br />
          <input type="email" name="email" />
        </div>
        <div>
          <label>كلمة المرور:</label><br />
          <input type="password" name="password" />
        </div>
        <button type="submit">دخول</button>
      </form>
    </div>
  );
}

export default LoginPage;
