'use strict'

const Joi = require(`joi`)

module.exports = {
  signup: {
    body: {
      email: Joi.string().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      password: Joi.string().required(),
      username: Joi.string().required()
    }
  }
}
