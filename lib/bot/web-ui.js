/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var debug = require('debug')('bot:channel:web-ui');

module.exports = function (app, controller) {
  debug('web-ui initialized');
  app.post('/api/message', function(req, res, next) {
    if (!process.env.WORKSPACE_ID) {
      res.status(400).json({error: 'WORKSPACE_ID cannot be null', code: 500});
      return;
    }

    debug('message: %s', JSON.stringify(req.body));
    controller.processMessage(req.body, function(err, response) {
      if (err) {
        res.status(err.code || 400).json({error: err.error || err.message});
      } else {
        res.json(response);
      }
    })
  });

  app.post('/api/skyscanner', function(req, res, next) {
    if (!process.env.WORKSPACE_ID) {
      res.status(400).json({error: 'WORKSPACE_ID cannot be null', code: 500});
      return;
    }

    debug('message: %s', JSON.stringify(req.body));
    controller.processFlightDetails(req.body, function(err, response) {
      if (err) {
        res.status(err.code || 400).json({error: err.error || err.message});
      } else {
        res.json(response);
      }
    })
  });

}
