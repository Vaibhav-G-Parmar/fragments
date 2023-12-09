// src/routes/api/put.js

const { Fragment } = require('../../model/fragment');
const { createSuccessResponse, createErrorResponse } = require('../../response');
const logger = require('../../logger');

module.exports = async (req, res) => {
  logger.info('PUT v1/fragments route accessed');
  const type = req.get('Content-Type')?.split(';')?.[0].trim().toLocaleLowerCase();
  console.log('user: ', JSON.stringify(req.user));
  try {
    const fragment = await Fragment.byId(req.user, req.params.id);
    logger.info('got the fragment: ' + JSON.stringify(fragment));
    if (type != fragment.type.trim().toLocaleLowerCase()) {
      console.log('fragment type mismatch: ', type, ' & ', fragment.type);
      return res
        .status(400)
        .json(createErrorResponse(400, "A fragment's type can not be changed after it is created"));
    }
    await fragment.setData(req.body);
    return res.status(201).json(createSuccessResponse({ fragment }));
  } catch (error) {
    console.log('error updating fragment:', error);
    res.status(400).json(createErrorResponse(400, error));
    //logger.warn(`Unable to update a fragment: ` + JSON.stringify(error))
  }
};
