export const options = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    // versionKey: false,
    // transform: function (doc, ret) {
    //   delete ret._id;
    // },
  },
};

export const optionsWithoutTimeStampsAndId = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    // versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  },
};