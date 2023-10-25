const httpCodeMap = {
  SUCCESSFUL: 200,
  CREATED: 201,
  DELETED: 204,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
  ERROR: 500,
};

const mapStatusHTTP = (status) => httpCodeMap[status] || 500;

module.exports = mapStatusHTTP;