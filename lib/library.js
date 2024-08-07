'use strict';

const passport = require('passport');
const TelegramStrategy = require('passport-telegram-official').Strategy;

module.exports = {
    getStrategy(strategies, callback) {
        passport.use(new TelegramStrategy({
            botToken: process.env.TELEGRAM_BOT_TOKEN
        }, (accessToken, refreshToken, profile, done) => {
            return done(null, {
                id: profile.id,
                displayName: profile.displayName,
                photos: profile.photos
            });
        }));

        strategies.push({
            name: 'telegram',
            url: '/auth/telegram',
            callbackURL: '/auth/telegram/callback',
            icon: 'fa-telegram',
            scope: ['email']
        });

        callback(null, strategies);
    },
    getAssociation(associations, callback) {
        associations.push({
            name: 'Telegram',
            icon: 'fa-telegram',
            url: 'https://t.me/ThisisTransEuro_bot'  
        });

        callback(null, associations);
    },
    defineWidgetAreas: function (areas) {
        areas.push({
            widget: 'telegram-sso',
            name: 'Telegram SSO',
            template: 'partials/telegram-sso',
            location: 'sidebar'
        });
    }
};
