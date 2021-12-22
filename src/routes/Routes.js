import { UserRole } from "../config";
import {
  Login,
  Clients,
  Registration,
  UserDashboard,
} from "../pages";

// Admin routes
export const Public = [
  { path: "/", exact: true, component: Login },
  { path: "/reg", exact: true, component: Registration },
];
export const Private = [
  { path: "/clients", role: [UserRole.Admin], component: Clients },
  // { path: "/my-bucket", role:[UserRole.User], component: UserDashboard },
];


//User routes
