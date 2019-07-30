const Boom = require('@hapi/boom')
module.exports.HandleResponse = (h, data, statusCode) => {
  return data ? h.response(data).code(statusCode) : Boom.badRequest(`Invalid Params ID`)
}
module.exports.HandleError = err => {
  console.log(err)
  const { code } = err
  if (code) {
    switch (err.code) {
      case 11000:
        throw Boom.conflict('This data have been exist')
    }
  }
  throw Boom.internal()
}
