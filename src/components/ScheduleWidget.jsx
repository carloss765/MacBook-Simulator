import React from "react";

export default function ScheduleWidget() {
  const scheduleItems = [
    {
      id: 1,
      title: "Listen podcast",
      time: "2:30 - 3:00 PM",
      color: "bg-cyan-400",
    },
    {
      id: 2,
      title: "English class",
      time: "4:00 - 4:45 PM",
      color: "bg-purple-500",
    },
    {
      id: 3,
      title: "Stand-up meeting",
      time: "6:15 - 5:30 PM",
      color: "bg-green-500",
    },
  ];

  const today = new Date();
  const dayNumber = today.getDate();
  const dayName = today
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  return (
    <div className="w-80 h-96 bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 rounded-2xl p-6 text-white shadow-2xl">
      {/* Date Header */}
      <div className="mb-8">
        <div className="text-6xl font-bold leading-none">{dayNumber}</div>
        <div className="text-sm font-medium tracking-wider opacity-90">
          {dayName}
        </div>
      </div>

      {/* Schedule Items */}
      <div className="space-y-3">
        {scheduleItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/10"
          >
            {/* Color indicator */}
            <div className={`w-1 h-12 ${item.color} rounded-full mr-4`}></div>

            {/* Content */}
            <div className="flex-1">
              <div className="font-medium text-white">{item.title}</div>
              <div className="text-sm text-white/70">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
