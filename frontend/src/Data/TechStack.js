import { FaReact, FaNodeJs, FaJsSquare, FaRoute } from "react-icons/fa";
import { SiTailwindcss, SiExpress, SiPostgresql, SiVite, SiZod, SiAxios } from "react-icons/si";
import { RiApps2Line } from "react-icons/ri";
import { IoLogoCss3, IoMailOutline } from "react-icons/io5";
import { SiJsonwebtokens } from "react-icons/si";
import { TbShieldLock } from "react-icons/tb";

export const techStack = [
  {
    title: "Frontend",
    items: [
      { name: "React", icon: FaReact, color: "text-cyan-400" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-400" },
      { name: "Vanilla CSS", icon: IoLogoCss3, color: "text-blue-400" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Express.js", icon: SiExpress, color: "text-zinc-300" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-indigo-400" },
    ],
  },
  {
    title: "Runtime and Tools",
    items: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-400" },
      { name: "Vite", icon: SiVite, color: "text-violet-400" },
    ],
  },
  {
    title: "Language",
    items: [{ name: "JavaScript", icon: FaJsSquare, color: "text-yellow-300" }],
  },
  {
    title: "Dependencies",
    items: [
      { name: "React Router DOM", icon: FaRoute, color: "text-rose-400" },
      { name: "Zod", icon: SiZod, color: "text-blue-400" },
      { name: "React Icons", icon: RiApps2Line, color: "text-pink-400" },
      { name: "Nodemailer", icon: IoMailOutline, color: "text-emerald-400" },
      { name: "JSON Web Token", icon: SiJsonwebtokens, color: "text-violet-400" },
      { name: "Bcrypt.js",      icon: TbShieldLock,    color: "text-orange-400" },
      { name: "Axios", icon: SiAxios, color: "text-purple-400" },
    ],
  },
];