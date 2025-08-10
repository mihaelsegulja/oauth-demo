export default () => ({
    expo: {
      extra: {
        BACKEND_URL: process.env.BACKEND_URL,
        IOS_CLIENT_ID: process.env.IOS_CLIENT_ID,
        ANDROID_CLIENT_ID: process.env.ANDROID_CLIENT_ID,
        WEB_CLIENT_ID: process.env.WEB_CLIENT_ID,
      },
    },
  });