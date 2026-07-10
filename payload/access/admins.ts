import type { Access } from "payload";

type RoleAwareUser = {
  role?: "admin" | "editor";
};

const getRole = (user: unknown): RoleAwareUser["role"] => {
  if (!user || typeof user !== "object" || !("role" in user)) {
    return undefined;
  }

  const role = (user as RoleAwareUser).role;
  return role === "admin" || role === "editor" ? role : undefined;
};

export const isAuthenticated: Access = ({ req }) => Boolean(req.user);

export const isAdmin: Access = ({ req }) => getRole(req.user) === "admin";

export const isAdminOrEditor: Access = ({ req }) => {
  const role = getRole(req.user);
  return role === "admin" || role === "editor";
};
