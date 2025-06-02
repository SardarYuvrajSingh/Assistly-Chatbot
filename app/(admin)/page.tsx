"use client";
import { useState, useEffect } from "react";

// Avatar component using DiceBear rings collection
type AvatarProps = {
  seed: string;
  className?: string;
};

function Avatar({ seed, className }: AvatarProps) {
  // Using DiceBear API with rings collection
  const avatarUrl = `https://api.dicebear.com/7.x/rings/svg?seed=${seed}`;

  return <img src={avatarUrl} alt="User Avatar" className={className} />;
}

export default function Home() {
  const [avatarSeed, setAvatarSeed] = useState("assistly-bot");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const regenerateAvatar = () => {
    setAvatarSeed(Math.random().toString(36).substring(7));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* Avatar Section */}
          <div
            className={`w-full flex justify-center lg:flex-1 lg:justify-start transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl sm:blur-3xl opacity-20 sm:opacity-30 animate-pulse scale-150"></div>

              {/* Main avatar container */}
              <div
                className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] cursor-pointer group"
                onClick={regenerateAvatar}
              >
                {/* 3D spinning avatar */}
                <div className="w-full h-full rounded-full overflow-hidden shadow-xl sm:shadow-2xl transform transition-all duration-300 group-hover:scale-105 animate-spin-slow">
                  <Avatar
                    seed={avatarSeed}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating particles effect - adjusted for mobile */}
                <div className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 rounded-full animate-bounce opacity-70"></div>
                <div className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-bounce delay-300 opacity-70"></div>
                <div className="absolute top-1/4 -left-4 sm:-left-8 w-2 h-2 sm:w-3 sm:h-3 bg-indigo-400 rounded-full animate-bounce delay-500 opacity-70"></div>
                <div className="absolute top-3/4 -right-4 sm:-right-8 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-700 opacity-70"></div>

                {/* Click hint */}
                <div className="absolute -bottom-8 sm:-bottom-10 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Tap to change avatar
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div
            className={`w-full text-center lg:flex-1 lg:text-left space-y-6 sm:space-y-8 transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Main heading */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold animate-gradient-x">
                  Assistly
                </span>
              </h1>

              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto lg:mx-0 rounded-full"></div>
            </div>

            {/* Subtitle */}
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-full lg:max-w-2xl">
              Your customizable AI chat agent that revolutionizes customer
              conversations with intelligent,
              <span className="text-blue-600 font-semibold">
                {" "}
                adaptive responses
              </span>{" "}
              and
              <span className="text-purple-600 font-semibold">
                {" "}
                seamless integration
              </span>
              .
            </h2>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12">
              <div className="group p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border border-white/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  Smart Conversations
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  AI-powered responses that understand context and provide
                  meaningful interactions.
                </p>
              </div>

              <div className="group p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border border-white/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  Fully Customizable
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Tailor your AI assistant's personality, responses, and
                  behavior to match your brand.
                </p>
              </div>

              <div className="group p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border border-white/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h4v11H3zM10 3h4v18h-4zM17 6h4v15h-4z"
                    />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  Analytics & Insights
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Track conversations, monitor performance, and gain valuable
                  customer insights.
                </p>
              </div>

              <div className="group p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border border-white/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  Lightning Fast
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Instant responses and real-time processing for seamless user
                  experiences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating background elements - hidden on mobile for performance */}
        <div className="hidden sm:block absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="hidden sm:block absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="hidden sm:block absolute -bottom-8 left-40 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </main>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}