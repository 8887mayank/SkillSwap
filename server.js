const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const userRoutes = require('./routes/userRoutes');
const connectionRoutes = require('./routes/connections');
const messageRoutes = require('./routes/messages');
const personalInfoRoutes = require('./routes/personalInfo');
const meetingRoutes = require('./routes/meetings');

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

// Configure Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Cookie'],
    credentials: true
  }
});

// Middleware
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Cookie'],
    credentials: true
  })
);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/personal-info', personalInfoRoutes);
app.use('/api/meetings', meetingRoutes);

// Track connected users
const connectedUsers = new Set();

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
    connectedUsers.add(userId);
    console.log(`User ${userId} joined room`);
    io.emit('user-status', { userId, status: 'online' });
  });

  socket.on('typing', ({ senderId, recipientId }) => {
    socket.to(recipientId).emit('typing', { senderId });
  });

  socket.on('stop-typing', ({ senderId, recipientId }) => {
    socket.to(recipientId).emit('stop-typing', { senderId });
  });

  socket.on('message-delivered', ({ messageId, recipientId }) => {
    socket.to(recipientId).emit('message-delivered', { messageId });
  });

  socket.on('message-read', ({ messageId, recipientId }) => {
    socket.to(recipientId).emit('message-read', { messageId });
  });

  socket.on('new-message', (message) => {
    const { sender, recipient } = message;
    socket.to(sender._id).to(recipient._id).emit('receive-message', message);
    console.log(`Message from ${sender._id} to ${recipient._id}`);
  });

  socket.on('new-meeting', (meeting) => {
    const { senderId, recipientId, date, time, topic } = meeting;
    socket.to(recipientId).emit('receive-meeting', {
      senderId,
      recipientId,
      date,
      time,
      topic,
      message: `New meeting scheduled with ${meeting.senderName} on ${date} at ${time} for "${topic}"`,
    });
    socket.to(senderId).emit('receive-meeting', {
      senderId,
      recipientId,
      date,
      time,
      topic,
      message: `You scheduled a meeting with ${meeting.recipientName} on ${date} at ${time} for "${topic}"`,
    });
    console.log(`Meeting scheduled from ${senderId} to ${recipientId}`);
  });

  socket.on('meeting-reminder', (meeting) => {
    const { senderId, recipientId, date, time, topic } = meeting;
    socket.to(recipientId).emit('receive-reminder', {
      senderId,
      recipientId,
      date,
      time,
      topic,
      message: `Reminder: Meeting with ${meeting.senderName} on ${date} at ${time} for "${topic}"`,
    });
    socket.to(senderId).emit('receive-reminder', {
      senderId,
      recipientId,
      date,
      time,
      topic,
      message: `Reminder: You have a meeting with ${meeting.recipientName} on ${date} at ${time} for "${topic}"`,
    });
    console.log(`Reminder sent for meeting from ${senderId} to ${recipientId}`);
  });

  socket.on('code-request', (request) => {
    const { senderId, recipientId } = request;
    socket.to(recipientId).emit('code-request', request);
    console.log(`Code request from ${senderId} to ${recipientId}`);
  });

  socket.on('code-response', (response) => {
    const { senderId, recipientId } = response;
    socket.to(recipientId).emit('code-response', response);
    console.log(`Code response from ${senderId} to ${recipientId}: ${response.status}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    for (const userId of connectedUsers) {
      if (socket.rooms.has(userId)) {
        connectedUsers.delete(userId);
        io.emit('user-status', { userId, status: 'offline' });
        break;
      }
    }
  });
});

// Make io available to routes
app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));