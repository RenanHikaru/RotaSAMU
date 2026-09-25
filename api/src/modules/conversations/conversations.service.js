import { prisma } from "#db/prisma.js";

export const show = ({ attendantId, driverId }) =>
  findOrCreate({ attendantId, driverId }).then((conversation) =>
    prisma.conversation.findUnique({
      where: { id: conversation.id },
      include: { messages: { orderBy: { sentAt: "asc" } } },
    }),
  );

export const sendMessage = async ({
  attendantId,
  driverId,
  senderId,
  text,
}) => {
  const conversation = await findOrCreate({ attendantId, driverId });

  return prisma.message.create({
    data: { text, senderId, conversationId: conversation.id },
  });
};

// Private

const findOrCreate = async ({ attendantId, driverId }) => {
  const existing = await prisma.conversation.findFirst({
    where: { attendantId, driverId },
  });

  if (existing) return existing;

  return prisma.conversation.create({ data: { attendantId, driverId } });
};
