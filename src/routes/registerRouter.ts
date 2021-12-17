import { sysParameter } from '@/config';
import _ from 'lodash';
import index from './index';
import demo from './demo';

function register(app, ...routers) {
  _.each(routers, (router) => {
    app.use(`/api/${sysParameter.version}/auth`, router);
  });
}

// All the APIs need to register here in order to be accessed
function setRoutes(app): void {

  app.use(`/api/${sysParameter.version}`, index);
  app.use(`/api/${sysParameter.version}`, demo);

}

export default setRoutes;
