import bcrypt from "bcrypt";

import { UserRole, UserStatus } from "@prisma/client";
import { prisma } from "#db/prisma.js";

import { NotFoundError, UnauthorizedError } from "#utils/errors.js";
import { SALT_ROUNDS } from "#config/constants.js";

export const show = (id) =>
  prisma.user
    .findFirst({ where: { id, role: UserRole.ATTENDANT } })
    .then((attendant) => {
      if (!attendant) throw new NotFoundError("Attendant not found");
      return attendant;
    });

export const create = async (data) => {
  const password = await bcrypt.hash(data.password, SALT_ROUNDS);
  const attendant = await prisma.user.create({
    data: { ...data, password, role: UserRole.ATTENDANT },
  });
  const { password: _, ...rest } = attendant;
  return rest;
};

export const login = async (data) => {
  const attendant = await prisma.user.findFirst({
    where: { email: data.email, role: UserRole.ATTENDANT },
  });

  if (
    !attendant ||
    !(await bcrypt.compare(data.password, attendant.password))
  ) {
    throw new UnauthorizedError();
  }

  const updatedAttendant = await prisma.user.update({
    where: { id: attendant.id },
    data: { status: UserStatus.ONLINE },
  });

  const { password: _, ...rest } = updatedAttendant;
  return rest;
};

export const logout = (id) =>
  prisma.user.update({ where: { id }, data: { status: UserStatus.OFFLINE } });

export const indexConversations = (attendantId) =>
  prisma.conversation.findMany({
    where: { attendantId },
    include: { driver: { select: { id: true, email: true, phone: true } } },
  });
