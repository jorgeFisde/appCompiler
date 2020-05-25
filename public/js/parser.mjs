import { scannerResult, scanner, consultaRealizada } from './scannerLex.mjs'
import analisis_semantico from './semantico.mjs'
const table = document.getElementById('table')
const button = document.getElementById('ejecutar')
const rest = document.querySelector('.rest')
const terminal = document.getElementById('text_terminal')
// REGLAS ANALIXZADOR LEXICO-----------------------------------------------------------------------------
const reglas = [
    ['CREATE', 'DATABASE', 'ID', 'FIN_SENTENCIA'],
    ['CREATE', 'DATABASE', 'IF', 'NOT', 'EXISTS', 'ID', 'FIN_SENTENCIA'],
    ['CREATE', 'TABLE', 'ID', 'SEP_A', 'ID', 'VARIABLE', 'SEP_B', 'FIN_SENTENCIA'],
    ['SELECT', 'ID', 'FROM', 'ID', 'FIN_SENTENCIA'],
    ['SELECT', 'ID', 'FROM', 'ID', 'WHERE', 'ID', 'COMPARACION', 'ID', 'FIN_SENTENCIA'],
    ['INSERT', 'INTO', 'ID', 'SEP_A', 'ID', 'SEP_B', 'VALUE', 'SEP_A', 'PARAMETRO', 'SEP_B', 'FIN_SENTENCIA'],
    ['DROP', 'DATABASE', 'IF', 'EXISTS', 'ID', 'FIN_SENTENCIA'],
    ['USE', 'ID', 'FIN_SENTENCIA']
]
function find_error(str_err, element, valorEsp, tipo_de_error, err, msg) {
    console.log('find error');
    const row = str_err.split('\n')
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
                for (let k = 0; k < baul.length; k++) {
                    const wk = baul[k];
                    //    console.log(wk, element[k]);
                    //    console.log('--------------------');


                    if (wk == element[k]) {
                        if (err == true) {
                            terminal.className = 'terminal_error'
                            terminal.innerHTML = `--> Error: hay un error ${tipo_de_error} en '${element}'\nLinea: ${r + 1}\nEsperaba un tipo ${valorEsp}\n${msg}&#9608;`
                        } else {
                            terminal.className = 'terminal_error'
                            terminal.innerHTML = `--> Error: hay un error ${tipo_de_error} en '${element}'\nLinea: ${r + 1}\nEsperaba un tipo ${valorEsp}&#9608;`
                        }
                    } else {
                        if (element.length == 1) {
                            if (err == true) {
                                terminal.className = 'terminal_error'
                                terminal.innerHTML = `--> Error: hay un error ${tipo_de_error} en '${element}'\nLinea: ${r + 1}\nEsperaba un tipo ${valorEsp}\n${msg}&#9608;`
                            } else {
                                terminal.className = 'terminal_error'
                                terminal.innerHTML = `--> Error: hay un error ${tipo_de_error} en '${element}'\nLinea: ${r + 1}\nEsperaba un tipo ${valorEsp}&#9608;`
                            }
                        } else {
                            continue
                        }

                    }
                }
            }
        }
    }
}
function verificacionDeError(scannerResult, data, st, verfy) {
    console.log('entre en nueva funcion');

    var index = 0, aux = 0
    while (index < data.length) {/*iteracion de cada una de las reglas */
        const element = data[index];
        if (element != scannerResult[aux].tipo) {/*Si la palabra no coincide hay error y entra en if */
            find_error(st, scannerResult[aux].valor, data[index], 'sintactico',false)
            console.log(element, scannerResult[aux].tipo);
            console.log('no son iguales', scannerResult[aux], aux);
            break
        } else {
            if (index == data.length - 1) {/* si llega hasta el final del while quiere decir que todo coincidio y no hay error */
                console.log('machind');

                return verfy = true

            }
        }

        index++
        aux++
    }
}

