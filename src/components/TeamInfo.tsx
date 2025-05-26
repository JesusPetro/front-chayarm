import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

interface TeamMember {
  name: string;
  role: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  { name: "Victor Chamorro", role: "Lider & Jefe de simulación" },
  {
    name: "Yhonatan Quiñonez",
    role: "Jefe de simulación & Jefe de prototipado",
  },
  {
    name: "Aliveette",
    role: "Editora de comunicación de diseño & Jefa de compras",
  },
  { name: "Willian Navarro", role: "Oficial de seguridad" },
  { name: "Jesús Petro", role: "Jefe de prototipado" },
];

export default function TeamInfo() {
  return (
    <Card className="shadow-lg mt-12">
      <CardHeader>
        <CardTitle className="text-center">Equipo C.H.A.Y.A.R.M</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {TEAM_MEMBERS.map((member, index) => (
          <div
            key={index}
            className="text-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.role}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
