import React, { useState, useEffect } from "react";
import "./WindowAnimations.css";

export default function Mail(Params) {
  // Estados para el drag del componente
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Estados de Mail
  const [selectedFolder, setSelectedFolder] = useState("Inbox");
  const [selectedEmail, setSelectedEmail] = useState(1);
  const [_composing, setComposing] = useState(false);

  // Emails simulados
  const emails = {
    Inbox: [
      {
        id: 1,
        from: "Apple",
        subject: "Your Apple ID was used to sign in to iCloud",
        preview:
          "Your Apple ID (user@icloud.com) was used to sign in to iCloud on a Mac.",
        time: "2:30 PM",
        unread: true,
        content:
          "Hello,\n\nYour Apple ID (user@icloud.com) was used to sign in to iCloud on a Mac.\n\nDate and Time: December 15, 2023 at 2:30 PM PST\nDevice: MacBook Pro\nLocation: Cupertino, CA, United States\n\nIf this was you, you can safely disregard this email.\n\nIf this was not you, your account may be compromised. Go to Apple ID (appleid.apple.com) and change your password as soon as possible.\n\nSincerely,\nApple Support",
      },
      {
        id: 2,
        from: "GitHub",
        subject: "Your pull request was merged",
        preview:
          "Congratulations! Your pull request 'Add new feature' has been successfully merged.",
        time: "11:45 AM",
        unread: true,
        content:
          "Hi there!\n\nGreat news! Your pull request #123 'Add new feature' has been successfully merged into the main branch.\n\nRepository: username/awesome-project\nBranch: feature/new-functionality\nMerged by: @maintainer\n\nThank you for your contribution!\n\nBest regards,\nThe GitHub Team",
      },
      {
        id: 3,
        from: "Netflix",
        subject: "New shows added to your list",
        preview: "Check out these new arrivals that match your interests",
        time: "Yesterday",
        unread: false,
        content:
          "Hello!\n\nWe've added some exciting new shows that we think you'll love:\n\n• Stranger Things Season 5\n• The Crown Season 7\n• Wednesday Season 2\n\nStart watching now on Netflix!\n\nHappy streaming,\nThe Netflix Team",
      },
    ],
    Sent: [
      {
        id: 4,
        from: "Me",
        to: "john@example.com",
        subject: "Meeting tomorrow",
        preview: "Hi John, just confirming our meeting tomorrow at 3 PM.",
        time: "Yesterday",
        unread: false,
        content:
          "Hi John,\n\nJust wanted to confirm our meeting tomorrow at 3 PM in the conference room.\n\nI'll bring the project documents and we can go over the final details.\n\nLet me know if you need to reschedule.\n\nBest regards,\nYour Name",
      },
    ],
    Drafts: [
      {
        id: 5,
        from: "Me",
        subject: "Draft: Project proposal",
        preview: "Initial draft of the new project proposal...",
        time: "2 days ago",
        unread: false,
        content:
          "Subject: Project Proposal\n\nDear Team,\n\nI would like to propose a new project that could significantly improve our...",
      },
    ],
  };

  const folders = [
    { name: "Inbox", icon: "📥", count: 2 },
    { name: "Sent", icon: "📤", count: 0 },
    { name: "Drafts", icon: "📝", count: 1 },
    { name: "Archive", icon: "📦", count: 0 },
    { name: "Trash", icon: "🗑️", count: 0 },
  ];

  const getCurrentEmails = () => {
    return emails[selectedFolder] || [];
  };

  const getCurrentEmail = () => {
    const currentEmails = getCurrentEmails();
    return currentEmails.find((email) => email.id === selectedEmail);
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
      Params.handleAppClick("Mail");
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

  const currentEmail = getCurrentEmail();
  const currentEmails = getCurrentEmails();

  return (
    <div
      className={`${Params.isOpen?.has("Mail") ? "block" : "hidden"} ${
        isExpanded
          ? "fixed inset-0 top-[31.2px] z-[60]"
          : "fixed top-20 left-96 z-50"
      }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl select-none window-shadow ${
          isDragging ? "window-dragging" : "window-normal"
        } ${isExpanded ? "w-full h-full" : "w-[950px] h-[650px]"} ${
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
          <div className="text-gray-700 text-sm font-medium">Mail</div>

          {/* Spacer */}
          <div className="w-16"></div>
        </div>

        {/* Mail Content */}
        {!isMinimized && (
          <div className="flex h-full rounded-b-2xl overflow-hidden">
            {/* Sidebar */}
            <div className="w-56 bg-gray-50 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <button
                  onClick={() => setComposing(true)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-150 flex items-center justify-center space-x-2"
                >
                  <span>✏️</span>
                  <span>Compose</span>
                </button>
              </div>

              <div className="flex-1 p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Mailboxes
                </h3>
                <nav className="space-y-1">
                  {folders.map((folder) => (
                    <button
                      key={folder.name}
                      onClick={() => setSelectedFolder(folder.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-150 flex items-center justify-between ${
                        selectedFolder === folder.name
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{folder.icon}</span>
                        <span>{folder.name}</span>
                      </div>
                      {folder.count > 0 && (
                        <span className="bg-gray-400 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {folder.count}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Email List */}
            <div className="w-96 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedFolder}
                </h2>
                <p className="text-sm text-gray-500">
                  {currentEmails.length} messages
                </p>
              </div>

              <div className="flex-1 overflow-y-auto">
                {currentEmails.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => setSelectedEmail(email.id)}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                      selectedEmail === email.id
                        ? "bg-blue-50 border-l-4 border-l-blue-600"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`font-medium text-sm ${
                          email.unread ? "text-gray-900" : "text-gray-600"
                        }`}
                      >
                        {email.from}
                      </span>
                      <span className="text-xs text-gray-500">
                        {email.time}
                      </span>
                    </div>
                    <h3
                      className={`font-medium text-sm mb-1 ${
                        email.unread ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {email.subject}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {email.preview}
                    </p>
                    {email.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Email Content */}
            <div className="flex-1 flex flex-col">
              {currentEmail && (
                <>
                  {/* Email Header */}
                  <div className="p-6 border-b border-gray-200 bg-white">
                    <h1 className="text-xl font-semibold text-gray-900 mb-2">
                      {currentEmail.subject}
                    </h1>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {currentEmail.from.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {currentEmail.from}
                          </p>
                          {currentEmail.to && (
                            <p className="text-sm text-gray-500">
                              to {currentEmail.to}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {currentEmail.time}
                      </div>
                    </div>
                  </div>

                  {/* Email Body */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-gray-900 leading-relaxed">
                        {currentEmail.content}
                      </pre>
                    </div>
                  </div>

                  {/* Email Actions */}
                  <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150">
                      Reply
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-150">
                      Forward
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-150">
                      Archive
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-150">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
