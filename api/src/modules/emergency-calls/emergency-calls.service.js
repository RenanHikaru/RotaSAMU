import { EmergencyCallStatus } from "@prisma/client";
import { prisma } from "#db/prisma.js";
import { NotFoundError } from "#utils/errors.js";

export const index = () => prisma.emergencyCall.findMany();

export const show = (id) =>
  prisma.emergencyCall.findUnique({ where: { id } }).then((emergencyCall) => {
    if (!emergencyCall) throw new NotFoundError("Emergency call not found");
    return emergencyCall;
  });

export const getLocation = (id) =>
  prisma.vehicleEmergencyCall
    .findFirst({
      where: { emergencyCallId: id },
      include: { vehicle: true },
    })
    .then((record) => {
      if (!record) throw new NotFoundError("Emergency call not found");
      return {
        latitude: record.vehicle.latitude,
        longitude: record.vehicle.longitude,
      };
    });

export const create = (data) => prisma.emergencyCall.create({ data });

export const conclude = async (id) => {
  const emergencyCall = await prisma.emergencyCall.findUnique({
    where: { id },
  });
  if (!emergencyCall) throw new NotFoundError("Emergency call not found");

  return prisma.vehicleEmergencyCall.updateMany({
    where: { emergencyCallId: id },
    data: { status: EmergencyCallStatus.FINISHED },
  });
};

export const indexNotifications = async (emergencyCallId) => {
  const emergencyCall = await prisma.emergencyCall.findUnique({
    where: { id: emergencyCallId },
  });
  if (!emergencyCall) throw new NotFoundError("Emergency call not found");

  return prisma.notification.findMany({
    where: { emergencyCallId },
    orderBy: { notifiedAt: "desc" },
  });
};
