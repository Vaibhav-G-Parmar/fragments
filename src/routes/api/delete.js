// src/routes/api/delete.js

const { createSuccessResponse, createErrorResponse } = require('../../response')
const logger = require('../../logger')
const { Fragment } = require('../../model/fragment');

module.exports = async (req, res) => {
  logger.info('DELETE v1/fragments route accessed')
  try {
    const id = req.params.id;
    await Fragment.delete(req.user, id);
    res.status(200).json(createSuccessResponse(200));
  } catch (error) {
    res.status(404).json(createErrorResponse(404, error))
    logger.warn(`Unable to delete a fragment`)
  }
};

