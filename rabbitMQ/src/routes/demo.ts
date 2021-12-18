import express from 'express';
const router: express.Router = express.Router();



// router.use('/', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
//   try {
//     smsInstance = new SmsCtrl()
//     next();
//   } catch (err) {
//     res.send(failRes(err.code, err.message));
//   }
// });

// router.get("/testSms",async function (req: any, res: Response) {
//   try{
//     let sendres = await smsInstance.sendOTP(req.body.phoneNumbers,req.body.templateParams)
//     // let sendres = await smsInstance.request("/sendMsg")
//     res.send(resSuccess('发送成功', sendres));
//   }catch(err){
//     res.send(failRes(err.code, err.message));
//   }
// })

export default router;
