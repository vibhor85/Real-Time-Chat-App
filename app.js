const express =  require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine','ejs')
app.use(express.static(__dirname+'/public'))
app.get('/',(req,res,next)=>{
    res.render('index')
})


io.on('connection', socket => {
    socket.on('New User Joined',(user)=>{
        socket.user=user
    socket.broadcast.emit('user joined',user)
    })
    socket.on('message',(msg)=>{
        socket.broadcast.emit("new message",socket.user,msg)
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected',socket.user)
        delete socket.user
      })
});

server.listen(3000);

