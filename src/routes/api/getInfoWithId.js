// src/routes/api/getInfoWithId.js

const { createErrorResponse, createSuccessResponse } = require('../../response');
const { Fragment } = require('../../model/fragment');
const logger = require('../../logger');

module.exports = async function getMetadataWithId(req, res) {
  logger.info(`GET v1/fragments/:id/info route accessed with fragment ID ${req.params.id}`);

  try {
    const fragment = await Fragment.byId(req.user, req.params.id);
    logger.debug(`getMetadataWithId got metadata for fragment ID ${req.params.id}`);
    res.status(200).json(createSuccessResponse({fragment}));
  } catch (error) {
    res.status(404).json(createErrorResponse(404, error.message));
    logger.warn(`fragment id invalid: ${req.params.id}`);
  }
};
