

module.exports = {
    validate: (event) => {
        if (!event.date)
            event.date = new Date().toISOString();
    }
}