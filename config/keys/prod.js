module.exports = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    facebookAuth : {
        clientID      : process.env.FB_CLIENT_ID,
        clientSecret  : process.env.FB_CLIENT_SECRET,
        callbackURL     : process.env.FB_CALLBACK_URL,
        profileURL: process.env.FB_PROFILE_URL
    },
    googleAuth : {
        clientID      : process.env.GOOGLE_CLIENT_ID,
        clientSecret  : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL   : process.env.GOOGLE_CALLBACK_URL
    }
};
  
//7 * 24 * 60 *60
      //Prod
    //759363382302-s5ajc1cuqb6lbf2792he3ksor3hpa9vv.apps.googleusercontent.com
    //IOHSDuJBsfm-7FWqilIkUfmd