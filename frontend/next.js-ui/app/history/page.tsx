"use client";

export default function History() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#101922] text-white font-display">
      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">
              YouTube Video Insights
            </h2>
            <p className="mt-3 text-lg text-gray-400">
              Paste a YouTube URL to chat with the video’s transcript and unlock
              key information.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <input
              className="flex-1 w-full rounded-lg border border-gray-700 bg-[#1a2530] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 px-4 py-3 outline-none"
              placeholder="https://www.youtube.com/watch?v=..."
              type="text"
            />
            <button className="flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 w-full sm:w-auto">
              Submit
            </button>
          </div>

          {/* Video Library */}
          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Your Video Library</h3>
              <button className="flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                Clear History
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  title: "Exploring the Depths of the Ocean",
                  desc: "A fascinating documentary about marine life.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmEzry2_Y2wYTgzEItNzuW9FSSJfuYUVSW1d1u2231exzYib6TZiLOpdX-fIeV7KwLMmPqhY8H8ms8yr14mkDxYZgMSuL-IZbxxjCEllJDbkamDi1Xg9SolqLYZEE2GqXJg4XJ-eEjxJ1gLBpjFw0SOPK_yAED77eLh_yryJZzz__Dne05ofLe218fZ0NESMts4J-K6egBDHTkfwk74b0etVgBAV-Y0KZqvFGLCo32YdVrwi-sRqpo1fmzBL_V3ii5SGEvd82lItI",
                },
                {
                  title: "The Future of Artificial Intelligence",
                  desc: "A discussion on the latest advancements in AI.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu-wNz-TmZScpF3jkbyITUzg6WNYeyzNyEYFf182WtcqcP5GfKHsUlAiKxjbcs0odCi3Dz5cIW0YJdLsYZixyiqvsVg-GUcpT68CY97FkPnJ6OBgkFjCjYtpeHSjgygxN-S25FcpufWhYLwNarZtKNJoePDqce4b_lcJ08Y_KOAQX54q2fWUN1bQ3_hzDiRjRN5nucXH930afsfxNE2rBDPasOiGmwVxRguW3DjDfGt6IseFwATZen83TuINriPjI7sYOR-t39VQ8",
                },
                {
                  title: "Cooking Masterclass with Chef Isabella",
                  desc: "Learn to cook gourmet meals with a renowned chef.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzl2S6d9UBjCruhIbII7W3rdn73L90uCLHRygcItYvJ3OBLRzmrL4mTaFVQYWL5O8mHxVjKlaVSuFXlLnY-IXX1sPl99V2_deF3XI6niS_2wzdSdM-vpvcBHtdVQd158uOCySWoCHTPPGo9n2BeREAQGIHpHArQt3hpFycQ7IAMkR1QzWU_mmIhl08t87jE9StEfr6C5UN-_IzIvdPhBNgogMAEmZnJcZC6oI3ZXaQmYkVqbpQA7PvhV6cq-lkuiDDHGs1uJkoZRM",
                },
              ].map((video, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start gap-6 rounded-xl p-4 border border-gray-800 bg-[#1b2734] hover:border-blue-500/50 transition-all"
                >
                  <div
                    className="w-full sm:w-48 aspect-video rounded-lg bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${video.img})` }}
                  ></div>
                  <div className="flex flex-col flex-grow justify-between">
                    <div>
                      <p className="text-lg font-bold">{video.title}</p>
                      <p className="text-sm text-gray-400 mt-1">{video.desc}</p>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <button className="w-full sm:w-auto flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
                        Chat Now
                      </button>
                      <button className="w-full sm:w-auto flex items-center justify-center rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-[#22303e]">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
