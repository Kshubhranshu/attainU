const { db } = require('../common/dbConfig');

let addUserAddress = (username, address) => {
    const query = ' INSERT INTO public.user_address (username, address) values($1, $2) ';
    return db.query(query, [username, address]);
}

module.exports = {
    addUserAddress
}