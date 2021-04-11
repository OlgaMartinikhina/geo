// eslint-disable-next-line import/extensions
import Logic from './logic.js';
// eslint-disable-next-line import/extensions
import Widget from './widget.js';

const widget = new Widget();
const logic = new Logic(widget);
logic.init();
