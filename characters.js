// const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const length = characters.length;

function getRandomChar() {
    return characters.charAt(Math.floor(Math.random() * length));
}

function compareCaseInsensitive(a, b) {
    return a.toLowerCase() === b.toLowerCase();
}

function compareCaseSensitive(a, b) {
    return a === b;
}

module.exports = {
    getRandomChar,
    compareCaseInsensitive,
    compareCaseSensitive
};