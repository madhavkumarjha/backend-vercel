import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: { type: String, required: true, unique: true, trim: true },
    avatar: {
      url: {
        type: String,
      },
      fileId: {
        type: String,
      },
    },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["user", "admin", "instructor"],
      default: "user",
    },
    otp: {
      code: { type: String, select: false },
      expiresAt: {
        type: Date,
      },
      purpose: {
        type: String,
        enum: ["reset", "verify", "login"],
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre("save", async function () {
  if (this.isNew && !this.avatar?.url) {
    this.avatar = {
      url: `https://api.dicebear.com/9.x/identicon/svg?seed=${this.username}`,
    };
  }

  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.applyRoleFields = function () {
  // Only runs if you call it manually
  if (this.role === "instructor") {
    if (!this.experience) this.experience = 0;
    if (!this.thesis) this.thesis = "Not submitted";
  }

  if (this.role === "user") {
    if (!this.enrollmentNumber) this.enrollmentNumber = `ENR-${Date.now()}`;
  }

  if (this.role === "admin") {
    if (!this.permissions) this.permissions = ["manage-users"];
  }
};

userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    const hiddenFields = ["password", "_id", "otp", "__v"];

    // if (ret.role !== "instructor") {
    //   hiddenFields.push("thesis", "experience");
    // }
    // if (ret.role !== "admin") {
    //   hiddenFields.push("permissions");
    // }

    hiddenFields.forEach((field) => delete ret[field]);
    return ret;
  },
});

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

const User = mongoose.model("User", userSchema);
export default User;
