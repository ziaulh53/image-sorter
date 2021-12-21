import {
  Login,
  Clients,
  Registration,
} from "../pages";

// Public
export const Public = [
  { path: "/", exact: true, component: Login },
  { path: "/reg", exact: true, component: Registration },
];
export const Private = [
  { path: "/clients", component: Clients },
];
