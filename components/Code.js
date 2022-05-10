import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

export default function Code({ code, language, nameLanguage }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div>
      <p style={{color: 'white',fontSize: '20px', background: '#2D2D2D', width: '100px'}}>
        {nameLanguage}
      </p>
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}