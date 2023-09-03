import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { SvgIcon } from "@mui/material";

export const vistaOrganizador = [
  {
    title: "Clientes",
    path: "/customer",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Asistencia",
    path: "/attendance",
    icon: (
      <SvgIcon fontSize="small">
        <HowToRegIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Perfil",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <AccountBoxIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Añadir cuenta",
    path: "/users",
    icon: (
      <SvgIcon fontSize="small">
        <PersonAddIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Sponsors",
    path: "/sponsor",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
];

export const vistaAdministrador = [
  {
    title: "Asistencia",
    path: "/attendance",
    icon: (
      <SvgIcon fontSize="small">
        <HowToRegIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Perfil",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <AccountBoxIcon />
      </SvgIcon>
    ),
  },
];