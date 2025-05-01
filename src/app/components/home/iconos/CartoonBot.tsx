import React from 'react';
import { motion } from 'framer-motion';

export default function CartoonChatbotScene() {
  return (
    <div className="chat-scene">
      <div className="chatbot">
        <div className="bot-head">
          <div className="eyes">
            <div className="eye"></div>
            <div className="eye"></div>
          </div>
          <div className="antenna"></div>
        </div>
        <div className="bot-body">INTELLIQBOT</div>
      </div>

      <div className="chat-bubble user">Hola, tengo un problema.</div>
      <motion.div className="chat-bubble bot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        Hola bro, bienvenido a IntelliqBot, cuéntame cómo te puedo ayudar.
      </motion.div>
      <div className="chat-bubble user">Quiero un chatbot para mi ecommerce que maneje inventario.</div>
      <motion.div className="chat-bubble bot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        ¡Con gusto! Necesito preguntarte algunas cosas para entender mejor lo que quieres...
      </motion.div>

      <style jsx>{`
        .chat-scene {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          background: #f4f4f4;
          border-radius: 16px;
          font-family: 'Comic Sans MS', cursive, sans-serif;
          position: relative;
        }
        .chatbot {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        .bot-head {
          background: #00c8ff;
          border-radius: 50%;
          width: 100px;
          height: 100px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .eyes {
          display: flex;
          gap: 10px;
        }
        .eye {
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
        }
        .antenna {
          position: absolute;
          top: -20px;
          width: 4px;
          height: 20px;
          background: #00c8ff;
          border-radius: 2px;
        }
        .bot-body {
          background: #00aaff;
          padding: 10px 20px;
          border-radius: 12px;
          margin-top: 10px;
          color: white;
          font-weight: bold;
        }
        .chat-bubble {
          max-width: 80%;
          padding: 10px 15px;
          margin: 10px 0;
          border-radius: 16px;
          position: relative;
          font-size: 14px;
        }
        .chat-bubble.user {
          align-self: flex-end;
          background: #d0eaff;
          border-bottom-right-radius: 0;
        }
        .chat-bubble.bot {
          align-self: flex-start;
          background: #e0ffd0;
          border-bottom-left-radius: 0;
        }
        @media (max-width: 600px) {
          .chat-scene {
            padding: 10px;
          }
          .chat-bubble {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
