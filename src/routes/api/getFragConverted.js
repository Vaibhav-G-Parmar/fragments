// src/routes/api/getFragConverted.js

const { createErrorResponse, createSuccessResponse } = require('../../response');
const { Fragment } = require('../../model/fragment');
const logger = require('../../logger');

module.exports = async function getFragConverted(req, res) {
  logger.info(`GET v1/fragments/:id.html route accessed with fragment ID ${req.params.id}`);

  try {
    const fragment = await Fragment.byId(req.user, req.params.id);
    logger.info('got the fragment: ' + JSON.stringify(fragment));
    logger.info('got the fragment type: ' + JSON.stringify(fragment.type));
    logger.info('got the fragment data: ' + JSON.stringify(fragment.getData));
    const convertedFragmentData = await Fragment.convertToSupportedType(fragment.getData(), fragment.type);
    logger.debug(`getFragConverted got data for fragment ID ${req.params.id}`);
    res.status(200).json(createSuccessResponse({convertedFragmentData}));
  } catch (error) {
    res.status(404).json(createErrorResponse(404, error.message));
    logger.warn(`fragment id invalid: ${req.params.id}`);
  }
};
