import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "@fastify/type-provider-zod";

import { AppError } from "#utils/errors.js";

import attendantsRoutes from "#modules/attendants/attendants.routes.js";
import driversRoutes from "#modules/drivers/drivers.routes.js";
import emergencyCallsRoutes from "#modules/emergency-calls/emergency-calls.routes.js";
import conversationsRoutes from "#modules/conversations/conversations.routes.js";
import routingRoutes from "#modules/routing/routing.routes.js";

export async function buildApp() {
  const app = Fastify({ logger: true });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "RotaSAMU API",
        description: "API documentation for the RotaSAMU system",
        version: "1.0.0",
      },
      tags: [
        {
          name: "Atendentes",
          description: "Gerenciamento e autenticação de atendentes",
        },
        {
          name: "Motoristas",
          description: "Gerenciamento e autenticação de motoristas",
        },
        {
          name: "Chamados de Emergência",
          description: "Despacho e acompanhamento de chamados",
        },
        {
          name: "Conversas",
          description: "Mensagens entre atendentes e motoristas",
        },
        {
          name: "Rotas (GPS)",
          description:
            "Cálculo de rotas (OSRM) e simulação de movimentação dos veículos",
        },
      ],
    },
    transform: jsonSchemaTransform,
  });

  await app.register(fastifySwaggerUI, {
    routePrefix: "/docs",
  });

  app.register(attendantsRoutes, { prefix: "/attendants" });
  app.register(driversRoutes, { prefix: "/drivers" });
  app.register(emergencyCallsRoutes, { prefix: "/emergency-calls" });
  app.register(conversationsRoutes, { prefix: "/conversations" });
  app.register(routingRoutes, { prefix: "/routing" });

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      return reply.code(error.statusCode).send({ message: error.message });
    }

    if (error.validation) {
      return reply
        .code(400)
        .send({ message: "Validation error", details: error.validation });
    }

    request.log.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  });

  return app;
}
