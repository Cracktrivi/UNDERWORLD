document.addEventListener('DOMContentLoaded', () => {
  const cuerpo = document.querySelector('.carrito-tabla tbody');

  function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cuerpo.innerHTML = '';

    carrito.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.nombre}</td>
        <td class="precio" data-precio="${item.precio}">€${item.precio.toFixed(2)}</td>
        <td>
          <input class="cantidad" type="number" min="1" value="${item.cantidad}">
        </td>
        <td class="subtotal">€0.00</td>
      `;
      cuerpo.appendChild(tr);
    });
  }

  function actualizarTotales() {
    const filas = document.querySelectorAll('.carrito-tabla tbody tr');
    let total = 0;

    filas.forEach(fila => {
      const precioCelda = fila.querySelector('.precio');
      const cantidadInput = fila.querySelector('.cantidad');
      const subtotalCelda = fila.querySelector('.subtotal');

      const precio = parseFloat(precioCelda.dataset.preco || precioCelda.dataset.precio);
      const cantidad = parseInt(cantidadInput.value) || 0;
      const subtotal = precio * cantidad;

      subtotalCelda.textContent = `€${subtotal.toFixed(2)}`;
      total += subtotal;
    });

    document.getElementById('total-carrito').textContent = `€${total.toFixed(2)}`;
  }

  function guardarCantidades() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const filas = document.querySelectorAll('.carrito-tabla tbody tr');

    filas.forEach((fila, index) => {
      const cantidadInput = fila.querySelector('.cantidad');
      if (carrito[index]) {
        carrito[index].cantidad = parseInt(cantidadInput.value) || 1;
      }
    });

    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function continuarCompra() {
    window.location.href = 'index.html';
  }

  function vaciarCarrito() {
    localStorage.removeItem('carrito');
    cuerpo.innerHTML = '';
    document.getElementById('total-carrito').textContent = '€0.00';
  }

  
  cargarCarrito();
  actualizarTotales();

  
  cuerpo.addEventListener('input', e => {
    if (e.target.classList.contains('cantidad')) {
      actualizarTotales();
      guardarCantidades();
    }
  });

  // Botones
  document.querySelector('.continuar').addEventListener('click', continuarCompra);
  document.querySelector('.vaciar').addEventListener('click', vaciarCarrito);
});
