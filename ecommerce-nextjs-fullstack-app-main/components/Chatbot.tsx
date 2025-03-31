"use client";

import { useState, useEffect, useRef } from "react";

const chatbotResponses: Record<string, string> = {
  "best crops to sell": "The best crops to sell depend on demand and season. Currently, tomatoes, onions, are top-selling.",
  "how do i place an order?": "To place an order, browse the products, add items to your cart, and proceed to checkout.",
  "checkout issues": "If you face checkout issues, ensure your payment details are correct or contact support.",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    const userMessage = message.toLowerCase();
    const botReply = chatbotResponses[userMessage] ?? "I'm not sure about that. Try asking about crops or orders!";

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botReply },
      ]);
    }, 500); // Smooth delay for bot response

    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4">
      <div className="relative" ref={chatRef}>
        {/* Chatbot Button */}
        <button
          className="bg-black text-white px-4 py-2 rounded-full shadow-lg transition-all cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          Chat
        </button>

        {/* Chatbot Popup */}
        {isOpen && (
          <div className="absolute bottom-12 right-0 w-80 bg-white border rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">Farmer's Assistant</span>
              {/* Close Button */}
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">
                ✕
              </button>
            </div>

            {/* Predefined Questions */}
            <div className="mb-3">
              <p className="text-sm font-semibold mb-1">Quick Questions:</p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(chatbotResponses).map((question) => (
                  <button
                    key={question}
                    className="text-xs bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
                    onClick={() => handleSendMessage(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-40 overflow-y-auto border p-2 rounded-md bg-gray-100">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                  <span
                    className={`px-3 py-1 rounded-md inline-block transition-opacity duration-300 ${
                      msg.sender === "user" ? "bg-black text-white" : "bg-gray-300"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Field */}
            <div className="mt-2 flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-grow border px-2 py-1 rounded-l-md"
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
              />
              <button onClick={() => handleSendMessage(input)} className="bg-black text-white px-3 py-1 rounded-r-md">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
