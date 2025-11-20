import InstagramMessages from "./components/InstagramMessages";
import InstagramFollow   from "./components/InstagramFollow";
import InstagramLikes    from "./components/InstagramLikes"
import NavBar    from "./components/NavBar";
import Board      from "./components/Board";

const App = () => {
  return (
    <main className="mx-auto max-w-7xl overflow-x-hidden antialiased">
      <div className="bg-image fixed inset-0 bg-cover bg-fixed bg-center" />

      <div className="relative z-10">
        <NavBar />
        {/* ===== BOARD 2 (Instagram) ===== */}
        <Board>
          {/* Slide 1 */}
          <section className="h-full flex items-center">
            <InstagramFollow />
          </section>

          {/* Slide 2 */}
          <section className="h-full flex items-center">
            {/* e.g., “Featured project” / embedded-only projects */}
            <InstagramMessages />
          </section>

          {/* Slide 3 */}
          <section className="h-full flex items-center">
            <InstagramLikes />
          </section>
        </Board>
      </div>
    </main>
  );
};

export default App;