import { z } from "zod/v4";

import { getRoute } from "./routing.service.js";
import {
  startSimulation,
  stopSimulation,
  isSimulating,
} from "./simulation.service.js";

export default async function routingRoutes(app) {

  app.get(
    "/preview",
    { schema: { tags: ["Rotas (GPS)"], querystring: previewQuerySchema } },
    (request) => getRoute(request.query),
  );

  app.post(
    "/simulate",
    { schema: { tags: ["Rotas (GPS)"], body: simulateBodySchema } },
    (request) => startSimulation(request.body),
  );

  app.post(
    "/simulate/:vehicleId/stop",
    { schema: { tags: ["Rotas (GPS)"], params: vehicleIdParamSchema } },
    (request, reply) => {
      stopSimulation(request.params.vehicleId);
      reply.code(204).send();
    },
  );

  app.get(
    "/simulate/:vehicleId/status",
    { schema: { tags: ["Rotas (GPS)"], params: vehicleIdParamSchema } },
    (request) => ({ running: isSimulating(request.params.vehicleId) }),
  );
}

const vehicleIdParamSchema = z.object({ vehicleId: z.string().uuid() });

const previewQuerySchema = z.object({
  originLat: z.coerce.number(),
  originLng: z.coerce.number(),
  destLat: z.coerce.number(),
  destLng: z.coerce.number(),
});

const simulateBodySchema = z.object({
  vehicleId: z.string().uuid(),
  destLat: z.number(),
  destLng: z.number(),
  speedMultiplier: z.number().positive().optional(),
  tickMs: z.number().positive().optional(),
});
