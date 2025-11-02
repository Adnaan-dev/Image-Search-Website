const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL || 'http://localhost:5000'}/api/auth/google/callback`
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      
      if (user) {
        return done(null, user);
      }
      
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        user.googleId = profile.id;
        user.provider = 'google';
        await user.save();
        return done(null, user);
      }
      
      user = await User.create({
        googleId: profile.id,
        username: profile.emails[0].value.split('@')[0],
        email: profile.emails[0].value,
        displayName: profile.displayName,
        avatar: profile.photos[0].value,
        provider: 'google'
      });
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

// Facebook Strategy
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.SERVER_URL || 'http://localhost:5000'}/api/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'emails', 'photos']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ facebookId: profile.id });
      
      if (user) {
        return done(null, user);
      }
      
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      
      if (email) {
        user = await User.findOne({ email });
        if (user) {
          user.facebookId = profile.id;
          user.provider = 'facebook';
          await user.save();
          return done(null, user);
        }
      }
      
      user = await User.create({
        facebookId: profile.id,
        username: profile.displayName.replace(/\s+/g, '').toLowerCase(),
        email: email || `${profile.id}@facebook.com`,
        displayName: profile.displayName,
        avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : '',
        provider: 'facebook'
      });
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL || 'http://localhost:5000'}/api/auth/github/callback`
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });
      
      if (user) {
        return done(null, user);
      }
      
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      
      if (email) {
        user = await User.findOne({ email });
        if (user) {
          user.githubId = profile.id;
          user.provider = 'github';
          await user.save();
          return done(null, user);
        }
      }
      
      user = await User.create({
        githubId: profile.id,
        username: profile.username,
        email: email || `${profile.id}@github.com`,
        displayName: profile.displayName || profile.username,
        avatar: profile.photos[0].value,
        provider: 'github'
      });
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

module.exports = passport;

