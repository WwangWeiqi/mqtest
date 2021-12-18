export default {
  protocol: 'amqp',
  hostname: '81.69.247.43',
  port: 5672,
  username: 'admin',
  password: 'admin',
  locale: 'en_US', //错误消息的所需区域设置。RabbitMQ只使用过en_US; 幸运的是，这是默认的。
  frameMax: 0, //连接上允许的最大帧的大小（以字节为单位）0意味着没有限制（但是因为帧的大小字段是无符号的32位整数，所以它是perforce 2^32 - 1）
  heartbeat: 0, //连接心跳的周期，以秒为单位。默认为0;
  vhost: '/',
};
