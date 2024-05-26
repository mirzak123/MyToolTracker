"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    const hasDigit = /\d/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNonAlphanumeric = /[^a-zA-Z0-9]/.test(password);
    const isLongEnough = password.length >= 8;

    if (
      !hasDigit ||
      !hasLowercase ||
      !hasUppercase ||
      !hasNonAlphanumeric ||
      !isLongEnough
    ) {
      setError(
        "Password must contain at least one digit, one lowercase letter, one uppercase letter, one non-alphanumeric character, and be at least 8 characters long",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await fetch("http://localhost:5216/api/account/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      const result = await response.json();
      setError(result.message);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <a href="/login" style={{ color: "#ffa500" }}>
          Login here
        </a>
      </p>
      <style jsx>{`
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding: 1rem;
          background: #000;
          color: #ffa500;
          border-radius: 4px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        label {
          display: block;
          margin-top: 1rem;
        }

        input {
          margin-top: 0.5rem;
          width: 100%;
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ffa500;
          border-radius: 4px;
        }

        button {
          display: block;
          margin-top: 1rem;
          padding: 0.5rem;
          background: #ffa500;
          color: #000;
          font-size: 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        a {
          color: #ffa500;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Register;

