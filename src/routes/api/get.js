// src/routes/api/get.js

const { createSuccessResponse, createErrorResponse } = require('../../response')
const logger = require('../../logger')
const { Fragment } = require('../../model/fragment');

// Get a list of fragments for the current user
module.exports = async (req, res) => {
  logger.info('GET v1/fragments route accessed')
  try {
    const fragments = await Fragment.byUser(req.user, req.query.expand)
    res.status(200).json(createSuccessResponse({ fragments }))
  } catch (error) {
    res.status(404).json(createErrorResponse(404, error))
    logger.warn(`Unable to get fragments`)
  }
};
