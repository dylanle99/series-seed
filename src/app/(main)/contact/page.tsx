"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";

import { cn } from "@/lib/utils";
import { saveUserInfo } from "@/lib/server-actions";
import SplitText from "@/components/molecules/split-text";

// Component adapted from Aceternity UI by Manu Arora
// Source: https://ui.aceternity.com/registry/placeholders-and-vanish-input.json
// Integrated into Skiper UI with design system and code structure updates
// Respect original creator's rights.

function VanishForm({
  placeholder,
  onChange,
  onSubmit,
  onComplete,
  onError,
}: {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onComplete?: () => void;
  onError?: (message: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FF6B35"; // brand-orange color
    ctx.letterSpacing = "-0.05em";

    // Automatically calculate text position based on font metrics
    const metrics = ctx.measureText("A"); // Use "A" as baseline if no value
    const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    const baselineY = textHeight + 10;

    ctx.fillText(value, 0, baselineY);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData: any[] = [];

    for (let t = 0; t < 800; t++) {
      const i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        const e = i + 4 * n;
        if (pixelData[e] !== 0 && pixelData[e + 1] !== 0 && pixelData[e + 2] !== 0) {
          newData.push({
            x: n,
            y: t,
            color: [pixelData[e], pixelData[e + 1], pixelData[e + 2], pixelData[e + 3]],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start: number) => {
    const animateFrame = (pos = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setValue("");
          setAnimating(false);
          // Call onComplete callback after animation finishes
          if (onComplete) {
            setTimeout(() => onComplete(), 100);
          }
        }
      });
    };
    animateFrame(start);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !animating) {
      vanishAndSubmit();
    }
  };

  const isValidEmail = (email: string): boolean => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const vanishAndSubmit = () => {
    const value = inputRef.current?.value || "";

    // Validate email before animating
    if (!value) {
      if (onError) onError("Please enter an email address");
      return;
    }

    if (!isValidEmail(value)) {
      if (onError) onError("Please enter a valid email address");
      return;
    }

    setAnimating(true);
    draw();

    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanishAndSubmit();
    onSubmit && onSubmit(e);
  };
  return (
    <form
      className={cn(
        "relative mx-auto w-full text-4xl tracking-[-0.05em] text-brand-orange lg:!text-5xl"
      )}
      onSubmit={handleSubmit}
    >
      <canvas
        className={cn(
          "pointer-events-none absolute top-[10%] origin-top-left scale-50 transform pr-20 text-base lg:top-[12%]",
          !animating ? "opacity-0" : "opacity-100"
        )}
        ref={canvasRef}
      />
      <label className="flex items-center pr-2">
        <input
          type="text"
          name="email"
          onChange={(e) => {
            if (!animating) {
              setValue(e.target.value);
              onChange && onChange(e);
            }
          }}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          className={cn(
            "relative h-full w-full border-none bg-transparent pr-4 text-brand-orange placeholder:text-brand-orange/50 focus:outline-none focus:ring-0",
            animating && "text-transparent"
          )}
        />
        <button
          type="submit"
          className="rounded-6 flex h-full cursor-pointer items-center justify-center whitespace-nowrap pr-4 text-brand-orange hover:text-brand-orange/80 transition-colors"
        >
          {!value ? (
            <span className="text-3xl">→</span>
          ) : (
            <p className="pt-2 text-base tracking-tight opacity-50">[&nbsp;enter ↵&nbsp;]</p>
          )}
        </button>
      </label>
    </form>
  );
}

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");

  // Reset form when component mounts or becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isSubmitted) {
        // Reset form when page becomes visible again
        setTimeout(() => {
          setIsSubmitted(false);
          setErrorMessage(null);
          setSubmittedEmail("");
        }, 100);
      }
    };

    // Add visibility change listener
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isSubmitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the email value from the form
    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string) || submittedEmail;

    if (!email) return;

    // Save email to database
    const result = await saveUserInfo(email);

    if (result?.error) {
      setErrorMessage(result.error);
      setIsSubmitted(false);
    }
  };

  const handleComplete = () => {
    // Store the email value before it vanishes
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (input?.value) {
      setSubmittedEmail(input.value);
      // Create a synthetic form event to trigger onSubmit
      const form = input.closest("form");
      if (form) {
        const syntheticEvent = new Event("submit", { bubbles: true, cancelable: true });
        Object.defineProperty(syntheticEvent, "currentTarget", { value: form, writable: false });
        onSubmit(syntheticEvent as any);
      }
    }
    setIsSubmitted(true);
  };

  const handleError = (message: string) => {
    setErrorMessage(message);
  };

  return (
    <div
      className="min-h-screen bg-black text-brand-orange flex items-center justify-center"
      style={{
        paddingTop: "calc(var(--header-height) + 1rem)",
        paddingBottom: "calc(var(--header-height) + 1rem)",
      }}
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="space-y-8">
          <SplitText
            text="Contact Us"
            tag="h1"
            className="text-4xl font-normal text-brand-orange md:text-5xl"
            splitType="chars"
            delay={80}
            duration={0.8}
            textAlign="left"
          />
          <div className="border-b border-brand-orange/30 pb-4 min-h-[100px] flex flex-col">
            {!isSubmitted ? (
              <>
                <VanishForm
                  placeholder="Enter your email"
                  onChange={handleChange}
                  onSubmit={onSubmit}
                  onComplete={handleComplete}
                  onError={handleError}
                />
                {errorMessage && (
                  <p
                    className="text-red-500 text-sm mt-4 animate-fade-in"
                    style={{ animation: "fadeIn 0.3s ease-in forwards" }}
                  >
                    {errorMessage}
                  </p>
                )}
              </>
            ) : (
              <div className="w-full flex items-center">
                <p
                  className="text-4xl tracking-[-0.05em] text-brand-orange opacity-0 lg:text-5xl"
                  style={{ animation: "fadeIn 0.5s ease-in forwards" }}
                >
                  Thank you, we'll be in touch.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
