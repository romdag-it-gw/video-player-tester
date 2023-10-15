import 'core-js/es6';
import 'url-polyfill';

import Player from './player.js';
import Publisher from './publisher.js';

import { PUBLISHER_STATUSES, PUBLISHER_EVENTS, PLAYER_EVENTS } from './enums';

export default {
  Player,
  Publisher,
  PUBLISHER_EVENTS,
  PLAYER_EVENTS,
  PUBLISHER_STATUSES,
};
