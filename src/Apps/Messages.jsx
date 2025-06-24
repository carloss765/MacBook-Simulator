import React, { useState, useEffect } from "react";
import "./WindowAnimations.css";

export default function Messages(Params) {
  // Estados para el drag del componente
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Estados de Messages
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  // Conversaciones simuladas
  const [conversations] = useState([
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey! How are you doing?",
      time: "2:30 PM",
      unread: 2,
      avatar: "👨‍💼",
      messages: [
        {
          id: 1,
          text: "Hey! How are you doing?",
          sender: "John Doe",
          time: "2:28 PM",
          isMine: false,
        },
        {
          id: 2,
          text: "I'm doing great! Thanks for asking",
          sender: "Me",
          time: "2:29 PM",
          isMine: true,
        },
        {
          id: 3,
          text: "What about you?",
          sender: "Me",
          time: "2:29 PM",
          isMine: true,
        },
        {
          id: 4,
          text: "I'm good too! Working on some new projects",
          sender: "John Doe",
          time: "2:30 PM",
          isMine: false,
        },
      ],
    },
    {
      id: 2,
      name: "Sarah Wilson",
      lastMessage: "Perfect! See you tomorrow",
      time: "1:45 PM",
      unread: 0,
      avatar: "👩‍🎨",
      messages: [
        {
          id: 1,
          text: "Are we still on for lunch tomorrow?",
          sender: "Sarah Wilson",
          time: "1:40 PM",
          isMine: false,
        },
        {
          id: 2,
          text: "Yes! Looking forward to it",
          sender: "Me",
          time: "1:42 PM",
          isMine: true,
        },
        {
          id: 3,
          text: "Perfect! See you tomorrow",
          sender: "Sarah Wilson",
          time: "1:45 PM",
          isMine: false,
        },
      ],
    },
    {
      id: 3,
      name: "Team Chat",
      lastMessage: "Meeting moved to 3 PM",
      time: "11:20 AM",
      unread: 1,
      avatar: "👥",
      messages: [
        {
          id: 1,
          text: "Quick update: Meeting moved to 3 PM",
          sender: "Mike",
          time: "11:20 AM",
          isMine: false,
        },
        {
          id: 2,
          text: "Thanks for the heads up!",
          sender: "Me",
          time: "11:21 AM",
          isMine: true,
        },
      ],
    },
    {
      id: 4,
      name: "Mom",
      lastMessage: "Love you too! ❤️",
      time: "Yesterday",
      unread: 0,
      avatar: "👩‍❤️‍👨",
      messages: [
        {
          id: 1,
          text: "Hope you're eating well at work",
          sender: "Mom",
          time: "Yesterday",
          isMine: false,
        },
        {
          id: 2,
          text: "I am mom, don't worry",
          sender: "Me",
          time: "Yesterday",
          isMine: true,
        },
        {
          id: 3,
          text: "Love you! ❤️",
          sender: "Me",
          time: "Yesterday",
          isMine: true,
        },
        {
          id: 4,
          text: "Love you too! ❤️",
          sender: "Mom",
          time: "Yesterday",
          isMine: false,
        },
      ],
    },
  ]);

  const getCurrentConversation = () => {
    return conversations.find((conv) => conv.id === selectedConversation);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const currentConv = getCurrentConversation();
    if (currentConv) {
      const newMsg = {
        id: currentConv.messages.length + 1,
        text: newMessage,
        sender: "Me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMine: true,
      };
      currentConv.messages.push(newMsg);
      currentConv.lastMessage = newMessage;
      currentConv.time = "now";
    }
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Manejar inicio de arrastre
  const handleMouseDown = (e) => {
    if (e.target.closest(".window-controls")) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Manejar arrastre
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    requestAnimationFrame(() => {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    });
  };

  // Finalizar arrastre
  const handleMouseUp = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Event listeners para el drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleMouseUp, { passive: false });
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "";
        document.body.style.webkitUserSelect = "";
      };
    }
  }, [isDragging, dragStart, position]);

  // Función para cerrar la aplicación
  const handleClose = () => {
    if (Params.handleAppClick) {
      Params.handleAppClick("Messages");
    }
  };

  // Función para minimizar
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Función para expandir
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // When expanding to fullscreen, reset position to cover entire screen except navbar
      setPosition({ x: 0, y: 0 });
    }
  };

  const currentConversation = getCurrentConversation();

  return (
    <div
      className={`${Params.isOpen?.has("Messages") ? "block" : "hidden"} ${
        isExpanded
          ? "fixed inset-0 top-[31.2px] z-[60]"
          : "fixed top-20 left-48 z-50"
      }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl select-none window-shadow ${
          isDragging ? "window-dragging" : "window-normal"
        } ${isExpanded ? "w-full h-full" : "w-[850px] h-[600px]"} ${
          isMinimized ? "h-8" : ""
        }`}
        style={{
          transform: isExpanded
            ? "none"
            : `translate3d(${position.x}px, ${position.y}px, 0)`,
          cursor: isDragging ? "grabbing" : "grab",
          willChange: isDragging ? "transform" : "auto",
        }}
      >
        {/* Window Header */}
        <div
          className="h-8 bg-gray-100 rounded-t-2xl flex items-center justify-between px-4 cursor-grab active:cursor-grabbing select-none border-b border-gray-200"
          onMouseDown={handleMouseDown}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {/* Window Controls */}
          <div className="window-controls flex items-center space-x-2">
            <button
              onClick={handleClose}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-150 flex items-center justify-center group"
            >
              <span className="text-white text-xs opacity-0 group-hover:opacity-100 font-bold leading-none">
                ×
              </span>
            </button>
            <button
              onClick={handleMinimize}
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors duration-150 flex items-center justify-center group"
            >
              <span className="text-white text-xs opacity-0 group-hover:opacity-100 font-bold leading-none">
                -
              </span>
            </button>
            <button
              onClick={handleExpand}
              className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors duration-150 flex items-center justify-center group"
            >
              <span className="text-white text-xs opacity-0 group-hover:opacity-100 font-bold leading-none">
                +
              </span>
            </button>
          </div>

          {/* Window Title */}
          <div className="text-gray-700 text-sm font-medium">Messages</div>

          {/* Spacer */}
          <div className="w-16"></div>
        </div>

        {/* Messages Content */}
        {!isMinimized && (
          <div className="flex h-full bg-white rounded-b-2xl overflow-hidden">
            {/* Conversations List */}
            <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Messages
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors duration-150 ${
                      selectedConversation === conversation.id
                        ? "bg-blue-100"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{conversation.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 truncate">
                            {conversation.name}
                          </p>
                          <span className="text-xs text-gray-500">
                            {conversation.time}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unread > 0 && (
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{currentConversation?.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {currentConversation?.name}
                    </h3>
                    <p className="text-sm text-green-600">Online</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentConversation?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isMine ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.isMine
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isMine ? "text-blue-200" : "text-gray-500"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-3">
                  <button className="text-gray-400 hover:text-gray-600">
                    📎
                  </button>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className={`p-2 rounded-full transition-colors duration-150 ${
                      newMessage.trim()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    ➤
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
