const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./data/database.db');

db.serialize(() => {
    let updateCount = 0;

    db.each('SELECT id, password FROM users', (err, row) => {
        if (err) {
            console.error(err.message);
            return db.close();
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(row.password, salt);

        db.run('UPDATE users SET password = ? WHERE id = ?', [hash, row.id], (updateErr) => {
            if (updateErr) {
                console.error(updateErr.message);
                return db.close();
            }
            updateCount++;
            console.log(`Updated password for user with id ${row.id}`);
        });
    }, (err) => { // 这是 db.each 的结束回调
        if (err) {
            console.error(err.message);
        } else {
            console.log(`Updated ${updateCount} passwords.`);
        }
        db.close((closeErr) => {
            if (closeErr) {
                return console.error(closeErr.message);
            }
            console.log('Closed the database connection.');
        });
    });
});