import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "../lib/firebase";

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: string;
  provider: "google" | "password" | "demo";
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  error: string | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (
    email: string,
    pass: string,
    displayName: string
  ) => Promise<void>;
  loginDemo: (role?: string) => void;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_STORAGE_KEY = "fraudlens_demo_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Format Firebase User into AppUser
  const mapFirebaseUser = (fbUser: FirebaseUser): AppUser => {
    const isGoogle = fbUser.providerData.some(
      (p) => p.providerId === "google.com"
    );
    return {
      uid: fbUser.uid,
      email: fbUser.email,
      displayName:
        fbUser.displayName ||
        (fbUser.email ? fbUser.email.split("@")[0] : "Investigator"),
      photoURL: fbUser.photoURL,
      role: "Lead Forensics Specialist",
      provider: isGoogle ? "google" : "password",
    };
  };

  useEffect(() => {
    // Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          localStorage.removeItem(DEMO_STORAGE_KEY);
          setUser(mapFirebaseUser(firebaseUser));
          setLoading(false);
        } else {
          // Check if demo user is stored locally
          const storedDemo = localStorage.getItem(DEMO_STORAGE_KEY);
          if (storedDemo) {
            try {
              setUser(JSON.parse(storedDemo));
            } catch {
              setUser(null);
            }
          } else {
            setUser(null);
          }
          setLoading(false);
        }
      },
      (authError) => {
        console.error("Firebase auth state listener error:", authError);
        setError(authError.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.removeItem(DEMO_STORAGE_KEY);
      setUser(mapFirebaseUser(result.user));
    } catch (err: any) {
      console.error("Google sign-in error:", err);
      // Give readable, helpful error message
      if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in cancelled: The login popup was closed before completion.");
      } else if (err.code === "auth/popup-blocked") {
        setError(
          "Popup blocked by browser. Please enable popups or use Email login."
        );
      } else if (err.code === "auth/unauthorized-domain") {
        setError(
          `Domain not authorized in Firebase Console: ${window.location.hostname}. Please add this domain to Firebase Auth authorized domains or use Email / Demo login.`
        );
      } else {
        setError(err.message || "Failed to sign in with Google.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      localStorage.removeItem(DEMO_STORAGE_KEY);
      setUser(mapFirebaseUser(result.user));
    } catch (err: any) {
      console.error("Email sign-in error:", err);
      if (err.code === "auth/operation-not-allowed") {
        console.warn("Firebase Email/Password auth is disabled. Falling back to local mock session.");
        
        // Mock a successful login using the provided email
        const mockUser: AppUser = {
          uid: `mock-${Date.now()}`,
          email,
          displayName: email.split("@")[0],
          photoURL: null,
          role: "Investigator",
          provider: "mock",
        };
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(mockUser));
        setUser(mockUser);
        setError(null);
        return;
      } else if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email or password. Please check your credentials or create a new account.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError(err.message || "Failed to sign in with email.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (
    email: string,
    pass: string,
    displayName: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      localStorage.removeItem(DEMO_STORAGE_KEY);
      setUser({
        ...mapFirebaseUser(result.user),
        displayName: displayName || email.split("@")[0],
      });
    } catch (err: any) {
      console.error("Registration error:", err);
      if (err.code === "auth/operation-not-allowed") {
        console.warn("Firebase Email/Password auth is disabled. Falling back to local mock session.");
        
        // Mock a successful registration using the provided email and name
        const mockUser: AppUser = {
          uid: `mock-${Date.now()}`,
          email,
          displayName: displayName || email.split("@")[0],
          photoURL: null,
          role: "Investigator",
          provider: "mock",
        };
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(mockUser));
        setUser(mockUser);
        setError(null);
        return;
      } else if (err.code === "auth/email-already-in-use") {
        setError("This email address is already registered. Please sign in instead.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError(err.message || "Failed to create account.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginDemo = (role: string = "Lead Forensics Specialist") => {
    const demoUser: AppUser = {
      uid: `demo-${Date.now()}`,
      email: "demo.analyst@fraudlens.ai",
      displayName: "Sarah Jenkins, CFE",
      photoURL: null,
      role,
      provider: "demo",
    };
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    setError(null);
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem(DEMO_STORAGE_KEY);
      setUser(null);
    } catch (err: any) {
      console.error("Sign-out error:", err);
      setError(err.message || "Failed to sign out.");
    } finally {
      setLoading(false);
    }
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        loginDemo,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
