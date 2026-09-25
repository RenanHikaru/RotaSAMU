import bcrypt from "bcrypt";
import { UserRole, UserStatus } from "@prisma/client";
import { prisma } from "#db/prisma.js";
import { NotFoundError, UnauthorizedError } from "#utils/errors.js";
import { SALT_ROUNDS } from "#config/constants.js";

export const index = () =>
  prisma.user.findMany({ where: { role: UserRole.DRIVER } });

export const show = (id) =>
  prisma.user
    .findFirst({ where: { id, role: UserRole.DRIVER } })
    .then((driver) => {
      if (!driver) throw new NotFoundError("Driver not found");
      return driver;
    });

export const create = async (data) => {
  const password = await bcrypt.hash(data.password, SALT_ROUNDS);
  const driver = await prisma.user.create({
    data: { ...data, password, role: UserRole.DRIVER },
  });
  const { password: _, ...rest } = driver;
  return rest;
};

export const login = async (data) => {
  const driver = await prisma.user.findFirst({
    where: { email: data.email, role: UserRole.DRIVER },
  });

  if (!driver || !(await bcrypt.compare(data.password, driver.password))) {
    throw new UnauthorizedError();
  }

  const updatedDriver = await prisma.user.update({
    where: { id: driver.id },
    data: { status: UserStatus.ONLINE },
  });

  const { password: _, ...rest } = updatedDriver;
  return rest;
};

export const logout = (id) =>
  prisma.user.update({ where: { id }, data: { status: UserStatus.OFFLINE } });

export const indexConversations = (driverId) =>
  prisma.conversation.findMany({
    where: { driverId },
    include: { attendant: { select: { id: true, email: true, phone: true } } },
  });
