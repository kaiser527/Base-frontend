export const ALL_PERMISSIONS = {
  USERS: {
    GET_PAGINATE: { method: "GET", apiPath: "/api/v1/users", module: "USERS" },
    CREATE: { method: "POST", apiPath: "/api/v1/users", module: "USERS" },
    UPDATE: { method: "PATCH", apiPath: "/api/v1/users/:id", module: "USERS" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/users/:id", module: "USERS" },
  },
};

export const ALL_MODULES = {
  PERMISSIONS: "PERMISSIONS",
  ROLES: "ROLES",
  USERS: "USERS",
};
