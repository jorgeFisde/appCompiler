const tArea = document.querySelector('#textArea')
const linea = document.querySelector('#numLinea')
const parrafos = []
var index


tArea.addEventListener('keydown', (e) => {
    index = tArea.value.split(/\r*\n/).length
    // console.log('hola 1');
    
    // console.log(index);
    linea.innerHTML = ''
    for (let i = 0; i < index; i++) {
        linea.innerHTML += `<pre>${i + 1}</pre>`
    }
    if (e.key == 'Enter') {
        linea.innerHTML = ''
        for (let i = 0; i < index ; i++) {
            linea.innerHTML += `<pre>${i + 1}</pre>`
        }
    }
    if (e.key == 'Backspace') {
        linea.innerHTML = ''
        for (let i = 0; i < index; i++) {
            linea.innerHTML += `<pre>${i + 1}</pre>`
        }
    }
})

tArea,addEventListener('keyup',(e)=>{
    //console.log('hola 2');
    
    index = tArea.value.split(/\r*\n/).length
    linea.innerHTML = ''
    for (let i = 0; i < index; i++) {
        linea.innerHTML += `<pre>${i + 1}</pre>`
    }
})

// window.addEventListener('scroll', () => {
//     var scroll = window.scrollY
//     if (scroll > 50) {
//         if (document.querySelector('.navigationBar') != undefined) {
//             document.querySelector('.navigationBar').className = 'navigationBarFixed'
//             document.querySelector('.info').className = 'infoFixed'
//         }
//     } else {
//         if (document.querySelector('.navigationBarFixed') != undefined) {
//             document.querySelector('.navigationBarFixed').className = 'navigationBar'
//             document.querySelector('.infoFixed').className = 'info'
//         }
//     }
// })

// document.getElementById('hola').addEventListener('click', (e) => {
//     e.preventDefault
//     window.scroll(0, document.documentElement.clientHeight)
// })