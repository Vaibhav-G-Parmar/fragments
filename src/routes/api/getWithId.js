// src/routes/api/getWithId.js

const { createErrorResponse } = require('../../response');
const { Fragment } = require('../../model/fragment');
const logger = require('../../logger');

module.exports = async (req, res) => {
  logger.info(`GET v1/fragments/:id route accessed with fragment ID ${req.params.id}`);
  
  try {
    const fragment = await Fragment.byId(req.user, req.params.id)
    logger.debug(`fragment found with id:${fragment.id}`)

    res.setHeader('Content-Type', fragment.type)      //setting the type (plain-text for now) in the header
    const fgData = await fragment.getData()
    logger.info(`here is the fgdata:${fgData.toString()}`)
    res.status(200).send(fgData)                      //sending fragment's raw data
    logger.info(`type set in the header and fragment data sent:${fgData}`);
  } catch (error) {
    res.status(404).json(createErrorResponse(404, error))           //unknown fragment
    logger.warn(`unknown fragment, id invalid, id got:${req.params.id}`)
  }
}
