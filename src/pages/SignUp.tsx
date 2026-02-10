// SignUp.tsx
import { useMemo, useState } from "react";
import "./SignUp.css";

type Category = "Family" | "Finances" | "Mental Health" | "Career" | "Personal";
type ThemeKey = "classic" | "earthy" | "bright";

const CATEGORIES: Category[] = [
  "Family",
  "Finances",
  "Mental Health",
  "Career",
  "Personal",
];

const THEMES: { key: ThemeKey; label: string }[] = [
  { key: "classic", label: "Man*ly (Classic)" },
  { key: "earthy", label: "Earthy" },
  { key: "bright", label: "Bright" },
];

type FormState = {
  name: string;
  categories: Category[];
  username: string;
  email: string;
  password: string;
  theme: ThemeKey;
};

const initialForm: FormState = {
  name: "",
  categories: [],
  username: "",
  email: "",
  password: "",
  theme: "classic",
};

export default function SignUp() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState<string>("");

  const stepTitle = useMemo(() => {
    switch (step) {
      case 1:
        return "Welcome";
      case 2:
        return "Support Areas";
      case 3:
        return "Account Setup";
      case 4:
        return "Theme";
      default:
        return "Sign up";
    }
  }, [step]);

  function next() {
    setError("");

    if (step === 1 && !form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (step === 3) {
      if (!form.username.trim()) {
        setError("Please choose a username.");
        return;
      }
      if (form.password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      if (!form.email.trim()) {
        setError("Please enter your email.");
        return;
      }
    }

    setStep((prev) => (prev < 4 ? ((prev + 1) as typeof prev) : prev));
  }

  function back() {
    setError("");
    setStep((prev) => (prev > 1 ? ((prev - 1) as typeof prev) : prev));
  }

  function toggleCategory(cat: Category) {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  }

  function finish() {
    setError("");

    if (!form.name.trim()) return setError("Please enter your name.");
    if (!form.username.trim()) return setError("Please choose a username.");
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    if (!form.email.trim()) return setError("Please enter your email.");

    console.log("Signup submitted (temporary):", form);
  
    setForm(initialForm);
    setStep(1);
  }

  return (
    <main className="signup-page">
      <div className="signup-wrapper">
        <h1 className="signup-title">Welcome to Man*ly.</h1>
        <p className="signup-intro">
          Taking the first step takes courage. I’m proud of you.
        </p>

        <div className="signup-panel">
          <p className="signup-subtitle">
            Step {step} of 4 • {stepTitle}
          </p>

          {step === 1 && (
            <section className="signup-step">
              <label htmlFor="name" className="signup-label">
                What should I call you?
              </label>

              <div className="signup-input-row">
                <input
                  id="name"
                  className="signup-input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Enter your name"
                />

                <button
                  type="button"
                  className="signup-btn primary"
                  onClick={next}
                  disabled={!form.name.trim()}
                >
                  →
                </button>
              </div>

              {error && <div className="signup-error">{error}</div>}
            </section>
          )}

          {step === 2 && (
            <section className="signup-step">
              <h2 className="signup-h2">
                Tell me a little more, {form.name || "friend"}.
              </h2>

              <div className="signup-checkbox-grid">
                {CATEGORIES.map((cat) => (
                  <label key={cat} className="signup-checkbox-card">
                    <input
                      type="checkbox"
                      checked={form.categories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>

              <div className="signup-actions">
                <button className="signup-btn secondary" onClick={back}>
                  Back
                </button>
                <button className="signup-btn primary" onClick={next}>
                  →
                </button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="signup-step">
              <h2 className="signup-h2">Let’s set up your account.</h2>

              <input
                className="signup-input"
                placeholder="Username"
                value={form.username}
                onChange={(e) =>
                  setForm((p) => ({ ...p, username: e.target.value }))
                }
              />

              <input 
                className="signup-input"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
              />

              <input
                className="signup-input"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
              />

              <div className="signup-actions">
                <button className="signup-btn secondary" onClick={back}>
                  Back
                </button>
                <button className="signup-btn primary" onClick={next}>
                  →
                </button>
              </div>

              {error && <div className="signup-error">{error}</div>}
            </section>
          )}

          {step === 4 && (
            <section className="signup-step">
              <h2 className="signup-h2">Choose a theme.</h2>

              <div className="signup-theme-list">
                {THEMES.map((t) => (
                  <button
                    key={t.key}
                    className={`signup-theme ${
                      form.theme === t.key ? "is-active" : ""
                    }`}
                    onClick={() =>
                      setForm((p) => ({ ...p, theme: t.key }))
                    }
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="signup-actions">
                <button className="signup-btn secondary" onClick={back}>
                  Back
                </button>
                <button className="signup-btn primary" onClick={finish}>
                  Finish
                </button>
              </div>

              {error && <div className="signup-error">{error}</div>}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
