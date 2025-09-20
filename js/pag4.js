document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('premiumForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombreValido = ValidarNombre();
        const apellidoValido = ValidarApellido();
        const emailValido = ValidarCorreo();
        const tarjetaValido = ValidarTarjeta();
        const vencimientoValido = ValidarVencimiento();
        const cvvValido = ValidarCVV();
        const planvalido = ValidarPlan();

        if (nombreValido && apellidoValido && emailValido && tarjetaValido && vencimientoValido && cvvValido && planvalido) {
            GuardarLocalStorage();
            MostrarExito();
        }
    });

    // Validaciones
    function ValidarNombre() {
        const nombre = document.getElementById('nombre').value.trim();
        const error = document.getElementById('error-nombre');
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
        if (nombre === '') {
            error.textContent = "Ingrese Nombre";
            return false;
        } else if (!regex.test(nombre)) {
            error.textContent = "Debe contener al menos 3 letras";
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }

    function ValidarApellido() {
        const apellido = document.getElementById('apellido').value.trim();
        const error = document.getElementById('error-apellido');
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
        if (apellido === '') {
            error.textContent = "Ingrese Apellido";
            return false;
        } else if (!regex.test(apellido)) {
            error.textContent = "Debe contener al menos 3 letras";
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }

    function ValidarCorreo() {
        const correo = document.getElementById('correo').value.trim();
        const error = document.getElementById('error-correo');
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (correo === '') {
            error.textContent = "Ingrese correo";
            return false;
        } else if (!regex.test(correo)) {
            error.textContent = "Formato inválido";
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }

    function ValidarTarjeta() {
        const tarjeta = document.getElementById('tarjeta').value.trim();
        const error = document.getElementById('error-tarjeta');
        const regex = /^\d{16}$/;
        if (tarjeta === '') {
            error.textContent = "Ingrese número de tarjeta";
            return false;
        } else if (!regex.test(tarjeta.replace(/\s/g, ''))) {
            error.textContent = "Debe tener 16 dígitos";
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }

    function ValidarVencimiento() {
        const vencimiento = document.getElementById('vencimiento').value;
        const error = document.getElementById('error-vencimiento');
        if (vencimiento === '') {
            error.textContent = "Ingrese fecha de vencimiento";
            return false;
        } else {
            const hoy = new Date();
            const [anio, mes] = vencimiento.split('-');
            const fechaVenc = new Date(anio, mes - 1);
            if (fechaVenc < hoy) {
                error.textContent = "La tarjeta está vencida";
                return false;
            } else {
                error.textContent = '';
                return true;
            }
        }
    }

    function ValidarCVV() {
        const cvv = document.getElementById('cvv').value.trim();
        const error = document.getElementById('error-cvv');
        const regex = /^\d{3,4}$/;
        if (cvv === '') {
            error.textContent = "Ingrese CVV";
            return false;
        } else if (!regex.test(cvv)) {
            error.textContent = "CVV inválido";
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }

    function ValidarPlan() {
        const plan = document.getElementById('plan').value;
        const error = document.getElementById('error-plan');
        if (plan === '') {
            error.textContent = "Seleccione un plan";
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }

    // Guardar datos en localStorage
    function GuardarLocalStorage() {
        const datos = {
            nombre: document.getElementById('nombre').value.trim(),
            apellido: document.getElementById('apellido').value.trim(),
            correo: document.getElementById('correo').value.trim(),
            tarjeta: document.getElementById('tarjeta').value.trim(),
            vencimiento: document.getElementById('vencimiento').value,
            cvv: document.getElementById('cvv').value.trim(),
            plan: document.getElementById('plan').value
        };
        localStorage.setItem('pagoPremium', JSON.stringify(datos));
    }

    // Mostrar mensaje de éxito
    function MostrarExito() {
        const mensajeExitoso = document.getElementById('success-message');
        mensajeExitoso.textContent = 'Pago realizado con éxito';
        mensajeExitoso.style.display = "block";

        form.reset();
        document.querySelectorAll('.error').forEach(e => e.textContent = "");
    }

    // Eventos
document.getElementById('nombre').addEventListener('blur', ValidarNombre);
document.getElementById('nombre').addEventListener('input', ValidarNombre);

document.getElementById('apellido').addEventListener('blur', ValidarApellido);
document.getElementById('apellido').addEventListener('input', ValidarApellido);

document.getElementById('correo').addEventListener('blur', ValidarCorreo);
document.getElementById('correo').addEventListener('input', ValidarCorreo);

document.getElementById('tarjeta').addEventListener('blur', ValidarTarjeta);
document.getElementById('tarjeta').addEventListener('input', ValidarTarjeta);

document.getElementById('cvv').addEventListener('blur', ValidarCVV);
document.getElementById('cvv').addEventListener('input', ValidarCVV);

document.getElementById('vencimiento').addEventListener('blur', ValidarVencimiento);

document.getElementById('plan').addEventListener('blur', ValidarPlan);
document.getElementById('plan').addEventListener('change', ValidarPlan);

});