import io from 'socket.io-client';
import storage from '~/src/utils/storage';
import Notification from '~/notification';
const notification = new Notification();

export const socketConnect = async () => {
  // const { userInfo } = store.getState();
  let user = await storage.get('user')
  user = JSON.parse(user)
  const token = await storage.get('token')
  console.log('user', user)
  console.log('token', token)
  if (!token) return;
  let socket = null

  if (!socket) {
    socket = io("wss://xiaok.club/notification", {
      // 是否自动重新连接
      reconnection: true,
      // 自动重连10次后放弃
      reconnectionAttempts: 15,
      forceNode: true,
      // jsonp: false,
      // transports: ['websocket'],
      timeout: 10000,
      autoConnect: true,
      // agent: '_',
      // pfx: '_',
      // key: token,
      // cert: '_',
      // ca: '_',
      // ciphers: '_',
      // rejectUnauthorized: '_',
      // perMessageDeflate: '_',
      // 发送参数给服务器，服务端获取参数 socket.handshake.query
      query: {
        token
      },
    });
  }

  if (!socket) return
  //成功连接
  socket.on('connect', function () {
    console.log('socket connect success');
  });

  // const dispatch = store.dispatch;

  //init notification
  // socket.on(userInfo.my._id + 'init', function (data) {
  //   if (data.length <= 0) return;
  //   initNotification(data)(dispatch);
  // });

  //获取到关于自己的消息时
  socket.on(user._id, function (data) {
    console.log(data);
    const { type, postid: { title }, userid: { username } } = data
    const message = `${username} ${type} ${title}`
    // newNotification(data)(dispatch);
    notification.newScheduleNotification({ title, message });

  });

  // 如果断开了连接，尝试重新连接
  socket.on('disconnect', function () {
    console.log('socket has disconnect.');
    socket.open();
  });

  // onerror
  socket.on('connect_timeout', function (err) {
    console.log(err)
  })
};