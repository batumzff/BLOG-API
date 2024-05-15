const myDebounce = (func,delay) => {
    let timer
    return(...args) => {
        clearTimeout(timer)

      timer = setTimeout(() => func(...args),delay ) 
    }
}

export default myDebounce