import GibbyChat from "../components/GibbyChat";

export default function GibbyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] pt-8 px-4 sm:px-6 lg:px-8 bg-[url('/noise.svg')] bg-repeat opacity-100">
      <div className="max-w-5xl mx-auto py-8">
        <div className="mb-8 pl-4">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Gibby AI Assistant</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">Your personalized guide to environmental restoration in Ghana.</p>
        </div>
        <GibbyChat />
      </div>
    </div>
  );
}
