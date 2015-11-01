var _ = require('lodash'),
    logger = require('./../lib/logger');

module.exports = (req, res) => {
    if (typeof req.body.payload === 'undefined') {
        logger.error('Missing payload parameter');
        return res.status(400).send({ error: "Missing payload" })
    }

    var shows = _.filter(req.body.payload, (show) => {
        return (show.drm && show.episodeCount > 0)
    });

    var data = _.map(shows, (show) => {
        var image;
        if (show.image) image = show.image.showImage;
            return {
                image: image,
                slug: show.slug,
                title: show.title
            }
    });

    res.status(200).send({ response: data });
}
