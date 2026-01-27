const mongoose = require('mongoose');

const token = require('crypto');

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: { expires: '7d' }, //* Auto-delete after 7 days
    },

    ipAddress: String,
    userAgent: String,
    isRevoked: {
      type: Boolean,
      default: false,
    },
    replacedByToken: String,
  },
  {
    timeseries: true,
  }
);

//* Indexes
refreshTokenSchema.index({ user: 1 });
refreshTokenSchema.index({ expiresAt: 1 });
refreshTokenSchema.index({ token: 1 }, { unique: true });

refreshTokenSchema.pre('save', function (next) {
  if (this.isModified('token')) {
    /*
            ! Hash token before savinf(optional, depends on security requeriments)
            ! this would require bcrypt here
        */
  }
  next();
});

//* Static method to create refresh token
refreshTokenSchema.statics.createToken = async function (user, ip, userAgent) {
  token.randomBytes(40).toString('hex');
  const experiresAt = new Date();
  experiresAt.setDate(experiresAt.getTime() + 7); //* 7 days

  const refreshToken = new this({
    token,
    user: user._id,
    experiresAt,
    ipAddress: ip,
    userAgent,
  });

  await refreshToken.save();
  return refreshToken.token;
};

//* Static method to verify refresh token
refreshTokenSchema.static.verifyToken = async function (token) {
  const refreshToken = await this.findOne({
    token,
    expiresAt: { $gt: new Date() },
    isRevoked: false,
  }).populate('user');

  if (!refreshToken) {
    throw new Error('Invalid refresh token');
  }

  return refreshToken;
};

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.export = RefreshToken;
