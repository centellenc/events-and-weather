const eventValidator = require('./eventValidator');

test('validate should set the date if emty', () => {
    // Given
    let event = {};

    // When
    eventValidator.validate(event);

    // Then
    expect(event.date).toBeDefined();
});
