import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeLines: string[] = [
  'C:\\> import OpenAI from "openai";  ',
  '',
  'C:\\> async function chatWithAI(prompt: string) {',
  '  const openai = new OpenAI();',
  '  const response = await openai.chat.completions.create({',
  '    model: "gpt-4o-mini",',
  '    messages: [{ role: "user", content: prompt }],',
  '  });',
  '  return response.choices[0].message.content;',
  '}',
  '',
  'C:\\> chatWithAI("Hola").then(console.log);',
];

const TYPING_INTERVAL = 20; // ms por caracter (muy rápido)
const LINE_PAUSE = 100;    // ms entre líneas

export default function EditingCode() {
  const [displayText, setDisplayText] = useState<string>('');

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    function type() {
      if (lineIndex >= codeLines.length) return;
      const line = codeLines[lineIndex];
      if (charIndex <= line.length) {
        const prev = codeLines.slice(0, lineIndex).join('\n');
        const curr = line.slice(0, charIndex);
        setDisplayText(prev + (prev ? '\n' : '') + curr);
        charIndex++;
        timeout = setTimeout(type, TYPING_INTERVAL);
      } else {
        lineIndex++;
        charIndex = 0;
        timeout = setTimeout(type, LINE_PAUSE);
      }
    }

    type();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>      
    <motion.div className="retro-console"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <pre className="code-window">
        {displayText}
        <span className="cursor" />
      </pre>
    </motion.div>
    <style>{`
      .retro-console {
        font-family: "Press Start 2P", monospace;
        color: #00ff00;
        background: #001100;
        background-image: linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px);
        background-size: 100% 4px;
        border: 2px solid #00ff00;
        width: 100%;
        max-width: 600px;
        aspect-ratio: 2 / 1;
        margin: 0 auto;
        padding: 10px;
        box-sizing: border-box;
        overflow: hidden;
        box-shadow: 0 0 10px #00ff00;
        position: relative;
      }
      .retro-console::before {
        content: '';
        position: absolute;
        top: 2px;
        left: 8px;
        width: calc(100% - 16px);
        height: 4px;
        background: #002200;
      }
      .code-window {
        margin: 0;
        font-size: 12px;
        line-height: 1.4;
        white-space: pre-wrap;
        height: 100%;
        overflow: hidden;
        position: relative;
        padding-top: 6px;
      }
      .cursor {
        display: inline-block;
        width: 8px;
        background-color: #00ff00;
        animation: blink 0.6s steps(1) infinite;
        vertical-align: bottom;
      }
      @keyframes blink { 50% { background-color: transparent; } }
      @media (max-width: 400px) {
        .retro-console {
          max-width: 100%;
          aspect-ratio: unset;
          height: 200px;
          padding: 6px;
        }
        .code-window {
          font-size: 10px;
        }
      }
    `}</style>
    </>
  );
}
