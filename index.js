const { readdirSync } = require('fs');
const logger = require('./modules/logger');

const modules = readdirSync('./modules')
modules.forEach(module => {
    require(`./modules/${module}`);
});
logger.log(`Loaded ${modules.length} modules`);