import React from 'react';

/* 
Potential replacement for WelcomePage. 
Includes the letters fading in and a changing gradient background.
*/


const AnimatedWelcome = () => { //declares functional component
  const title = "Data Analytics Hub";
  const description = "Swipe right to unlock insights about your messages, connections, and more.";
  const tip = "Tip: Trackpad or touch to swipe →";

  const css = `
    .animated-bg {
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd);
      background-size: 400% 400%;
      animation: gradientShift 15s ease infinite;
    }
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .fade-in-letter {
      opacity: 0;
      animation: fadeIn 0.5s ease forwards;
    }
    @keyframes fadeIn {
      to { opacity: 1; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="min-h-screen flex flex-col items-center justify-center text-white px-4 animated-bg">
        <h1 className="text-5xl font-bold mb-4 text-center">
          {title.split('').map((letter, index) => (
            <span key={index} className="fade-in-letter" style={{ animationDelay: `${index * 0.1}s` }}>
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        {/* Returns description letter by letter*/}
        <p className="text-gray-400 text-lg max-w-xl text-center mb-10">
          {description.split('').map((letter, index) => (
            <span key={index} className="fade-in-letter" style={{ animationDelay: `${(title.length + index) * 0.05}s` }}>
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </p>

        {/* Returns "Tip" letter by letter */}
        <p className="text-xs text-gray-500">
          {tip.split('').map((letter, index) => (
            <span key={index} className="fade-in-letter" style={{ animationDelay: `${(title.length + description.length + index) * 0.03}s` }}>
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </p>
      </div>
    </>
  );
};

export default AnimatedWelcome;