import GlobalBackground from "./GlobalBackground";

export default function Page({ children }) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 -z-10">
        <GlobalBackground />
      </div>
      {children}
    </div>
  );
}
