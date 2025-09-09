"use client";

import { css, cx } from "@emotion/css";
import { useState } from "react";
import { input } from "@/styles/ui";
import Eye from "@/public/images/svg/eye.svg";
import EyeOff from "@/public/images/svg/eye_off.svg";

export const PasswordInput = ({ text, value, onChange, style }) => {
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
        className={cx(input, css`padding-right: 46px; border: 1px solid #fff;`)}
        onChange={(e) => onChange(e.target.value)}
        placeholder={text}
		style={style}
      />
      <div
        onClick={() => setShowPassword((prev) => !prev)}
        className={css`
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          cursor: pointer;
        `}
      >
		{showPassword ? <Eye/> : <EyeOff/>}
	  </div>
    </div>
  );
};
