import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../firebase/firebase.init";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import useAxios from "../../../hook/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { name, email, password } = data;
      const photoURL = profilePic;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL,
        
      });

      // 🔐 Save Firebase token to localStorage
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("access-token", token);
      console.log("✅ Token stored after registration:", token);

      const userInfo = {
        uid: userCredential.user.uid,
        name,
        email,
        photoURL,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      const response = await axiosInstance.post("/api/users", userInfo);
      console.log("📤 Sent to DB:", response.data);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      reset();
    navigate(from, { replace: true }); // ✅ এখন navigate সঠিকভাবে এখানে রাখা হয়েছে
  } catch (error) {
    console.error("❌ Registration Error:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  } finally {
    setLoading(false);
  }
};

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // 🔐 Save Firebase token to localStorage
      const token = await user.getIdToken();
      localStorage.setItem("access-token", token);
      console.log("✅ Token stored after Google sign-in:", token);

      const userInfo = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      const response = await axiosInstance.post("/api/users", userInfo);
      console.log("📤 Google user sent to DB:", response.data);

      Swal.fire({
        icon: "success",
        title: "Google Sign-In Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      console.error("❌ Google Sign-In Error:", error);
      Swal.fire({
        icon: "error",
        title: "Google Sign-In Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
      const res = await axios.post(imageUploadUrl, formData);
      const imageUrl = res.data.data.url;
      setProfilePic(imageUrl);
      console.log("🖼️ Uploaded Image URL:", imageUrl);

      Swal.fire({
        icon: "success",
        title: "Image Uploaded!",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      console.error("❌ Image Upload Error:", error);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-black mb-6">Create An Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="label">Profile Picture</label>
            <input type="file" onChange={handleImageUpload} className="input input-bordered w-full" />
            {profilePic && (
              <img src={profilePic} className="w-24 h-24 rounded-full mx-auto mt-2" alt="preview" />
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
              })}
              className="input input-bordered w-full"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message: "Use uppercase, lowercase & number",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
              className="input input-bordered w-full"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Processing..." : "Register"}
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline btn-primary w-full mt-4 flex items-center justify-center gap-2"
          disabled={loading}
        > 
          <FcGoogle size={20} /> Sign up with Google
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
