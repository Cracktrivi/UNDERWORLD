document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const msg  = document.getElementById('login-msg');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const pass  = document.getElementById('password').value.trim();

    // Demo: usuario fijo. En un proyecto real esto va en el servidor.
    if (email === 'demo@underworld.com' && pass === '1234') {
      localStorage.setItem('usuario', JSON.stringify({ email }));
      msg.textContent = 'Inicio de sesión correcto, redirigiendo...';
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } else {
      msg.textContent = 'Datos incorrectos';
    }
  });
});
