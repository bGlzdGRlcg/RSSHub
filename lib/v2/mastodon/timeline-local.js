const got = require('@/utils/got');
const utils = require('./utils');
const config = require('@/config').value;

module.exports = async (ctx) => {
    const site = ctx.params.site;
    const only_media = ctx.params.only_media ? 'true' : 'false';
    const url = `http://${site}/api/v1/timelines/public?local=true&only_media=${only_media}`;

    const config = require('@/config').value;
    const mastodonConfig = config.mastodon;

    const response = await got({
                method: 'get',
                url: url,
                headers: {
                    ...(mastodonConfig.accessToken ? { Authorization: `Bearer ${mastodonConfig.accessToken}` } : {}),
                },
            });
    const list = response.data;

    ctx.state.data = {
        title: `Local Public${ctx.params.only_media ? ' Media' : ''} Timeline on ${site}`,
        link: `https://${site}`,
        item: utils.parseStatuses(list),
    };
};
