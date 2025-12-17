import { useForm } from "react-hook-form";
import { supabase } from "../supabaseClient";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async ({ email, password, fullName, role }) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, role: role || "user" },
        },
      });

      if (error) throw new Error(error.message);

      alert(
        "Account created successfully! Please check your email to confirm."
      );
      navigate("/login");
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen p-3">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h2 className="mt-8 text-2xl font-bold tracking-tight text-white">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Choose <strong>Admin</strong> for demo purposes to see admin view,
            otherwise <strong>User</strong>.
          </p>

          {errorMessage && (
            <p className="mt-4 text-sm text-red-400">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-100">
                Full Name
              </label>
              <input
                {...register("fullName", { required: true })}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">
                Role
              </label>
              <select
                {...register("role", { required: true })}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10"
              >
                <option value="">Select Role</option>
                <option value="user" className="text-black">
                  User
                </option>
                <option value="admin" className="text-black">
                  Admin
                </option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-indigo-500 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-400 disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1908&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
