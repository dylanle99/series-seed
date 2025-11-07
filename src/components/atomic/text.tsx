"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TextProps {
  children: React.ReactNode;
  maxLines: number;
  className?: string;
}

export function Text({ children, maxLines, className }: TextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [truncatedContent, setTruncatedContent] = useState<React.ReactNode>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (!measureRef.current || !textRef.current) return;

      const textContent = children?.toString() || "";
      const textStyles = window.getComputedStyle(textRef.current);

      // Get accurate line height
      let lineHeight = parseFloat(textStyles.lineHeight);
      if (isNaN(lineHeight) || textStyles.lineHeight === "normal") {
        lineHeight = parseFloat(textStyles.fontSize) * 1.4; // More accurate fallback
      }

      const maxHeight = lineHeight * maxLines;

      // Copy exact styles from text element to measurement element
      const stylesToCopy = [
        "fontSize",
        "fontFamily",
        "fontWeight",
        "lineHeight",
        "letterSpacing",
        "wordSpacing",
        "textTransform",
      ];

      stylesToCopy.forEach((style) => {
        measureRef.current!.style[style as any] = textStyles[style as any];
      });

      // Set exact width
      measureRef.current.style.width = `${textRef.current.offsetWidth}px`;

      // Check if full text fits
      measureRef.current.innerHTML = textContent;
      if (measureRef.current.scrollHeight <= maxHeight) {
        setTruncatedContent(children);
        return;
      }

      // Binary search for the right amount of text that fits with "... More"
      let start = 0;
      let end = textContent.length;
      let bestFit = "";

      while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        const testText = textContent.substring(0, mid);

        // Test with "... More" appended
        measureRef.current.innerHTML = testText + "... More";

        if (measureRef.current.scrollHeight <= maxHeight) {
          bestFit = testText;
          start = mid + 1;
        } else {
          end = mid - 1;
        }
      }

      // Trim to last complete word
      const lastSpaceIndex = bestFit.lastIndexOf(" ");
      if (lastSpaceIndex > 0) {
        bestFit = bestFit.substring(0, lastSpaceIndex);
      }

      setTruncatedContent(
        <>
          {bestFit}...{" "}
          <button
            className="text-brand-orange font-medium hover:text-brand-orange/80 underline transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
          >
            More
          </button>
        </>
      );
    };

    // Use a small delay to ensure the text element is fully rendered
    const timeoutId = setTimeout(checkTruncation, 0);

    window.addEventListener("resize", checkTruncation);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkTruncation);
    };
  }, [children, maxLines]);

  return (
    <div>
      {/* Hidden element for measurement */}
      <div
        ref={measureRef}
        className={cn("absolute -top-[9999px] left-0 opacity-0 pointer-events-none", className)}
        style={{
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      />

      <div ref={textRef}>{isExpanded ? children : truncatedContent || children}</div>
    </div>
  );
}
