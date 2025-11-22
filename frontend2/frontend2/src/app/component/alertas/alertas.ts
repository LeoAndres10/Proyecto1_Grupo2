import Swal from "sweetalert2"
const alertaSuccess = (mensaje: any) => {
    Swal.fire({
        title: mensaje,
        icon: 'success'
    })
}

const alertaError = (mensaje: any) => {
    Swal.fire({
        title: mensaje,
        icon: 'error'
    })
}

const alertaWarning = (mensaje: any, id = '') => {

    Swal.fire({
        title: mensaje,
        icon: 'warning'
    })
}


export {
    alertaSuccess,
    alertaError,
    alertaWarning,
}