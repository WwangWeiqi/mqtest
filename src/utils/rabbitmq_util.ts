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
  connection: any;

  constructor() {
    // 建立连接
    this.connection = amqp.connect({
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

  /**
   * 发送消息到队列 - publish 生产者
   * @param queueName
   * @param msg
   */
  sendQueueMsg(queueName, msg) {
    return new Promise(async (resolve, reject) => {
      let self = this;
      this.connection
        .then(function (conn) {
          return conn.createChannel();
        })
        .then(function (channel) {
          return channel
            .assertQueue(queueName, { durable: true }) //定义队列 durable: true 表示持久化
            .then(async (ok) => {
              //监听成功后向队列发送消息，这里我们就简单发送一个字符串。发送完毕后关闭通道。
              const send = channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)), { persistent: false }); //将队列保存
              await channel.close(); // 关闭链接
              resolve(send);
            })
            .catch(async (err) => {
              await channel.close(); // 关闭链接
              reject(err);
              //throw new QwdError(errorCode.MqConsumeError, err);
            });
        })
        .catch((err) => {
          reject(err);
          //throw new QwdError(errorCode.MqConsumeError, err);
        });
    });
  }

  /**
   * 接收消息到队列 - Consume 消费者
   * @param queueName
   */
  receiveQueueMsg = (arr:any,queueName: any,id:any) => {
    let self = this;
    return new Promise((resolve,reject)=>{
      
      this.connection
      .then(function (conn) {
        //连接成功后创建通道
        return conn.createChannel();
      })
      .then(function (channel) {
        return (
          channel
            //通道创建成功后我们通过通道对象的assertQueue方法来监听hello队列，并设置durable持久化为false。这里消息将会被保存在内存中。该方法会返回一个promise对象。
            .assertQueue(queueName, { durable: true }) //定义队列 durable: true 表示持久化
            .then((ok) => {
              //监听创建成功后，我们使用ch.consume创建一个消费者。指定消费hello队列和处理函数，在这里我们简单打印一句话。设置noAck为true表示不对消费结果做出回应。
              //ch.consume会返回一个promise，这里我们把这个promise赋给ok。
              return channel.consume(
                queueName,
                (msg) => {
                  if (msg !== null) {
                    let data = msg.content.toString();
                    let pdata = JSON.parse(data)
                    arr.push(pdata)
                    if(pdata.user_id == id){
                      console.log("ack msg",pdata)
                      channel.ack(msg);
                    }
                  }
                },
                { noAck: false }
              );
            })
            .finally(function () {
              setTimeout(() => {
                if (channel) {
                  console.log(arr)
                  resolve(arr)
                  channel.close(); // 关闭链接
                }
              }, 500);
            })
        );
      })
      .catch(function (err) {
        reject(err);
      });
    })
  };
}

export default new RabbitMQ();
