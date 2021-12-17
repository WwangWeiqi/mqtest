import express from 'express';
const router: express.Router = express.Router();
import { failRes, resSuccess } from '@/utils/utils';
import mq from '@/utils/rabbitmq_util';
import mqQos from '@/utils/rabbitmq_util_qos';

//
/**
 * @description 向MQ发送一个消息 - 创建队列
 * @param {String} queueName 列队名
 * @param {String} msg 内容
 * @return {Array}
 */
router.post('/sendQueueMsg', async function (req, res) {
  try {
    const body = req.body;
   await mq.sendQueueMsg(body.queueName, body.msg)
      .then((result) => res.send(resSuccess('创建队列成功', result)))
   
  } catch (err) {
    res.send(failRes(err.code, err.message));
  }
});

/**
 * @description 向MQ获取一个消息 - 消耗队列
 * @param {String} queueName 列队名
 * @return {Array}
 */
router.post('/receiveQueueMsg', async function (req, res) {
  try {
    const body = req.body;
    //setInterval(() => {

    let arr = await mq.receiveQueueMsg([],body.queueName,body.user_id)
 
    res.send(resSuccess('消费队列成功',  arr));
  } catch (err) {
    res.send(failRes(err.code, err.message));
  }
});

/**
 * @description 向MQ发送一个消息 - 创建队列
 * @param {String} queueName 列队名
 * @param {String} msg 内容
 * @return {Array}
 */
router.post('/sendQueueMsgQos', async function (req, res) {
  try {
    const body = req.body;
    mqQos
      .sendQueueMsgQos(body)
      .then((result) => res.send(resSuccess('创建队列成功', result)))
      .catch((err) => res.send(failRes(err.code, err)));
  } catch (err) {
    res.send(failRes(err.code, err.message));
  }
});

/**
 * @description 向MQ获取一个消息 - 消耗队列
 * @param {String} queueName 列队名
 * @return {Array}
 */
router.post('/receiveQueueMsgQos', async function (req, res) {
  try {
    const body = req.body;
     await mqQos.receiveQueueMsgQos(body)
    res.send(resSuccess('消费队列成功', {}));
  } catch (err) {
    res.send(failRes(err.code, err.message));
  }
});
export default router;
