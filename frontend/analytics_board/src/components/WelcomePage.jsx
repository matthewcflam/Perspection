const WelcomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-4">
      <h1 className="text-5xl font-bold mb-4 text-center">
        Data Analytics Hub
      </h1>
      <p className="text-gray-400 text-lg max-w-xl text-center mb-10">
        Swipe right to  unlock insights about your messages, connections, and more.
      </p>
      <p className="text-xs text-gray-500">Tip: Trackpad or touch to swipe →</p>
    </div>
  );
};

export default WelcomePage;
