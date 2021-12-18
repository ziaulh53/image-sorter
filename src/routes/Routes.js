import {
  Login,
  Clients,
} from "../pages";

// Public
export const Public = [
  { path: "/", exact: true, component: Login },
];
export const Private = [
  { path: "/clients", exact: true, component: Clients },
];
