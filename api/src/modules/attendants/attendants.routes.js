import {
  uuidIdSchema,
  credentialsSchema,
  createUserBodySchema,
} from "#utils/schemas.js";

import {
  show,
  create,
  login,
  logout,
  indexConversations,
} from "./attendants.service.js";

export default async function attendantsRoutes(app) {
  app.get(
    "/:id",
    { schema: { tags: ["Atendentes"], params: uuidIdSchema } },
    (request) => show(request.params.id),
  );

  app.post(
    "/",
    { schema: { tags: ["Atendentes"], body: createUserBodySchema } },
    (request, reply) => {
      reply.code(201);
      return create(request.body);
    },
  );

  app.post(
    "/login",
    { schema: { tags: ["Atendentes"], body: credentialsSchema } },
    (request) => login(request.body),
  );

  app.post(
    "/logout",
    { schema: { tags: ["Atendentes"], body: uuidIdSchema } },
    async (request, reply) => {
      await logout(request.body.id);
      reply.code(204).send();
    },
  );

  app.get(
    "/:id/conversations",
    { schema: { tags: ["Atendentes"], params: uuidIdSchema } },
    (request) => indexConversations(request.params.id),
  );
}
