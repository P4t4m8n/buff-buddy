const HOME_ROUTE = "/";

const PROGRAM_PAGE_ROUTE = "/programs";
const PROGRAM_EDIT_ROUTE = "/programs/edit";
const PROGRAM_EDIT_WITH_ID_ROUTE = "/programs/edit/:programId";
const PROGRAM_DETAILS_ROUTE = "/programs/:programId";

const AUTH_PAGE_ROUTE = "/auth";

export const PROGRAM_ROUTES = {
  PROGRAM_PAGE_ROUTE,
  PROGRAM_EDIT_ROUTE,
  PROGRAM_EDIT_WITH_ID_ROUTE,
  PROGRAM_DETAILS_ROUTE,
};

export const AUTH_ROUTES = {
  AUTH_PAGE_ROUTE,
};

export const ROUTES_STORE = {
  HOME_ROUTE,
  ...PROGRAM_ROUTES,
  ...AUTH_ROUTES,
};
