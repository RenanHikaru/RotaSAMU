import { EmergencyCallSchema } from "#prisma/generated/zod/index.ts";
import { uuidIdSchema } from "#utils/schemas.js";
import {
  index,
  show,
  getLocation,
  create,
  conclude,
  indexNotifications,
} from "./emergency-calls.service.js";

export default async function emergencyCallsRoutes(app) {
  app.get("/", { schema: { tags: ["Chamados de Emergência"] } }, () => index());

  app.get(
    "/:id",
    { schema: { tags: ["Chamados de Emergência"], params: uuidIdSchema } },
    (request) => show(request.params.id),
  );

  app.get(
    "/get_location",
    {
      schema: {
        tags: ["Chamados de Emergência"],
        querystring: getLocationQuerySchema,
      },
    },
    (request) => getLocation(request.query.id),
  );

  app.post(
    "/",
    { schema: { tags: ["Chamados de Emergência"], body: createBodySchema } },
    (request, reply) => {
      reply.code(201);
      return create(request.body);
    },
  );

  app.patch(
    "/:id/conclude",
    { schema: { tags: ["Chamados de Emergência"], params: uuidIdSchema } },
    (request) => conclude(request.params.id),
  );

  app.get(
    "/:id/notifications",
    { schema: { tags: ["Chamados de Emergência"], params: uuidIdSchema } },
    (request) => indexNotifications(request.params.id),
  );
}

// Private

const createBodySchema = EmergencyCallSchema.omit({
  id: true,
  createdAt: true,
});

const getLocationQuerySchema = uuidIdSchema;
