import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getApiUrl, API_ENDPOINTS } from "../config/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);

  // ✅ Check user info on mount (if token exists)
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchMe() {
      try {
        const res = await fetch(getApiUrl(API_ENDPOINTS.AUTH.ME), {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Auth check failed:", error.message);
        logout(); // ✅ centralize cleanup
      } finally {
        setLoading(false);
      }
    }

    fetchMe();
    return () => controller.abort();
  }, [token]);

  // ✅ Login
  const login = async ({ email, password }) => {
    const res = await fetch(getApiUrl(API_ENDPOINTS.AUTH.LOGIN), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Login failed");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);

    return data.user;
  };

  // ✅ Register
  const register = async ({ name, email, password, role, adminSecret }) => {
    const res = await fetch(getApiUrl(API_ENDPOINTS.AUTH.REGISTER), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role, adminSecret }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Register failed");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);

    return data.user;
  };

  // ✅ Logout (centralized cleanup)
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  // ✅ Memoized context value
  const value = useMemo(
    () => ({ token, user, loading, login, register, logout }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
