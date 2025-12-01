import { useState } from "react";

const API_BASE = "https://alder-backend-265736855150.us-west1.run.app";

export default function CreateAccountPage({ onAccountCreated, onBackToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (username.length < 3) {
      setError("Username must be longer than 3 characters");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Account created successfully
        // Now automatically log in
        const loginResponse = await fetch(`${API_BASE}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          // Store the access token
          localStorage.setItem("access_token", loginData.access_token);
          // Call success callback
          onAccountCreated();
        } else {
          setError("Account created but login failed. Please try logging in.");
        }
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-[400px] rounded-2xl p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          Create Account
        </h2>

        <form onSubmit={handleCreateAccount} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
              placeholder="Choose a username (min 3 characters)"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
              placeholder="Choose a password (min 8 characters)"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
              placeholder="Re-enter your password"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm mb-2">Already have an account?</p>
          <button
            onClick={onBackToLogin}
            className="text-white/80 hover:text-white underline text-sm transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
