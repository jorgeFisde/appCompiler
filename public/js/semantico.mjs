const identificadores = []
const tablas = [
    /*
    tupla: nombre de la tupla
    valorTupla:{}
    tabla
    */
]
export default function analisis_semantico(tokens) {
    var error = {
        isError: false,
        value: ''
    }, word
    creacion(tokens)
    for (let i = 0; i < tokens.length; i++) {
        var element = tokens[i];
        if ((element.tipo == 'DATABASE' && tokens[i - 1].tipo != 'CREATE') || element.tipo == 'USE') {
            var cont = i
            while (tokens[cont].tipo != 'ID') {
                cont++
            }
            console.log(cont);
            console.log(tokens[cont].typeOf)
            if (tokens[cont].typeOf != 'ID_DATABASE') {
                error = {
                    isError: true,
                    value: 'ID_DATABASE',
                    msg: 'Este valor no ha sido creado'
                }
                word = tokens[cont].valor
                break
            }

            continue
        }
        if (element.tipo == 'SELECT') {
            var okay = false
            var nameT
            for (let i = 0; i < tokens.length; i++) {
                const element2 = tokens[i];
                if (element2.tipo == 'ID' && tokens[i - 1].tipo == 'FROM') {
                    if (element2.typeOf != 'ID_TABLE') {
                        error = {
                            isError: true,
                            value: 'ID_TABLE',
                            msg: 'Este valor no ha sido creado'
                        }
                        word = element2.valor
                        break
                    } else {
                        nameT = element2.valor
                    }

                }
                if (element2.tipo == 'ID' && (tokens[i - 1].tipo != 'FROM')) {
                    if (element2.typeOf != 'VAR_TABLE') {
                        error = {
                            isError: true,
                            value: 'VAR_TABLE',
                            msg: 'Este valor no ha sido creado'
                        }
                        word = element2.valor
                        break
                    }

                }
                if (element2.tipo == 'ID' && tokens[i + 1].tipo == 'COMPARACION' && tokens[i + 2].tipo == 'ID') {
                    console.log('me puedes grtar me puedes odiar luego agradeceras');

                    if (element2.type_v != tokens[i + 2].type_v) {
                        error = {
                            isError: true,
                            value: element2.type_v,
                            msg: 'Los tipos de variables no coinciden'
                        }
                        word = element2.valor
                        break
                    }

                }

                if (i == tokens.length - 1) {
                    okay = true
                }

            }

            var query = document.getElementById('Query')
            const r1 = document.getElementById('tupla')
            if (okay) {
                console.log(tablas);


                tablas.forEach(data => {
                    r1.innerHTML += `
                                    <th>${data.tupla}</th>                        
                            `
                });

                var inter = 0
                while ( tablas[inter].table != nameT ) {
                    inter++
                }

                for (let i = 0; i <= tablas[inter].content_tupla.length; i++) {
                    query.innerHTML += `
                            <tr id="${i}">

                            </tr>
                    `

                    
                }
///                                  ARREGLAR ESTA PUTA VRG
                for (let i = 0; i < tablas.length; i++) {
                    const tab = tablas[i];

                    
                    if (tab.table == nameT) {
                            for (let j = 0; j < tab.content_tupla.length ; j++) {

                                const reng = document.getElementById(`${j}`)
                                console.log(tab.content_tupla[j]);
                                
                                reng.innerHTML += `
                                        <td>${tab.content_tupla[j]}</td>
                                `
                            }
                    }
                }
                
            }
        }
        if (element.tipo == 'INSERT') {
            var cont = i + 1, almacen1 = [], alm2 = [], act

            while (cont <= tokens.length - 1) {// TIENE ERROR LO MARCA COMO INDEFINIDA   insert into user (name, id) value ( 'enrique', 1254 );
                console.log(tokens[cont].tipo, tokens[cont - 1].tipo);

                if (tokens[cont].tipo == 'ID' && tokens[cont - 1].tipo != 'INTO') {
                    almacen1.push(tokens[cont])
                    if (tokens[cont].typeOf != 'VAR_TABLE') {
                        error = {
                            isError: true,
                            value: 'VAR_TABLE',
                            msg: 'Este valor no ha sido creado'
                        }
                        word = tokens[cont].valor
                        act = true
                        break
                    }

                }
                if (tokens[cont].tipo == 'STRING' || tokens[cont].tipo == 'NUMBER' || tokens[cont].tipo == 'DOUBLE') {
                    alm2.push(tokens[cont])
                }
                if (tokens[cont].tipo == 'ID' && tokens[cont - 1].tipo == 'INTO') {
                    if (tokens[cont].typeOf != 'ID_TABLE') {
                        error = {
                            isError: true,
                            value: 'ID_TABLE',
                            msg: 'Este valor no ha sido creado'
                        }
                        word = tokens[cont].valor
                        act = true
                        break
                    }
                }

                cont++
            }
            if (act) {
                break
            }
            if (almacen1.length != alm2.length) {
                console.log(almacen1);
                console.log(alm2);


                error = {
                    isError: true,
                    value: 'MISMO_TAMAÑO',
                    msg: 'los numeros de valores no coinciden'
                }
                word = 'tamaños'
                break
            } else {
                for (let i = 0; i < almacen1.length; i++) {
                    const ment = almacen1[i];
                    if (ment.type_v.toUpperCase() === alm2[i].tipo) {
                        ment.inside = alm2[i].valor
                        for (let j = 0; j < tokens.length; j++) {
                            var elemento = tokens[j];
                            if (elemento.valor == ment.valor) {
                                console.log('validacion', ment.valor);

                                elemento = ment
                                tablas.forEach(data => {
                                    if (data.tupla == ment.valor) {
                                        data.content_tupla.push(ment.inside)
                                    }
                                });
                                console.log(tablas);

                            }
                        }
                    } else {
                        error = {
                            isError: true,
                            value: ment.type_v,
                            msg: 'El tipo de dato no concide'
                        }
                        word = ment.valor
                        break
                    }
                }
            }

        }
    }


    if (!error.isError) {
        return {
            isError: false
        }
    } else {
        return {
            isError: true,
            tipo_Error: 'semantico',
            class: 'terminal_error',
            element: word,
            valorEsp: error.value,
            msg: error.msg
        }
    }
}


