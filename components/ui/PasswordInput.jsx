"use client";

import { css, cx } from "@emotion/css";
import { useState } from "react";
import { input } from "@/styles/ui";

export const PasswordInput = ({ text, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={css`
        position: relative;
      `}
    >
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        className={cx(input, css`padding-right: 46px;`)}
        onChange={(e) => onChange(e.target.value)}
        placeholder={text}
      />
      <div
        onClick={() => setShowPassword((prev) => !prev)}
        className={css`
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          cursor: pointer;
          background: url('/eye-icon.svg') no-repeat center;
          background-size: contain;
        `}
      ></div>
    </div>
  );
};
