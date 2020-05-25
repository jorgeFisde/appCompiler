
const token = {
    id: [],
    variables:[
        {
            valor: `varchar`,
            tipo: 'VARIABLE'
        },
        {
            valor: 'char',
            tipo: 'VARIABLE'
        },
        {
            valor: 'primary_key',
            tipo: 'VARIABLE'
        },
        {
            valor: 'int',
            tipo: 'VARIABLE'
        },
        
        {
            valor: 'null',
            tipo: 'VARIABLE'
        }
    
    ],
    w_Reseived:[
        {
            valor: 'select',
            tipo: 'SELECT'
        },
        {
            valor: 'into',
            tipo: 'INTO'
        },
        {
            valor: 'insert',
            tipo: 'INSERT'
        },
        {
            valor: 'from',
            tipo: 'FROM'
        },
        {
            valor: 'where',
            tipo: 'WHERE'
        },
        {
            valor: 'create',
            tipo: 'CREATE'
        },
        {
            valor: 'database',
            tipo: 'DATABASE'
        },
        {
            valor: 'table',
            tipo: 'TABLE'
        },
        {
            valor: 'delete',
            tipo: 'DELETE'
        },
        {
            valor: 'drop',
            tipo: 'DROP'
        },
        {
            valor: 'and',
            tipo: 'AND'
        },
        {
            valor: 'or',
            tipo: 'OR'
        },
        {
            valor: 'if',
            tipo: 'IF'
        },
        {
            valor: 'not',
            tipo: 'NOT'
        },
        {
            valor: 'exists',
            tipo: 'EXISTS'
        },
        {
            valor: 'then',
            tipo: 'THEN'
        },
        {
            valor: 'else',
            tipo: 'ELSE'
        },
        {
            valor: 'loop',
            tipo: 'LOOP'
        },
        {
            valor: 'while',
            tipo: 'WHILE'
        },
        {
            valor: 'value',
            tipo: 'VALUE'
        },
        {
            valor: 'values',
            tipo: 'VALUE'
        },
        {
            valor: 'use',
            tipo: 'USE'
        }
    ],
    operadores:[
        {
            valor: '+',
            tipo: 'operadorSuma'
        },
        {
            valor: '-',
            tipo: 'operadorResta'
        },
        {
            valor: '*',
            tipo: 'operadorMult'
        },
        {
            valor: '/',
            tipo: 'operadorDivision'
        },
        {
            valor: '=',
            tipo: 'COMPARACION'
        },
    ],
    separadores:[
        {
            valor: '(',
            tipo: 'SEP_A'
        },
        {
            valor: ')',
            tipo: 'SEP_B'
        },
        {
            valor: ';',
            tipo: 'FIN_SENTENCIA'
        },
        {
            valor: ',',
            tipo: 'COMA'
        }
    ]
}
export default token 


