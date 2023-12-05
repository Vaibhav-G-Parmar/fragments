// src/routes/api/put.js

const { Fragment } = require('../../model/fragment');
const { createSuccessResponse, createErrorResponse } = require('../../response');
const logger = require('../../logger');

module.exports = async (req, res) => {
  logger.info('PUT v1/fragments route accessed')
  let type = req.get('Content-Type');
  try {
    const fragment = await Fragment.byId(req.user, req.params.id)
    if(type != fragment.type) {
      return res.status(404).json(createErrorResponse(400, "A fragment's type can not be changed after it is created"))
    }
    await fragment.setData(req.body)
    return res.status(201).json(createSuccessResponse({fragment}))
  } catch (error) {
    res.status(404).json(createErrorResponse(404, error))
    logger.warn(`Unable to update a fragment`)
  }
};
