import express from 'express';
const router: express.Router = express.Router();
import { failRes, resSuccess } from '@/utils/utils';

/**
 * @description: 权限验证
 * @param {*}
 * @return {Array}}
 */
router.use('/auth', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const sessionid = req.headers['sessionid'] ? req.headers['sessionid'] : '';
    console.log('====>>> MQ Auth 它来了');

    // next();
    res.send(resSuccess('Auth成功', {}));
  } catch (err) {
    res.send(failRes(err.code, err.message));
  }
});

router.get('/testgateway', function (req: any, res: any) {
  res.send(resSuccess('gateway重定向成功', {}));
});

export default router;
