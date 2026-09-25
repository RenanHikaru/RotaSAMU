import { z } from "zod/v4";

import { UserSchema } from "#prisma/generated/zod/index.ts";

export const uuidIdSchema = z.object({ id: z.string().uuid() });

export const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const createUserBodySchema = UserSchema.omit({
  id: true,
  createdAt: true,
  role: true,
  status: true,
});
