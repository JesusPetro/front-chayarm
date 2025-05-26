import { Progress } from "../ui/Progress";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { useState, useEffect } from "react";

export default function PieceCounter() {
  const [counters, setCounters] = useState({
    used: 0,
    remaining: 100,
  });

  useEffect(() => {
    // Cargar contadores iniciales
    const savedCounters = localStorage.getItem("piecesCounter");
    if (savedCounters) {
      setCounters(JSON.parse(savedCounters));
    }

    // Escuchar eventos de ensamblaje completado
    const handleAssemblyCompleted = () => {
      const updatedCounters = JSON.parse(
        localStorage.getItem("piecesCounter") || "{}"
      );
      setCounters(updatedCounters);
    };

    window.addEventListener("assemblyCompleted", handleAssemblyCompleted);

    return () => {
      window.removeEventListener("assemblyCompleted", handleAssemblyCompleted);
    };
  }, []);

  const totalPieces = counters.used + counters.remaining;
  const usedPercentage =
    totalPieces > 0 ? (counters.used / totalPieces) * 100 : 0;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Conteo de Piezas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Piezas Utilizadas</span>
              <span className="text-sm font-medium">{counters.used}</span>
            </div>
            <Progress value={usedPercentage} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Piezas Restantes</span>
              <span className="text-sm font-medium">{counters.remaining}</span>
            </div>
            <Progress value={100 - usedPercentage} className="h-2" />
          </div>

          <div className="pt-2 border-t">
            <div className="flex justify-between">
              <span className="font-medium">Total de Piezas</span>
              <span className="font-medium">{totalPieces}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
