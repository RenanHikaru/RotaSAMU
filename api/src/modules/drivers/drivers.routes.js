import {
  uuidIdSchema,
  credentialsSchema,
  createUserBodySchema,
} from "#utils/schemas.js";

import {
  index,
  show,
  create,
  login,
  logout,
  indexConversations,
} from "./drivers.service.js";

export default async function driversRoutes(app) {
  app.get("/", { schema: { tags: ["Motoristas"] } }, () => index());

  app.get(
    "/:id",
    { schema: { tags: ["Motoristas"], params: uuidIdSchema } },
    (request) => show(request.params.id),
  );

  app.post(
    "/",
    { schema: { tags: ["Motoristas"], body: createUserBodySchema } },
    (request, reply) => {
      reply.code(201);
      return create(request.body);
    },
  );

  app.post(
    "/login",
    { schema: { tags: ["Motoristas"], body: credentialsSchema } },
    (request) => login(request.body),
  );

  app.post(
    "/logout",
    { schema: { tags: ["Motoristas"], body: uuidIdSchema } },
    async (request, reply) => {
      await logout(request.body.id);
      reply.code(204).send();
    },
  );

  app.get(
    "/:id/conversations",
    { schema: { tags: ["Motoristas"], params: uuidIdSchema } },
    (request) => indexConversations(request.params.id),
  );
}
