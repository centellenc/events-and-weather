var eventsFilter = require('./eventsFilter');
var db = require('diskdb');

const DB_PATH = './persistence/storage/db';
db.connect(DB_PATH, ['events']);

module.exports = {
    get: (filters, limit) =>  {
        return eventsFilter.for(filters, limit).apply(db.events.find() || []);
    },
    create: (event) => {
        db.events.save(event);
    },
    update: (eventToUpdate) => {
        db.events.update({id: eventToUpdate.id}, eventToUpdate);
    },
    delete: (eventId) => {
        db.events.remove({id: eventId});
    }
};