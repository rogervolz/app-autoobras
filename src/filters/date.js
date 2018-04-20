export default (value) => {
    const date = new Date(value)
    return date.toLocaleString(['pt-br'],{month:'short', day:'2-digit', year:'numeric', hour:'2-digit',minute:'2-digit',}) // não suportado em todos os browsers
}