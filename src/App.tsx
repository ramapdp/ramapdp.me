import Navbar from "@layouts/navbar/index";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-transparent">Welcome to My Portfolio</h1>
          <p className="mt-4 text-transparent">This is a sample portfolio built with React and Tailwind CSS.</p>
        </main>
      </div>
    </>
  );
}

export default App;
