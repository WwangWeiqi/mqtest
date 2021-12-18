let redisLocalServer: any = {};
let options:any={
  redis_app_login_session: 'bbzy-app-user:loginsession',
  // 资讯
  redis_news: 'bbzy-news',
  redis_news_view_count: 'bbzy-news-view-count',
  // 活动
  redis_event: 'bbzy-event',
  redis_event_view_count: 'bbzy-event-view-count',
  // 产品
  redis_product: 'bbzy-product',
  redis_product_view_count: 'bbzy-product-view-count'
}

if (process.env.NODE_ENV === 'docker') {
  redisLocalServer = {
    redisPort: 6379,
    redisHost: 'bzy-redis',
    redispwd: process.env.REDIS_PASSWORD,
    ...options
  };
} else {
  redisLocalServer = {
    redisPort: 6379,
    // redisHost: '127.0.0.1',
    redisHost: '47.92.94.8',
    redispwd: '123456',
    ...options
  };
}

export default redisLocalServer;
