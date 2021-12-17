let amqp = require('amqplib');
import { errorCode, rabbitmpServer } from '@/config';
import { QwdError } from '@/controllers/helper';

/**
 * 对RabbitMQ的封装
 */

class RabbitMQ {
  hosts: any;
  index: number;
  length: number;
  open: any;
  constructor() {
    // 建立连接
    this.open = amqp.connect({
      protocol: rabbitmpServer.protocol,
      hostname: rabbitmpServer.hostname,
      port: rabbitmpServer.port,
      username: rabbitmpServer.username,
      password: rabbitmpServer.password,
    });
    this.hosts = [];
    this.index = 0;
    this.length = 3;
  }

  //发布消息到队列中
  async sendQueueMsgQos(body) {
    const queueName = body.exchangeName;
    const exchangeName = body.exchangeName;
    const routingKey = body.routingKey;
    const msg = body.msg;

    //msg 是传入的消息
    const channel = await this.open.then((conn) => {
      return conn.createChannel();
    });

    // 4. 声明交换机
    await channel.assertExchange(exchangeName, 'topic', { durable: true });
    await channel.assertQueue(queueName);
    await channel.bindQueue(queueName, exchangeName, routingKey);

    // 5. 发送消息
    await channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(msg)));
    await channel.close();
  }

  async receiveQueueMsgQos(body) {
    const exchangeName = body.exchangeName;
    const queueName = body.queueName;
    const routingKey = body.routingKey;

    const channel = await this.open.then((conn) => {
      return conn.createChannel();
    });
    // 3. 声明参数

    // 4. 声明交换机、对列进行绑定
    await channel.assertExchange(exchangeName, 'topic', { durable: true });
    // await channel.assertQueue(queueName);
    // await channel.bindQueue(queueName, exchangeName, routingKey);

    // 5. 限流参数设置
    await channel.prefetch(1, false);

    // 6. 限流，noAck参数必须设置为false
    await channel.consume(
      queueName,
      (msg) => {
        console.log('Consumer：', msg.content.toString());

        // channel.ack(msg);
      },
      { noAck: false }
    );
  }
}
export default new RabbitMQ();
