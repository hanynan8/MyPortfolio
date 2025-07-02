import React from "react";
import "./LoaderLogo.css";

class LogoLoader extends React.Component {
  render() {
    const theme = this.props.theme;
    return (
      <div className="logo-loader-wrapper">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* دائرة خارجية */}
          <circle
            cx="100"
            cy="100"
            r="70" // قللنا نصف القطر
            stroke={theme.body}
            strokeWidth="6"
            fill="none"
            className="logo-circle"
          />
          {/* الحروف */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="72"
            fill={theme.body}
            className="logo-text"
          >
            H
          </text>
        </svg>
      </div>
    );
  }
}

export default LogoLoader;