button.addEventListener('click', () => {
    terminal.innerHTML = ''
    scannerResult.length = 0
    const regex = /;$/
    const st = document.getElementById('textArea').value
    if (regex.test(st)) {
        scanner(st, st)
        console.log(scannerResult);
        var index_de_error
        var error_lexico
        scannerResult.forEach(element => {
            const comprobacion = element.tipo.split(' ')

            if (comprobacion[0] == 'Error_lexico_en_linea') {
                index_de_error = comprobacion[1]
                error_lexico = true

            }
        });
        if (error_lexico == undefined) {
            var verfy = false, entro = false, where
            where = scannerResult.find(element => element.tipo == 'WHERE')
            console.log(where);

            reglas.forEach((data, i, reg) => {
                if (data.length == scannerResult.length && data[0] == scannerResult[0].tipov && !entro) {/*Entra si coincide el tamaño de los arreglos siendo mas facil analizarlos */
                    console.log('primer if');

                    entro = true
                    verfy = verificacionDeError(scannerResult, data, st, verfy)


                }
                if (scannerResult[1].tipo == 'TABLE' && data[1] == 'TABLE' && !entro) {/*Entra si la segnda palabra de scannerResut es TABLE */
                    console.log('segundo if');

                    entro = true
                    var index = 0, aux = 0
                    while (index < data.length) {
                        const element = data[index];
                        //console.log(element, scannerResult[aux].tipo);
                        if (scannerResult[aux].tipo == 'VARIABLE') {
                            //console.log('-------encontre var');

                            index = 5
                            aux++
                            continue

                        }
                        if (scannerResult[1].tipo == 'TABLE' && scannerResult[aux].tipo == 'NOT') {
                            // console.log('---------encontre not');


                            while (scannerResult[index].tipo != 'ID') {
                                index--
                            }
                            aux++
                            continue
                        }
                        if (scannerResult[1].tipo == 'TABLE' && ((scannerResult[aux].tipo == 'SEP_A' && scannerResult[aux - 1].tipo == 'VARIABLE') || scannerResult[aux].tipo == 'NUMBER' || (scannerResult[aux].tipo == 'SEP_B' && scannerResult[aux - 1].tipo == 'NUMBER'))) {
                            // console.log('---------encontre', scannerResult[aux].tipo);

                            index = 5
                            aux++
                            continue
                        }
                        if (scannerResult[1].tipo == 'TABLE' && (scannerResult[aux].tipo == 'SEP_B' && aux == scannerResult.length - 2)) {


                            index += 2
                            aux++
                            continue
                        }
                        if (scannerResult[aux].tipo == 'COMA') {
                            // console.log('--------encontre ,');

                            index = 4
                            aux++
                            continue
                        }
                        if (element != scannerResult[aux].tipo) {
                            // terminal.className = 'terminal_error'
                            // terminal.innerHTML = `--> Error: hay un error de sintaxis en: '${scannerResult[aux].valor}'&#9608;`
                            //find_error(st, scannerResult[aux].valor)
                            verfy = verificacionDeError(scannerResult, data, st, verfy)
                            // console.log(element, scannerResult[aux].tipo);
                            // console.log('no son iguales', scannerResult[aux], aux);
                            break
                        } else {
                            if (index == data.length - 1) {
                                verfy = true
                            }
                        }

                        index++
                        aux++
                    }
                }
                if (scannerResult[0].tipo == 'SELECT' && data[0] == 'SELECT' && where == undefined && !entro) {/*Entra si la primera palabra de scannerResult es SELECT */
                    console.log('tercer if');

                    entro = true
                    var index = 0, aux = 0
                    while (index < data.length) {
                        const element = data[index]
                        if (scannerResult[aux].tipo == 'COMA') {
                            index = 1
                            aux++
                            continue
                        }
                        if (scannerResult[aux].valor == '*') {
                            index++
                            aux++
                            continue
                        }

                        if (element != scannerResult[aux].tipo) {
                            verfy = verificacionDeError(scannerResult, data, st, verfy)
                            console.log(element, scannerResult[aux].tipo);
                            console.log('no son iguales', scannerResult[aux], aux);
                            break
                        } else {
                            if (index == data.length - 1) {
                                verfy = true
                            }
                        }

                        index++
                        aux++
                    }

                }
                if (scannerResult[0].tipo == 'INSERT' && data[0] == 'INSERT' && !entro) { /*Entra si la primera palabra de scannerResult es INSERT */
                    console.log('cuarto if');

                    entro = true
                    var index = 0, aux = 0
                    while (index < data.length) {
                        const element = data[index]
                        if (scannerResult[aux].tipo == 'COMA' && data[index - 1] != 'SEP_B') {
                            console.log('--------encontre ,');

                            index--
                            aux++
                            continue
                        }
                        if (scannerResult[aux].tipo == 'COMA' && data[index - 1] == 'SEP_B') {
                            console.log('--------encontre , machin');

                            index = 7
                            aux++
                            continue
                        }


                        if ((scannerResult[aux].tipo == 'STRING' || scannerResult[aux].tipo == 'NUMBER' || scannerResult[aux].tipo == 'DOUBLE')) {
                            //console.log('--------encontre ,');

                            index++
                            aux++
                            continue
                        }

                        if (element != scannerResult[aux].tipo) {
                            // terminal.className = 'terminal_error'
                            // terminal.innerHTML = `--> Error: hay un error de sintaxis en: '${scannerResult[aux].valor}'&#9608;`
                            //find_error(st, scannerResult[aux].valor)
                            verfy = verificacionDeError(scannerResult, data, st, verfy)
                            console.log(element, scannerResult[aux].tipo);
                            console.log('no son iguales', scannerResult[aux], aux);
                            break
                        } else {
                            if (index == data.length - 1) {
                                verfy = true
                            }
                        }

                        index++
                        aux++
                    }
                }
                if (scannerResult[0].tipo == 'SELECT' && data[0] == 'SELECT' && data[4] == 'WHERE' && where && !entro) {
                    entro = true
                    var index = 0, aux = 0
                    while (index < data.length) {
                        const element = data[index]
                        if (scannerResult[aux].tipo == 'COMA' && data[index] == 'FROM') {
                            index = 1
                            aux++
                            continue
                        }
                        if (scannerResult[aux].tipo == 'COMA' || scannerResult[aux].tipo == 'OR' || scannerResult[aux].tipo == 'AND') {
                            index = index - 3
                            aux++
                            continue
                        }
                        if (scannerResult[aux].tipo == 'INT' || scannerResult[aux].tipo == 'STRING') {
                            index++
                            aux++
                            continue
                        }
                        if (scannerResult[aux].valor == '*') {
                            index++
                            aux++
                            continue
                        }

                        if (element != scannerResult[aux].tipo) {
                            verfy = verificacionDeError(scannerResult, data, st, verfy)
                            console.log(element, scannerResult[aux].tipo);
                            console.log('no son iguales', scannerResult[aux], aux);
                            break
                        } else {
                            if (index == data.length - 1) {
                                verfy = true
                            }
                        }

                        index++
                        aux++
                    }
                }
            })
            if (!entro) {
                console.log('hola');

                var almacen = [], almacenDos
                reglas.forEach(data => {
                    almacenDos = []

                    scannerResult.forEach(element => {
                        if (data.includes(element.tipo)) {// si adentro del resultado del escanner esta la palabra buscada se aagrega a array
                            almacenDos.push(element.tipo)
                        }
                    });
                    almacen.push(almacenDos.length)
                })

                var aux2 = almacen.indexOf(Math.max.apply(null, almacen))

                verfy = verificacionDeError(scannerResult, reglas[aux2], st, verfy)

            }
        } else {
            terminal.className = 'terminal_error'
            terminal.innerHTML = `--> Error lexico en linea ${index_de_error}`
        }
    } else {

        alert('Asegurate de escribir el final de la sentencia ";"')
    }

    if (consultaRealizada) {
        rest.className = 'noRest'
        table.innerHTML = `
    <tr>
        <th>Token</th>
        <th>Tipo</th>
    </tr>
    `
        scannerResult.forEach(data => {
            table.innerHTML += `
        <tr>
            <td>${data.valor}</td>
            <td>${data.tipo}</td>
        </tr>
        `
        })
    }
    if (verfy) {
        // AQUI INICIA EL ANALIZADOR SEMANTICO
        console.log('-> Ejecucion realizada con exito del anaizador sintactico!');

        const semantico = analisis_semantico(scannerResult, terminal)
        if (semantico.isError == true) {
            find_error(st, semantico.element, semantico.valorEsp, semantico.tipo_Error, semantico.isError, semantico.msg)
        } else {
            terminal.className = 'terminal_no_error'
            terminal.innerHTML = '--> Ejecucion realizada con exito&#9608;'
        }

    }


})



