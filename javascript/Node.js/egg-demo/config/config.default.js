'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1544531111003_7804';

    // add your config here
    config.middleware = [];


    config.view = {
        defaultViewEngine: 'nunjucks',
    };

    return config;
};
