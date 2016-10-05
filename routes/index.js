'use strict'

const express = require(`express`)
const router = express.Router()
const knex = require(`../db/knex`)
const validate = require(`express-validation`)
const validation = require(`../validations/user.js`)

/* GET home page. */
router.get(`/`, (req, res, next) => {
  knex(`users`).then(results => {
    res.render(`home`, ({
      userlist: results,
    }))
  })
})

router.post(`/signup`, validate(validation.signup), (req, res, next) => {
  knex(`users`)
    .where(`email`, req.body.email)
    .first()
    .then(result => {
      if (result) {
        knex(`users`).then(results => {
          res.render(`home`, ({
            error: `Duplicate email detected!`,
            user: req.body,
            userlist: results,
          }))
        })
      } else {
        const userObj = req.body

        knex(`users`).insert(userObj).then(() => {
          res.redirect(`/`)
        })
      }
    })
})

module.exports = router
