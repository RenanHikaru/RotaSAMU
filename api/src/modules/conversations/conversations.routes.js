import { z } from "zod/v4";

import { show, sendMessage } from "./conversations.service.js";

export default async function conversationsRoutes(app) {
  app.get(
    "/",
    { schema: { tags: ["Conversas"], querystring: participantsSchema } },
    (request) => show(request.query),
  );

  app.post(
    "/messages",
    { schema: { tags: ["Conversas"], body: sendMessageBodySchema } },
    (request, reply) => {
      reply.code(201);
      return sendMessage(request.body);
    },
  );
}

// Private

const participantsSchema = z.object({
  attendantId: z.string().uuid(),
  driverId: z.string().uuid(),
});

const sendMessageBodySchema = participantsSchema.extend({
  senderId: z.string().uuid(),
  text: z.string().min(1),
});
