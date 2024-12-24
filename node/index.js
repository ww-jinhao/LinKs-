const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require("cors");
const http = require('http');

const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const onlineUser = []

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('authenticate', ({ userId, account, username, avatar }) => {
        socket.userId = userId
        socket.username = username
        socket.account = account
        socket.avatar = avatar
        const existingUserIndex = onlineUser.findIndex(user => user.id === userId);
        if (existingUserIndex == -1) {
            const user = { id: userId, account, username, avatar }
            onlineUser.push(user)
            io.emit('onlineUser', onlineUser)
            console.log(`${username} connected`)
        } else {
            io.emit('onlineUser', onlineUser)
        }

    });

    socket.on('sendMessage', (data) => {
        console.log('message received:', data);
        io.emit('receiveMessage', data);
    });
    
    socket.on('disconnect', () => {
        if (socket.userId) {
            console.log(`${socket.username} disconnected`)

            const index = onlineUser.findIndex(item => item.id === socket.userId)
            if (index !== -1) {
                onlineUser.splice(index, 1)
                io.emit('onlineUser', onlineUser)
            }
        } else {
            console.log('An unauthenticated user disconnected')
        }
    });
});

// 连接数据库
let db = new sqlite3.Database('./data/database.db', (err) => {
    if (err) {
        console.error(err.message)
    } else {
        console.log('Connected to the SQLite database.')
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
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
};

app.post('/login', (req, res) => {
    const { account, password } = req.body
    db.get('SELECT id, account, username,password,avatar FROM users WHERE account = ?', [account], (err, row) => {
        if (err) {
            return console.error(err.message)
        }
        if (row) {
            const userData = {
                id: row.id,
                account: row.account,
                username: row.username,
                avatar: row.avatar
            }
            if (bcrypt.compareSync(password, row.password)) {
                const token = jwt.sign({ id: row.id, account: row.account }, 'links', {
                    expiresIn: '1h'
                })

                const userConnect = {
                    id: 0,
                    message: '',
                    avatar: '',
                    username: userData.username,
                    time: ''
                }
                io.emit('receiveMessage', userConnect)
                onlineUser.push(userData)
                res.status(200).json({ message: '登录成功', token: token, data: userData })
            } else {
                res.status(401).json({ message: '密码错误' })
            }
        } else {
            res.status(404).json({ message: '用户不存在' })
        }
    })
})

app.get('/nextaccount', (req, res) => {
    db.get('SELECT MAX(account) as maxAccount FROM users', (err, row) => {
        if (err) {
            return console.error(err.message)
        }

        const nextAccountId = row.maxAccount ? parseInt(row.maxAccount) + 1 : 1000000

        // 发送响应
        res.status(200).json({ account: nextAccountId })
    });
})

app.post('/register', (req, res) => {
    const { account, password, avatar, username } = req.body
    console.log(account, password, avatar, username)

    // 检查是否所有字段都已提供
    if (!account || !password || !avatar || !username) {
        return res.status(400).json({ message: '所有字段都是必填的' })
    }

    const hashedPassword = saltAndHash(password);

    db.run('INSERT INTO users (account, username , avatar, password) VALUES (?, ?, ?, ?)', [account, username, avatar, hashedPassword], function (err) {
        if (err) {
            console.error(err.message)
            if (err.code === 'SQLITE_CONSTRAINT') {
                return res.status(409).json({ message: '账号已存在' })
            }
            return res.status(500).json({ message: '内部服务器错误' })
        }
        res.status(200).end()
        console.log("添加成功")

    });
});

app.get('/', (req, res) => {
    res.send("hello");
});

server.listen(3000, () => {
    console.log('Listening on *:3000')
});