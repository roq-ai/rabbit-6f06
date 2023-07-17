const mapping: Record<string, string> = {
  advertisements: 'advertisement',
  contents: 'content',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