function creacion(consulta) {
    consulta.forEach((element, index, data) => {
        if (element.tipo == 'CREATE') {
            if (data[index + 1].tipo == 'DATABASE') {// SI LA CONSULTA ES PARA CREAR UNA BASE DE DATOS SE HARÁ:
                for (let i = 0; i < consulta.length; i++) {
                    const element = consulta[i];
                    if (element.tipo == 'ID') {
                        console.log('se guardó un id de una base de datos');

                        element.typeOf = 'ID_DATABASE'
                        consulta[i] = element
                        identificadores.push(element)
                        break
                    }
                }

            }
            if (data[index + 1].tipo == 'TABLE') {// SI LA CONSULTA ES PARA CREAR UNA TABLE SE HARÁ:
                var nombretabla
                for (let i = 0; i < consulta.length; i++) {
                    const element = consulta[i];
                    if (element.tipo == 'ID' && consulta[i - 1].tipo == 'TABLE') {
                        console.log('se guardo un id de una tabla');
                        nombretabla = element.valor
                        element.typeOf = 'ID_TABLE'
                        consulta[i] = element
                        identificadores.push(element)
                    }
                    if (element.tipo == 'ID' && consulta[i + 1].tipo != 'SEP_A') {
                        console.log('se guardo una variable de una tabla');
                        element.typeOf = 'VAR_TABLE'
                        const tipo_variable = consulta[i + 1].valor
                        console.log(tipo_variable);
                        switch (tipo_variable.toUpperCase()) {
                            case 'VARCHAR':
                                element.type_v = 'string'
                                break;
                            case 'CHAR':
                                element.type_v = 'string'
                                break;
                            case 'INT':
                                element.type_v = 'number'
                                break;
                            case 'PRIMARY_KEY':
                                var contador = i + 1


                                while (consulta[contador].valor != undefined) {
                                    console.log(consulta[contador].valor);
                                    if (consulta[contador].valor == 'int' || consulta[contador].valor == 'varchar' || consulta[contador].valor == 'char') {
                                        break
                                    }
                                    console.log('vete ya');

                                    contador++
                                }
                                if (consulta[contador].valor == 'varchar' || consulta[contador].valor == 'char') {
                                    element.type_v = 'string'
                                } else {
                                    element.type_v = 'number'
                                }
                                break;
                            default:
                                break;
                        }
                        consulta[i] = element
                        identificadores.push(element)
                        tablas.push(
                            {
                                tupla: element.valor,
                                content_tupla: [],
                                table: nombretabla
                            }
                        )
                    }

                }
                console.log(tablas);



            }
        } else {
            if (element.tipo == 'ID') {
                identificadores.forEach(data1 => {
                    var punto = element.valor.split('.')
                    if (element.valor == data1.valor) {
                        consulta[index] = data1
                    }
                    if (punto.length > 1) {
                        if (punto[1] == data1.valor) {
                            consulta[index] = data1
                        }
                    }
                });
            }
        }
    });
}