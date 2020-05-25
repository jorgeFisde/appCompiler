import token from './tokens.js'
var consultaRealizada = false
var scannerResult = []

var bull
var verify = false
function scanner(string, second) {
    consultaRealizada = false
    string = string.trim()
    string = string.replace(/\s{2,}/g, " ")
    string = string.replace(/\r*\n/g, ' ')
    const number = /^[0-9]+$/
    const double = /^[0-9]+\.[0-9]+$/
    const varchar = /^\'[a-z]+\'$/
    var query = string.split(' ')
    for (let i = 0; i < query.length; i++) {
        verify = false
        var element = query[i];
        bull = false
        var cajon = element.split('')
        var size = cajon.length
        for (let j = 0; j < size; j++) {
            const letter = cajon[j]
            if ( !number.test(letter[0]) || (number.test(letter[0]) && !number.test(letter[size - 1]) ) ) {
                if (size != 1) {
                    var rec = token.operadores.find(data => data.valor == letter)
                    var rec2 = token.separadores.find(data => data.valor == letter)
                    if ((rec != undefined && cajon[j - 1] != ' ' && size != 1) || (rec2 != undefined && cajon[j - 1] != ' ' && size != 1)) {
                        size = size + 2
                        cajon.splice(j, 0, ' ')
                        cajon.splice(j + 2, 0, ' ')
                    }
                    if (j == size - 1) {
                        // console.log('cajon =', cajon);
                        var newBox = cajon.join('').trim().replace(/\s{2,}/g, " ")
                        newBox = newBox.split(' ')
                        element = newBox[0]
                        for (let j = 0; j < newBox.length; j++) {
                            const element = newBox[j];

                            if (j == 0) {
                                query.splice(i + j, 1, element)
                            } else {
                                query.splice(i + j, 0, element)
                            }
                        }
                    }
                }
            } else {
                if ( number.test(cajon[0]) && !number.test(cajon[size - 1])  ) {
                    bull = true
                }
            }
        }


        if (bull) {
            const row = second.split('\n')
            var baul = []
            if (row != undefined) {
                for (let r = 0; r < row.length; r++) {
                    const element2 = row[r];
                    const dato = element2.split(' ')
                    for (let j = 0; j < dato.length; j++) {
                        var ele = dato[j]
                        ele = ele.trim()
                        ele = ele.replace(/\s{2,}/g, " ")
                        baul = ele.split('')
                        if (baul[baul.length - 1] == ';') {
                            baul.pop()
                            ele = baul.join('')
                        }
                        if (element == ele) {
                            scannerResult.push({
                                valor: element,
                                tipo: `Error_lexico_en_linea ${r + 1}`
                            })
                        }
                    }
                }
                continue
            }
        }
        token.id.find(data => {
            if (data.valor.toUpperCase() === element.toUpperCase()) {
                scannerResult.push(data)
                verify = true
            }
        })
        token.variables.find(data => {
            if (data.valor.toUpperCase() === element.toUpperCase()) {
                scannerResult.push(data)
                verify = true
            }
        })
        token.w_Reseived.find(data => {
            if (data.valor.toUpperCase() === element.toUpperCase()) {
                scannerResult.push(data)
                verify = true
            }
        })
        token.operadores.find(data => {
            if (data.valor.toUpperCase() === element.toUpperCase()) {
                scannerResult.push(data)
                verify = true
            }
        })
        token.separadores.find(data => {
            if (data.valor.toUpperCase() === element.toUpperCase()) {
                scannerResult.push(data)
                verify = true
            }
        })

        if (number.test(element)) {
            scannerResult.push({
                valor: element,
                tipo: 'NUMBER'
            })
            continue
        }
        if (double.test(element)) {
            scannerResult.push({
                valor: element,
                tipo: 'DOUBLE'
            })
            continue
        }
        if (varchar.test(element)) {
            scannerResult.push({
                valor: element,
                tipo: 'STRING'
            })
            continue
        }

        if (verify === false && !number.test(element) && !double.test(element) && !varchar.test(element) ) {
            scannerResult.push({
                valor: element,
                tipo: 'ID',
                inside:undefined,
                typeOf: undefined

            })
            continue
        }
    }
    consultaRealizada = true
}


export {scannerResult,scanner, consultaRealizada}

