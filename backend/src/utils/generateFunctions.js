const snakeize = require('snakeize');

// pega os nomes das propriedades e tranforma em snake_case, obtem uma lista com todas as colunas(Object.keys), e uni essas colunas em uma unica strings separada por ','
const getFormattedColumnNames = (object) => Object.keys(snakeize(object)).join(',');

// gera uma string com espaços reservados para parametros, Object.keys obtem as propriedades do objeto, o map cria um array de '?' do mesmo tamanho que o numero de colunas, o join uni as '?' em uma unica strig com espacos reservados para parametros correspondentes as colunas.
const getFormattedPlaceholders = (object) => Object.keys(object).map(() => '?').join(',');

// fomata a coluna para ser usada em uma clausula de atualizaçao em uma consulta sql, ela junta o nome da coluna seguido de '=?'
const getFomattedUpdateColumns = (object) => Object.keys(snakeize(object))
  .map((key) => `${key} = ?`)
  .join(', ');

module.exports = {
  getFomattedUpdateColumns,
  getFormattedColumnNames,
  getFormattedPlaceholders,
};