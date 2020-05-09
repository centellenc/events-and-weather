  module.exports.create = (eventsDataAccess, eventValidator) => {

    if (!eventsDataAccess) throw new Error("eventsDataAccess parameter is required");  
    if (!eventValidator) throw new Error("eventValidator parameter is required");
  
    return {
        post: (req, res, next) => {
            eventValidator.validate(req.body);
            eventsDataAccess.create(req.body);
            res.send('POST ok\n' + JSON.stringify(req.body));
        },
        put: (req, res, next) => {
            eventValidator.validate(req.body);
            eventsDataAccess.update(req.body);
            res.send('PUT ok\n' + JSON.stringify(req.body));
        },
        delete: (req, res, next) => {
            eventsDataAccess.delete(req.params.id);
            res.send('DELETE ok id:' + req.params.id);
        },
        get: (req, res, next) => {
            res.send(eventsDataAccess.get({date: req.params.date, location: req.params.location}, req.query.limit));
        }      
    };
  };