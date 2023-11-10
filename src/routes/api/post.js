// src/routes/api/post.js

const { Fragment } = require('../../model/fragment');
const { createSuccessResponse, createErrorResponse } = require('../../response');
const logger = require('../../logger');

module.exports = async (req, res) => {
  console.log(req.body.toString());
  logger.info(`Posting fragment for req:${req.body}`);

  if (!Fragment.isSupportedType(req.get('Content-Type'))) {
    res.status(415).json(createErrorResponse(415, 'Type not supported'));
    logger.warn('Content-type is not posted');
  } 
  else {
    try {
      logger.info('Creating a new Fragment');
      const fragment = new Fragment({
        ownerId: req.user,
        type: req.get('Content-Type'),
        size: req.body.length,
      });
      logger.info(`Created a new Fragment:${fragment}`);

      logger.info("setting the fragment's data in the database");
      logger.info(req.body);
      await fragment.setData(req.body.toString()); //setting the fragment's data in the database

      logger.info('saving the fragment to the database');
      await fragment.save(); //saving the fragment to the database

      logger.info("setting the fragment's location");
      res.set('Location', `${process.env.API_URL}/v1/fragments/${fragment.id}`);

      res.status(201).json(createSuccessResponse({ fragment }));
      logger.debug('fragment successfully posted', { fragment });
    } catch (error) {
      res.status(500).json(createErrorResponse(505, error));
      logger.error('Fragment could not be posted');
    }
  }
};
