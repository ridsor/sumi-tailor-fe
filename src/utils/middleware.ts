export const routeFiltering = (pathname: string, routes: string[]): boolean => {
  let result = false;

  for (const route of routes) {
    if (route.includes("*")) {
      const temp = route.replace("*", "");
      result = pathname.startsWith(temp);
      break;
    }

    if (route === pathname) {
      result = pathname === route;
      break;
    }
  }

  return result;
};
