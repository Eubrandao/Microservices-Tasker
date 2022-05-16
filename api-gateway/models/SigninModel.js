import mongoose from "mongoose";

const SignupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const SigninModel =
  mongoose.models.users || mongoose.model("users", SignupSchema);
export default SigninModel;
