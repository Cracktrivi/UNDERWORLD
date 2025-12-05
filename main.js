document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.producto .comprar');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const card = boton.closest('.producto');
      const id = card.dataset.id;
      const nombre = card.dataset.nombre;
      const precio = parseFloat(card.dataset.precio);

      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      const existente = carrito.find(item => item.id === id);
      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));

      const toast = document.getElementById('toast-carrito');
      toast.textContent = `${nombre} añadido al carrito`;
      toast.style.display = 'block';

      setTimeout(() => {
        toast.style.display = 'none';
      }, 2000); 
    });
  });
});
