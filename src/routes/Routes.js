import {
  Login,
  Clients,
  ClientsDetails,
} from "../pages";

// Public
export const Public = [
  { path: "/", exact: true, component: Login },
];
export const Private = [
  { path: "/clients", exact: true, component: Clients },
  { path: "/clients/:id", exact: true, component: ClientsDetails },
];
