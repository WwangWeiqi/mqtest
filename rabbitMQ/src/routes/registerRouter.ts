import { sysParameter } from '@/config';
import _ from 'lodash';
import index from './index';
import demo from './demo';
import queuemsg from './queuemsg';

function register(app, ...routers) {
  _.each(routers, (router) => {
    app.use(`/api/${sysParameter.version}/auth`, router);
  });
}

// All the APIs need to register here in order to be accessed
function setRoutes(app): void {
  let _routers = [
    // demo,
  ];

  app.use(`/api/${sysParameter.version}/queuemsg`, queuemsg);

  app.use(`/api/${sysParameter.version}`, index);
  app.use(`/api/${sysParameter.version}`, demo);

  register(app, ..._routers);
}

export default setRoutes;
