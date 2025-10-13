'use client'

import { useState, useEffect } from 'react'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if the device is a mobile device (iOS or Android)
    const checkMobileDevice = () => {
      // More comprehensive checks for iOS devices
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        // iPadOS 13+ detection
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ||
        // Additional iPad detection
        /iPad/.test(navigator.platform) ||
        // iOS 13+ iPad detection
        (navigator.userAgent.includes("Mac") && "ontouchend" in document);

      // Android detection
      const isAndroid = /Android/.test(navigator.userAgent);

      // Additional mobile detection as fallback
      const isMobileViaVendor =
        /iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      setIsMobile(isIOS || isAndroid || isMobileViaVendor);
    };

    checkMobileDevice();
    window.addEventListener("resize", checkMobileDevice);

    return () => {
      window.removeEventListener("resize", checkMobileDevice);
    };
  }, []);

  return isMobile
} 