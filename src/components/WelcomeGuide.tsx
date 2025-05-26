import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import Img from "../assets/seleccion.png";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";

export default function WelcomeGuide() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  useEffect(() => {
    // Para pruebas: siempre mostrar la guía
    setOpen(true);

    // Versión original:
    // const hasSeenGuide = localStorage.getItem("hasSeenGuide")
    // if (!hasSeenGuide) {
    //   setOpen(true)
    // }
  }, []);

  const handleClose = () => {
    // Comentado para pruebas:
    // localStorage.setItem("hasSeenGuide", "true")
    setOpen(false);
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bienvenido a C.H.A.Y.A.R.M.</DialogTitle>
            <DialogDescription>
              Guía rápida para usar la interfaz del brazo ensamblador
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {step === 1 && (
              <div className="space-y-2">
                <h3 className="font-medium">1. Creador de Personajes</h3>
                <p className="text-sm text-muted-foreground">
                  Usa las flechas para cambiar los colores de cada parte del
                  muñeco. Puedes personalizar la cabeza, el torso y las piernas.
                </p>
                <div className="border rounded p-2 mt-2">
                  <img
                    src={Img}
                    alt="Creador de personajes"
                    className="mx-auto"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-2">
                <h3 className="font-medium">2. Ensamblar Personaje</h3>
                <p className="text-sm text-muted-foreground">
                  Una vez que hayas diseñado tu personaje, haz clic en el botón
                  "Ensamblar Personaje" para que el brazo robótico comience a
                  construirlo.
                </p>
                <div className="border rounded p-2 mt-2 text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Ensamblar Personaje
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-2">
                <h3 className="font-medium">3. Contador de Piezas</h3>
                <p className="text-sm text-muted-foreground">
                  El panel de contador te muestra cuántas piezas se han
                  utilizado y cuántas quedan disponibles. Se actualiza
                  automáticamente después de cada ensamblaje.
                </p>
                <div className="border rounded p-2 mt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Piezas Utilizadas</span>
                      <span>12</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-[40%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-2">
                <h3 className="font-medium">4. Historial de Ensambles</h3>
                <p className="text-sm text-muted-foreground">
                  Aquí puedes ver los últimos muñecos que has ensamblado, con
                  detalles sobre los colores utilizados y cuándo fueron creados.
                </p>
                <div className="border rounded p-2 mt-2">
                  <div className="text-sm p-2">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div className="w-3 h-3 rounded-sm bg-blue-900"></div>
                        <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        hace 5 minutos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Paso {step} de {totalSteps}
            </div>
            <div className="flex gap-2">
              {step > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  Anterior
                </Button>
              )}
              <Button onClick={nextStep}>
                {step === totalSteps ? "Finalizar" : "Siguiente"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          className="rounded-full h-10 w-10 p-0 shadow-lg"
          onClick={() => setOpen(true)}
        >
          ?
        </Button>
      </div>
    </>
  );
}
