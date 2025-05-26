import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface AssemblyRecord {
  id: number;
  head: string;
  torso: string;
  legs: string;
  timestamp: string;
}

export default function AssemblyHistory() {
  const [history, setHistory] = useState<AssemblyRecord[]>([]);

  useEffect(() => {
    // Cargar historial inicial
    const savedHistory = localStorage.getItem("assemblyHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    // Escuchar eventos de ensamblaje completado
    const handleAssemblyCompleted = () => {
      const updatedHistory = JSON.parse(
        localStorage.getItem("assemblyHistory") || "[]"
      );
      setHistory(updatedHistory);
    };

    window.addEventListener("assemblyCompleted", handleAssemblyCompleted);

    return () => {
      window.removeEventListener("assemblyCompleted", handleAssemblyCompleted);
    };
  }, []);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Historial de Ensambles</CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No hay ensambles registrados
          </p>
        ) : (
          <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {history.map((record) => (
              <li
                key={record.id}
                className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: record.head }}
                    ></div>
                    <div
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: record.head }}
                    ></div>
                    <div
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: record.legs }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(record.timestamp), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </div>
                </div>
                <div className="text-sm">
                  Personaje con cabeza {getColorName(record.head)} y piernas{" "}
                  {getColorName(record.legs)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

// Función auxiliar para obtener el nombre del color
function getColorName(hexColor: string): string {
  const colorMap: Record<string, string> = {
    "#D3D3D3": "gris",
    "#FFD700": "dorada",
    "#FF6347": "rojo",
    "#98FB98": "verde claro",
    "#87CEFA": "azul claro",
    "#001F3F": "azul marino",
    "#2ECC40": "verde",
    "#0074D9": "azul",
    "#6495ED": "azul medio",
    "#9370DB": "púrpura",
  };

  return colorMap[hexColor] || "desconocido";
}
