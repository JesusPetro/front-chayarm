import CharacterCreator from "./components/CharacterCreator";
import PieceCounter from "./components/PieceCounter";
import AssemblyHistory from "./components/AssemblyHistory";
import TeamInfo from "./components/TeamInfo";
import { ThemeToggle } from "./components/ThemeToggle";
import WelcomeGuide from "./components/WelcomeGuide";

export default function Home() {
  // Usando async/await
  async function hacerGet(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      console.log("Datos recibidos:", data);
      return data;
    } catch (error) {
      console.error("Error en la petición GET:", error);
    }
  }

  // Uso:
  console.log(hacerGet("https://backend-chayarm.onrender.com/"));

  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-2 text">
              C.H.A.Y.A.R.M
            </h1>
            <p className="text-lg text-muted-foreground">
              Controlador Híbrido Automatizado y Articulado para el Reensamblaje
              de Muñecos
            </p>
          </div>
          <div className="flex-none">
            <ThemeToggle />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CharacterCreator />
          </div>
          <div className="space-y-8">
            <AssemblyHistory />
          </div>
        </div>
        <TeamInfo />
      </div>
      <WelcomeGuide />
    </main>
  );
}
