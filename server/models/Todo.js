import mongoose from 'mongoose';

const todoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Pre hook to update the updatedAt field
todoSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

todoSchema.pre('updateOne', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
