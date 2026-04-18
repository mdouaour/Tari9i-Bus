import { getDistanceKm } from '../utils/geo';

export function getNearestStop(lat, lng, stops = []) {
  if (!stops.length) return null;

  let nearest = null;
  let minDistance = Number.POSITIVE_INFINITY;

  for (const stop of stops) {
    const distance = getDistanceKm(lat, lng, stop.latitude, stop.longitude);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = stop;
    }
  }

  return nearest ? { stop: nearest, distanceKm: minDistance } : null;
}

function buildGraph(stops, routes, routeStops) {
  const stopMap = new Map(stops.map((stop) => [stop.id, stop]));
  const routeMap = new Map(routes.map((route) => [route.id, route]));
  const graph = new Map();

  for (const stop of stops) {
    graph.set(stop.id, []);
  }

  const groupedByRoute = new Map();
  for (const item of routeStops) {
    if (!groupedByRoute.has(item.route_id)) groupedByRoute.set(item.route_id, []);
    groupedByRoute.get(item.route_id).push(item);
  }

  for (const [routeId, items] of groupedByRoute) {
    items.sort((a, b) => a.order_index - b.order_index);
    for (let i = 0; i < items.length - 1; i += 1) {
      const from = items[i].stop_id;
      const to = items[i + 1].stop_id;
      if (graph.has(from) && graph.has(to)) {
        graph.get(from).push({ to, routeId });
        graph.get(to).push({ to: from, routeId });
      }
    }
  }

  return { graph, stopMap, routeMap };
}

function buildSegments(pathEdges, routeMap) {
  if (!pathEdges.length) return [];

  const segments = [];
  let current = null;

  for (const edge of pathEdges) {
    if (!current || current.routeId !== edge.routeId) {
      if (current) segments.push(current);
      const route = routeMap.get(edge.routeId);
      current = {
        routeId: edge.routeId,
        routeName: route?.name || edge.routeId,
        color: route?.color || '#2563eb',
        stopIds: [edge.from, edge.to],
      };
    } else {
      current.stopIds.push(edge.to);
    }
  }

  if (current) segments.push(current);
  return segments;
}

function buildSteps(segments, stopMap) {
  if (!segments.length) return [];
  return segments.map((segment, index) => {
    const from = stopMap.get(segment.stopIds[0]);
    const to = stopMap.get(segment.stopIds[segment.stopIds.length - 1]);
    const prefix = index === 0 ? 'Take' : 'Transfer to';
    return `${prefix} ${segment.routeName} from ${from?.name || 'start'} to ${to?.name || 'end'} (${segment.stopIds.length - 1} stops)`;
  });
}

export function findRoute(startStopId, endStopId, stops = [], routes = [], routeStops = []) {
  if (!startStopId || !endStopId || !stops.length || !routes.length) return null;
  if (startStopId === endStopId) {
    const stop = stops.find((item) => item.id === startStopId);
    return {
      stops: stop ? [stop] : [],
      routeSegments: [],
      steps: stop ? [`You are already at ${stop.name}`] : ['You are already at destination'],
    };
  }

  const { graph, stopMap, routeMap } = buildGraph(stops, routes, routeStops);
  if (!graph.has(startStopId) || !graph.has(endStopId)) return null;

  const queue = [startStopId];
  const visited = new Set([startStopId]);
  const previous = new Map();

  while (queue.length) {
    const current = queue.shift();
    if (current === endStopId) break;

    for (const edge of graph.get(current) || []) {
      if (visited.has(edge.to)) continue;
      visited.add(edge.to);
      previous.set(edge.to, { from: current, routeId: edge.routeId });
      queue.push(edge.to);
    }
  }

  if (!previous.has(endStopId)) return null;

  const pathEdges = [];
  let cursor = endStopId;
  while (cursor !== startStopId) {
    const back = previous.get(cursor);
    if (!back) break;
    pathEdges.push({ from: back.from, to: cursor, routeId: back.routeId });
    cursor = back.from;
  }
  pathEdges.reverse();

  const orderedStopIds = [startStopId, ...pathEdges.map((edge) => edge.to)];
  const orderedStops = orderedStopIds.map((stopId) => stopMap.get(stopId)).filter(Boolean);
  const routeSegments = buildSegments(pathEdges, routeMap);
  const steps = buildSteps(routeSegments, stopMap);

  return {
    stops: orderedStops,
    routeSegments,
    steps,
  };
}
