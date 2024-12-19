const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require("cors");
const http = require('http');

const  socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('sendMessage', (data) => {
        console.log('message received:', data);

        io.emit('receiveMessage', data);
    });
});

// 连接数据库
let db = new sqlite3.Database('./data/database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

app.use(cors({
    origin: '*',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
}));
app.use(express.json());

//用于生成盐值和哈希密码的函数
const saltAndHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

app.post('/login', (req, res) => {
    const { account, password } = req.body;
    console.log(account, password);
    db.get('SELECT id, account, username,password,avatar FROM users WHERE account = ?', [account], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        
        if (row) {
            const userData = {
                id: row.id,
                account: row.account,
                username: row.username,
                avatar: row.avatar
            };
            if (bcrypt.compareSync(password, row.password)) {
                const token = jwt.sign({ id: row.id, account: row.account }, 'links', {
                    expiresIn: '1h' 
                });
                // 发送包含token和userData的响应
                res.status(200).json({ message: '登录成功', token: token, data: userData });
            } else {
                res.status(401).json({ message: '密码错误' });
            }
        } else {
            res.status(404).json({ message: '用户不存在' });
        }
    });
});

app.get('/', (req, res) => {
    res.send("hello");
});

server.listen(3000, () => {
    console.log('Listening on *:3000');
  });