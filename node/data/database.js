const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account INTEGER NOT NULL UNIQUE,
        username TEXT NOT NULL,
        avatar TEXT DEFAULT 'default_avatar.jpg',
        password TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Users table created successfully');
        }
    });

    // 插入初始账户数据，从1000000开始
    db.run('INSERT INTO users (account, username, avatar, password) VALUES (?, ?, ?, ?)', [1000000, '', 'default_avatar.jpg', ''], (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Initial account inserted successfully');
        }
    });

    // 更新密码的代码可以放在这里，或者在其他地方调用
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
            console.log(`Updated password for user with id ${row.id}`);
        });
    }, (err) => { // 这是 db.each 的结束回调
        if (err) {
            console.error(err.message);
        } else {
            console.log('All passwords have been updated.');
        }
        db.close((closeErr) => {
            if (closeErr) {
                return console.error(closeErr.message);
            }
            console.log('Closed the database connection.');
        });
    });
});