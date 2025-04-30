'use client';

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0f0c29] bg-gradient-to-br from-purple-700 via-blue-500 to-transparent relative overflow-hidden text-white">
      {/* SVG animado tipo "dibujado por código" */}
      <svg
        viewBox="0 0 500 150"
        className="w-[300px] h-[100px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-[40px] font-bold uppercase"
          stroke="#fff"
          strokeWidth="1"
          fill="transparent"
        >
          Intelliqbot
        </text>

        <path
          d="M20,80 Q100,10 200,80 T380,80"
          stroke="#ffffff33"
          strokeWidth="2"
          fill="transparent"
        >
          <animate
            attributeName="stroke-dasharray"
            from="0,200"
            to="200,0"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Difuminado final */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-transparent blur-3xl opacity-40 animate-pulse"></div>
    </div>
  );
}
