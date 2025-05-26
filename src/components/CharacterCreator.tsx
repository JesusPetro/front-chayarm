import { Button } from "../ui/Button";
import TooltipHelper from "./TooltipHelper";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

// Colores disponibles para las piezas
const COLORS = {
  HEAD: ["#D3D3D3", "#FFD700", "#FF6347"],
  LEGS: ["#D3D3D3", "#FFD700", "#FF6347"],
};

type BodyPart = "HEAD" | "LEGS";

export default function CharacterCreator() {
  const [headIndex, setHeadIndex] = useState(0);
  const [legsIndex, setLegsIndex] = useState(1);
  const [assembling, setAssembling] = useState(false);

  // Función para cambiar el índice de color de una parte del cuerpo
  const changePartColor = (part: BodyPart, direction: "next" | "prev") => {
    const colors = COLORS[part];
    switch (part) {
      case "HEAD":
        setHeadIndex((prevIndex) => {
          if (direction === "next") return (prevIndex + 1) % colors.length;
          return prevIndex === 0 ? colors.length - 1 : prevIndex - 1;
        });
        break;
      case "LEGS":
        setLegsIndex((prevIndex) => {
          if (direction === "next") return (prevIndex + 1) % colors.length;
          return prevIndex === 0 ? colors.length - 1 : prevIndex - 1;
        });
        break;
    }
  };

  // Función para ensamblar el muñeco
  const assembleCharacter = async () => {
    setAssembling(true);

    // Aquí iría la lógica para comunicarse con el ESP32
    // Simulamos un tiempo de ensamblaje
    /* fetch("http://127.0.0.1:8000/esp32/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        head: COLORS.HEAD[headIndex],
        body: COLORS.LEGS[legsIndex],
      }),
    }); */
    /* 
    const id = JSON.stringify({
      head: COLORS.HEAD[headIndex].replace("#", ""),  
      body: COLORS.LEGS[legsIndex].replace("#", ""),
    }); */

    const head = COLORS.HEAD[headIndex].replace("#", "");
    const leg = COLORS.LEGS[legsIndex].replace("#", "");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/esp32/?head=${head}&body=${leg}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching item ", error);
    }

    setTimeout(() => {
      // Añadir al historial
      const newAssembly = {
        id: Date.now(),
        head: COLORS.HEAD[headIndex],
        legs: COLORS.LEGS[legsIndex],
        timestamp: new Date().toISOString(),
      };

      // Guardar en localStorage
      const history = JSON.parse(
        localStorage.getItem("assemblyHistory") || "[]"
      );
      localStorage.setItem(
        "assemblyHistory",
        JSON.stringify([newAssembly, ...history].slice(0, 10))
      );

      // Actualizar contadores
      const counters = JSON.parse(
        localStorage.getItem("piecesCounter") ||
          JSON.stringify({
            used: 0,
            remaining: 100,
          })
      );

      localStorage.setItem(
        "piecesCounter",
        JSON.stringify({
          used: counters.used + 3, // 3 piezas por muñeco
          remaining: counters.remaining - 3,
        })
      );

      setAssembling(false);

      // Disparar un evento personalizado para que otros componentes se actualicen
      window.dispatchEvent(new CustomEvent("assemblyCompleted"));
    }, 2000);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Creador de Personajes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center p-6 bg-gray-800 dark:bg-gray-900 rounded-lg">
          {/* Cabeza */}
          <div
            className="relative mb-4"
            style={{ width: "14%", margin: "0 auto" }}
          >
            <TooltipHelper text="Cambiar a color anterior">
              <button
                onClick={() => changePartColor("HEAD", "prev")}
                className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 text-white"
                aria-label="Cabeza anterior"
              >
                <ChevronLeft size={20} />
              </button>
            </TooltipHelper>

            <svg
              className="w-auto h-auto"
              viewBox="0 0 267 281"
              preserveAspectRatio="xMidYMid meet"
              fill={COLORS.HEAD[headIndex]}
            >
              <g
                transform="translate(0.000000,281.000000) scale(0.100000,-0.100000)"
                stroke="none"
              >
                <path
                  d="M835 2790 c-144 -8 -296 -34 -388 -66 -130 -46 -289 -190 -352 -318
-50 -102 -64 -170 -76 -361 -14 -219 -6 -1260 10 -1365 17 -111 47 -191 100
-272 111 -169 263 -270 484 -323 425 -101 1069 -97 1482 10 154 39 334 159
418 277 106 150 124 225 137 563 19 503 6 1167 -24 1316 -49 236 -243 435
-481 494 -172 42 -228 46 -700 50 -253 2 -527 0 -610 -5z"
                />
              </g>
            </svg>

            <TooltipHelper text="Cambiar a color siguiente">
              <button
                onClick={() => changePartColor("HEAD", "next")}
                className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 text-white"
                aria-label="Cabeza siguiente"
              >
                <ChevronRight size={20} />
              </button>
            </TooltipHelper>
          </div>

          {/* Torso */}
          <div
            className="relative mb-1"
            style={{ width: "45%", margin: "0 auto" }}
          >
            <div className="flex w-full">
              {/* Brazo izquierdo: 25% */}
              <div className="basis-[25%]">
                <svg
                  className="w-full h-auto"
                  viewBox="0 0 238 478"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                  fill={COLORS.HEAD[headIndex]}
                >
                  <path d="M16.5 477L1 461V15.5L16.5 1H223L237.5 15.5V461L223 477H16.5Z" />
                </svg>
              </div>

              {/* Cuerpo: 50% */}
              <div className="basis-[50%]">
                <svg
                  className="w-full h-auto"
                  viewBox="0 0 475 476"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                  fill="red"
                >
                  <path d="M14.5 475.5L1 461.5V17L14.5 1H461.5L474.5 17V461.5L461.5 475.5H14.5Z" />
                </svg>
              </div>

              {/* Brazo derecho: 25% */}
              <div className="basis-[25%]">
                <svg
                  className="w-full h-auto"
                  viewBox="0 0 238 478"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                  fill={COLORS.HEAD[headIndex]}
                >
                  <path d="M16.5 477L1 461V15.5L16.5 1H223L237.5 15.5V461L223 477H16.5Z" />
                </svg>
              </div>
            </div>
          </div>

          {/* patas */}
          <div
            className="relative mb-4"
            style={{ width: "22%", margin: "0 auto" }}
          >
            {/* Flecha anterior */}
            <TooltipHelper text="Cambiar a color anterior">
              <button
                onClick={() => changePartColor("LEGS", "prev")}
                className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 text-white"
                aria-label="Piernas anteriores"
              >
                <ChevronLeft size={20} />
              </button>
            </TooltipHelper>

            {/* SVG de las patas, ocupa todo el espacio interior */}
            <svg
              className="w-full h-auto"
              viewBox="0 0 475 476"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                transform="translate(0,478) scale(0.1,-0.1)"
                fill={COLORS.LEGS[legsIndex]}
                stroke="none"
              >
                <path d="M82 4691 l-72 -80 0 -2218 0 -2218 76 -77 77 -78 1031 0 1031 0 77 77 78 78 78 -78 77 -77 1030 0 1030 0 78 78 77 77 0 2218 0 2218 -72 80 -72 79 -1035 0 -1036 0 -77 -77 -78 -78 -78 78 -77 77 -1036 0 -1035 0 -72 -79z" />
              </g>
            </svg>

            {/* Flecha siguiente */}
            <TooltipHelper text="Cambiar a color siguiente">
              <button
                onClick={() => changePartColor("LEGS", "next")}
                className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 text-white"
                aria-label="Piernas siguientes"
              >
                <ChevronRight size={20} />
              </button>
            </TooltipHelper>
          </div>

          <p className="text-white text-sm mt-4">
            Usa las flechas para cambiar cada parte del cuerpo
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <TooltipHelper text="Envía las instrucciones al brazo robótico para ensamblar el personaje">
          <Button
            onClick={assembleCharacter}
            disabled={assembling}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {assembling ? "Ensamblando..." : "Ensamblar Personaje"}
            {!assembling && <Send className="ml-2 h-4 w-4" />}
          </Button>
        </TooltipHelper>
      </CardFooter>
    </Card>
  );
}
