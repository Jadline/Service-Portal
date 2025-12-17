import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "bridgedesk@gmail.com",   
      password: "1234",          
    },
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Demo accounts
  const demoUsers = {
    "bridgedesk@gmail.com": { password: "1234", role: "user" },
    "admin@gmail.com": { password: "2345", role: "admin" },
  };

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const user = demoUsers[email];
      if (!user || user.password !== password) {
        throw new Error("Invalid email or password. Please try again.");
      }

      // Redirect based on role
      navigate(user.role === "admin" ? "/requests" : "/");
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
          <h2 className="mt-8 text-2xl font-bold tracking-tight text-white">Sign In (Demo)</h2>

          <p className="mt-2 text-sm text-gray-400">
            👉 To log in as a <strong>User</strong>, use:<br />
            Email: <code>bridgedesk@gmail.com</code><br />
            Password: <code>1234</code><br /><br />
            👉 To log in as an <strong>Admin</strong>, use:<br />
            Email: <code>admin@gmail.com</code><br />
            Password: <code>2345</code>
          </p>

          {errorMessage && (
            <p className="mt-4 text-sm text-red-400">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-100">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-indigo-500 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-400 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="mt-4 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Sign Up
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
