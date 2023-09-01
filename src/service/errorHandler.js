export default function axiosErrorHandler(error, errorMessages = null) {
    if (error.response.status in errorMessages) {
        return alert(errorMessages[error.response.status])
    }
    
    return alert('Ocorreu um erro inesperado');
}