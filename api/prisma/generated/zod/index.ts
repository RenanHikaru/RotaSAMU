import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','password','role','phone','status','createdAt']);

export const VehicleScalarFieldEnumSchema = z.enum(['id','plate','latitude','longitude','driverId']);

export const EmergencyCallScalarFieldEnumSchema = z.enum(['id','protocol','address','returnLocation','whatHappened','patientCondition','apparentAge','patientCount','injuryCondition','observations','attendantId','createdAt']);

export const VehicleEmergencyCallScalarFieldEnumSchema = z.enum(['id','status','vehicleId','emergencyCallId']);

export const ConversationScalarFieldEnumSchema = z.enum(['id','attendantId','driverId']);

export const MessageScalarFieldEnumSchema = z.enum(['id','text','sentAt','senderId','conversationId']);

export const NotificationScalarFieldEnumSchema = z.enum(['id','message','notifiedAt','emergencyCallId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UserRoleSchema = z.enum(['DRIVER','ATTENDANT']);

export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`

export const UserStatusSchema = z.enum(['ONLINE','OFFLINE']);

export type UserStatusType = `${z.infer<typeof UserStatusSchema>}`

export const EmergencyCallStatusSchema = z.enum(['NOT_STARTED','IN_PROGRESS','FINISHED']);

export type EmergencyCallStatusType = `${z.infer<typeof EmergencyCallStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: UserRoleSchema,
  status: UserStatusSchema,
  id: z.uuid(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  createdAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// VEHICLE SCHEMA
/////////////////////////////////////////

export const VehicleSchema = z.object({
  id: z.uuid(),
  plate: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  driverId: z.string(),
})

export type Vehicle = z.infer<typeof VehicleSchema>

/////////////////////////////////////////
// EMERGENCY CALL SCHEMA
/////////////////////////////////////////

export const EmergencyCallSchema = z.object({
  id: z.uuid(),
  protocol: z.string(),
  address: z.string(),
  returnLocation: z.string(),
  whatHappened: z.string(),
  patientCondition: z.string(),
  apparentAge: z.number().int().nullable(),
  patientCount: z.number().int(),
  injuryCondition: z.string(),
  observations: z.string().nullable(),
  attendantId: z.string(),
  createdAt: z.coerce.date(),
})

export type EmergencyCall = z.infer<typeof EmergencyCallSchema>

/////////////////////////////////////////
// VEHICLE EMERGENCY CALL SCHEMA
/////////////////////////////////////////

export const VehicleEmergencyCallSchema = z.object({
  status: EmergencyCallStatusSchema,
  id: z.uuid(),
  vehicleId: z.string(),
  emergencyCallId: z.string(),
})

export type VehicleEmergencyCall = z.infer<typeof VehicleEmergencyCallSchema>

/////////////////////////////////////////
// CONVERSATION SCHEMA
/////////////////////////////////////////

export const ConversationSchema = z.object({
  id: z.uuid(),
  attendantId: z.string(),
  driverId: z.string(),
})

export type Conversation = z.infer<typeof ConversationSchema>

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  id: z.uuid(),
  text: z.string(),
  sentAt: z.coerce.date(),
  senderId: z.string(),
  conversationId: z.string(),
})

export type Message = z.infer<typeof MessageSchema>

/////////////////////////////////////////
// NOTIFICATION SCHEMA
/////////////////////////////////////////

export const NotificationSchema = z.object({
  id: z.uuid(),
  message: z.string(),
  notifiedAt: z.coerce.date(),
  emergencyCallId: z.string(),
})

export type Notification = z.infer<typeof NotificationSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  vehicle: z.union([z.boolean(),z.lazy(() => VehicleArgsSchema)]).optional(),
  registeredCalls: z.union([z.boolean(),z.lazy(() => EmergencyCallFindManyArgsSchema)]).optional(),
  conversationsAsAttendant: z.union([z.boolean(),z.lazy(() => ConversationFindManyArgsSchema)]).optional(),
  conversationsAsDriver: z.union([z.boolean(),z.lazy(() => ConversationFindManyArgsSchema)]).optional(),
  sentMessages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  registeredCalls: z.boolean().optional(),
  conversationsAsAttendant: z.boolean().optional(),
  conversationsAsDriver: z.boolean().optional(),
  sentMessages: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  role: z.boolean().optional(),
  phone: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  vehicle: z.union([z.boolean(),z.lazy(() => VehicleArgsSchema)]).optional(),
  registeredCalls: z.union([z.boolean(),z.lazy(() => EmergencyCallFindManyArgsSchema)]).optional(),
  conversationsAsAttendant: z.union([z.boolean(),z.lazy(() => ConversationFindManyArgsSchema)]).optional(),
  conversationsAsDriver: z.union([z.boolean(),z.lazy(() => ConversationFindManyArgsSchema)]).optional(),
  sentMessages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VEHICLE
//------------------------------------------------------

export const VehicleIncludeSchema: z.ZodType<Prisma.VehicleInclude> = z.object({
  driver: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  emergencyCalls: z.union([z.boolean(),z.lazy(() => VehicleEmergencyCallFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VehicleCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const VehicleArgsSchema: z.ZodType<Prisma.VehicleDefaultArgs> = z.object({
  select: z.lazy(() => VehicleSelectSchema).optional(),
  include: z.lazy(() => VehicleIncludeSchema).optional(),
}).strict();

export const VehicleCountOutputTypeArgsSchema: z.ZodType<Prisma.VehicleCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => VehicleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const VehicleCountOutputTypeSelectSchema: z.ZodType<Prisma.VehicleCountOutputTypeSelect> = z.object({
  emergencyCalls: z.boolean().optional(),
}).strict();

export const VehicleSelectSchema: z.ZodType<Prisma.VehicleSelect> = z.object({
  id: z.boolean().optional(),
  plate: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  driverId: z.boolean().optional(),
  driver: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  emergencyCalls: z.union([z.boolean(),z.lazy(() => VehicleEmergencyCallFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VehicleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EMERGENCY CALL
//------------------------------------------------------

export const EmergencyCallIncludeSchema: z.ZodType<Prisma.EmergencyCallInclude> = z.object({
  attendant: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  vehicles: z.union([z.boolean(),z.lazy(() => VehicleEmergencyCallFindManyArgsSchema)]).optional(),
  notifications: z.union([z.boolean(),z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmergencyCallCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const EmergencyCallArgsSchema: z.ZodType<Prisma.EmergencyCallDefaultArgs> = z.object({
  select: z.lazy(() => EmergencyCallSelectSchema).optional(),
  include: z.lazy(() => EmergencyCallIncludeSchema).optional(),
}).strict();

export const EmergencyCallCountOutputTypeArgsSchema: z.ZodType<Prisma.EmergencyCallCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EmergencyCallCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EmergencyCallCountOutputTypeSelectSchema: z.ZodType<Prisma.EmergencyCallCountOutputTypeSelect> = z.object({
  vehicles: z.boolean().optional(),
  notifications: z.boolean().optional(),
}).strict();

export const EmergencyCallSelectSchema: z.ZodType<Prisma.EmergencyCallSelect> = z.object({
  id: z.boolean().optional(),
  protocol: z.boolean().optional(),
  address: z.boolean().optional(),
  returnLocation: z.boolean().optional(),
  whatHappened: z.boolean().optional(),
  patientCondition: z.boolean().optional(),
  apparentAge: z.boolean().optional(),
  patientCount: z.boolean().optional(),
  injuryCondition: z.boolean().optional(),
  observations: z.boolean().optional(),
  attendantId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  attendant: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  vehicles: z.union([z.boolean(),z.lazy(() => VehicleEmergencyCallFindManyArgsSchema)]).optional(),
  notifications: z.union([z.boolean(),z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmergencyCallCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VEHICLE EMERGENCY CALL
//------------------------------------------------------

export const VehicleEmergencyCallIncludeSchema: z.ZodType<Prisma.VehicleEmergencyCallInclude> = z.object({
  vehicle: z.union([z.boolean(),z.lazy(() => VehicleArgsSchema)]).optional(),
  emergencyCall: z.union([z.boolean(),z.lazy(() => EmergencyCallArgsSchema)]).optional(),
}).strict();

export const VehicleEmergencyCallArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallDefaultArgs> = z.object({
  select: z.lazy(() => VehicleEmergencyCallSelectSchema).optional(),
  include: z.lazy(() => VehicleEmergencyCallIncludeSchema).optional(),
}).strict();

export const VehicleEmergencyCallSelectSchema: z.ZodType<Prisma.VehicleEmergencyCallSelect> = z.object({
  id: z.boolean().optional(),
  status: z.boolean().optional(),
  vehicleId: z.boolean().optional(),
  emergencyCallId: z.boolean().optional(),
  vehicle: z.union([z.boolean(),z.lazy(() => VehicleArgsSchema)]).optional(),
  emergencyCall: z.union([z.boolean(),z.lazy(() => EmergencyCallArgsSchema)]).optional(),
}).strict()

// CONVERSATION
//------------------------------------------------------

export const ConversationIncludeSchema: z.ZodType<Prisma.ConversationInclude> = z.object({
  attendant: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  driver: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ConversationCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const ConversationArgsSchema: z.ZodType<Prisma.ConversationDefaultArgs> = z.object({
  select: z.lazy(() => ConversationSelectSchema).optional(),
  include: z.lazy(() => ConversationIncludeSchema).optional(),
}).strict();

export const ConversationCountOutputTypeArgsSchema: z.ZodType<Prisma.ConversationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ConversationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ConversationCountOutputTypeSelectSchema: z.ZodType<Prisma.ConversationCountOutputTypeSelect> = z.object({
  messages: z.boolean().optional(),
}).strict();

export const ConversationSelectSchema: z.ZodType<Prisma.ConversationSelect> = z.object({
  id: z.boolean().optional(),
  attendantId: z.boolean().optional(),
  driverId: z.boolean().optional(),
  attendant: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  driver: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ConversationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MESSAGE
//------------------------------------------------------

export const MessageIncludeSchema: z.ZodType<Prisma.MessageInclude> = z.object({
  sender: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  conversation: z.union([z.boolean(),z.lazy(() => ConversationArgsSchema)]).optional(),
}).strict();

export const MessageArgsSchema: z.ZodType<Prisma.MessageDefaultArgs> = z.object({
  select: z.lazy(() => MessageSelectSchema).optional(),
  include: z.lazy(() => MessageIncludeSchema).optional(),
}).strict();

export const MessageSelectSchema: z.ZodType<Prisma.MessageSelect> = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
  sentAt: z.boolean().optional(),
  senderId: z.boolean().optional(),
  conversationId: z.boolean().optional(),
  sender: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  conversation: z.union([z.boolean(),z.lazy(() => ConversationArgsSchema)]).optional(),
}).strict()

// NOTIFICATION
//------------------------------------------------------

export const NotificationIncludeSchema: z.ZodType<Prisma.NotificationInclude> = z.object({
  emergencyCall: z.union([z.boolean(),z.lazy(() => EmergencyCallArgsSchema)]).optional(),
}).strict();

export const NotificationArgsSchema: z.ZodType<Prisma.NotificationDefaultArgs> = z.object({
  select: z.lazy(() => NotificationSelectSchema).optional(),
  include: z.lazy(() => NotificationIncludeSchema).optional(),
}).strict();

export const NotificationSelectSchema: z.ZodType<Prisma.NotificationSelect> = z.object({
  id: z.boolean().optional(),
  message: z.boolean().optional(),
  notifiedAt: z.boolean().optional(),
  emergencyCallId: z.boolean().optional(),
  emergencyCall: z.union([z.boolean(),z.lazy(() => EmergencyCallArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumUserRoleFilterSchema), z.lazy(() => UserRoleSchema) ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumUserStatusFilterSchema), z.lazy(() => UserStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  vehicle: z.union([ z.lazy(() => VehicleNullableScalarRelationFilterSchema), z.lazy(() => VehicleWhereInputSchema) ]).optional().nullable(),
  registeredCalls: z.lazy(() => EmergencyCallListRelationFilterSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationListRelationFilterSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationListRelationFilterSchema).optional(),
  sentMessages: z.lazy(() => MessageListRelationFilterSchema).optional(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  vehicle: z.lazy(() => VehicleOrderByWithRelationInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallOrderByRelationAggregateInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationOrderByRelationAggregateInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationOrderByRelationAggregateInputSchema).optional(),
  sentMessages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional(),
});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    email: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumUserRoleFilterSchema), z.lazy(() => UserRoleSchema) ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumUserStatusFilterSchema), z.lazy(() => UserStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  vehicle: z.union([ z.lazy(() => VehicleNullableScalarRelationFilterSchema), z.lazy(() => VehicleWhereInputSchema) ]).optional().nullable(),
  registeredCalls: z.lazy(() => EmergencyCallListRelationFilterSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationListRelationFilterSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationListRelationFilterSchema).optional(),
  sentMessages: z.lazy(() => MessageListRelationFilterSchema).optional(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumUserRoleWithAggregatesFilterSchema), z.lazy(() => UserRoleSchema) ]).optional(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumUserStatusWithAggregatesFilterSchema), z.lazy(() => UserStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const VehicleWhereInputSchema: z.ZodType<Prisma.VehicleWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => VehicleWhereInputSchema), z.lazy(() => VehicleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VehicleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VehicleWhereInputSchema), z.lazy(() => VehicleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  plate: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  driverId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  driver: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  emergencyCalls: z.lazy(() => VehicleEmergencyCallListRelationFilterSchema).optional(),
});

export const VehicleOrderByWithRelationInputSchema: z.ZodType<Prisma.VehicleOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  plate: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  driverId: z.lazy(() => SortOrderSchema).optional(),
  driver: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  emergencyCalls: z.lazy(() => VehicleEmergencyCallOrderByRelationAggregateInputSchema).optional(),
});

export const VehicleWhereUniqueInputSchema: z.ZodType<Prisma.VehicleWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    plate: z.string(),
    driverId: z.string(),
  }),
  z.object({
    id: z.uuid(),
    plate: z.string(),
  }),
  z.object({
    id: z.uuid(),
    driverId: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    plate: z.string(),
    driverId: z.string(),
  }),
  z.object({
    plate: z.string(),
  }),
  z.object({
    driverId: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  plate: z.string().optional(),
  driverId: z.string().optional(),
  AND: z.union([ z.lazy(() => VehicleWhereInputSchema), z.lazy(() => VehicleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VehicleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VehicleWhereInputSchema), z.lazy(() => VehicleWhereInputSchema).array() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  driver: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  emergencyCalls: z.lazy(() => VehicleEmergencyCallListRelationFilterSchema).optional(),
}));

export const VehicleOrderByWithAggregationInputSchema: z.ZodType<Prisma.VehicleOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  plate: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  driverId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VehicleCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => VehicleAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VehicleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VehicleMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => VehicleSumOrderByAggregateInputSchema).optional(),
});

export const VehicleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VehicleScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema), z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema), z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  plate: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
  driverId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const EmergencyCallWhereInputSchema: z.ZodType<Prisma.EmergencyCallWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => EmergencyCallWhereInputSchema), z.lazy(() => EmergencyCallWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmergencyCallWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmergencyCallWhereInputSchema), z.lazy(() => EmergencyCallWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  protocol: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  returnLocation: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  whatHappened: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  patientCondition: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  apparentAge: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  patientCount: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  injuryCondition: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  observations: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  attendantId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  attendant: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  vehicles: z.lazy(() => VehicleEmergencyCallListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
});

export const EmergencyCallOrderByWithRelationInputSchema: z.ZodType<Prisma.EmergencyCallOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  protocol: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  returnLocation: z.lazy(() => SortOrderSchema).optional(),
  whatHappened: z.lazy(() => SortOrderSchema).optional(),
  patientCondition: z.lazy(() => SortOrderSchema).optional(),
  apparentAge: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  patientCount: z.lazy(() => SortOrderSchema).optional(),
  injuryCondition: z.lazy(() => SortOrderSchema).optional(),
  observations: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  attendantId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  attendant: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  vehicles: z.lazy(() => VehicleEmergencyCallOrderByRelationAggregateInputSchema).optional(),
  notifications: z.lazy(() => NotificationOrderByRelationAggregateInputSchema).optional(),
});

export const EmergencyCallWhereUniqueInputSchema: z.ZodType<Prisma.EmergencyCallWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    protocol: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    protocol: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  protocol: z.string().optional(),
  AND: z.union([ z.lazy(() => EmergencyCallWhereInputSchema), z.lazy(() => EmergencyCallWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmergencyCallWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmergencyCallWhereInputSchema), z.lazy(() => EmergencyCallWhereInputSchema).array() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  returnLocation: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  whatHappened: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  patientCondition: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  apparentAge: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  patientCount: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  injuryCondition: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  observations: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  attendantId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  attendant: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  vehicles: z.lazy(() => VehicleEmergencyCallListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
}));

export const EmergencyCallOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmergencyCallOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  protocol: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  returnLocation: z.lazy(() => SortOrderSchema).optional(),
  whatHappened: z.lazy(() => SortOrderSchema).optional(),
  patientCondition: z.lazy(() => SortOrderSchema).optional(),
  apparentAge: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  patientCount: z.lazy(() => SortOrderSchema).optional(),
  injuryCondition: z.lazy(() => SortOrderSchema).optional(),
  observations: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  attendantId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EmergencyCallCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EmergencyCallAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EmergencyCallMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EmergencyCallMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EmergencyCallSumOrderByAggregateInputSchema).optional(),
});

export const EmergencyCallScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EmergencyCallScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => EmergencyCallScalarWhereWithAggregatesInputSchema), z.lazy(() => EmergencyCallScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmergencyCallScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmergencyCallScalarWhereWithAggregatesInputSchema), z.lazy(() => EmergencyCallScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  protocol: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  returnLocation: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  whatHappened: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  patientCondition: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  apparentAge: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  patientCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  injuryCondition: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  observations: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  attendantId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const VehicleEmergencyCallWhereInputSchema: z.ZodType<Prisma.VehicleEmergencyCallWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => VehicleEmergencyCallWhereInputSchema), z.lazy(() => VehicleEmergencyCallWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VehicleEmergencyCallWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VehicleEmergencyCallWhereInputSchema), z.lazy(() => VehicleEmergencyCallWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumEmergencyCallStatusFilterSchema), z.lazy(() => EmergencyCallStatusSchema) ]).optional(),
  vehicleId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  emergencyCallId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  vehicle: z.union([ z.lazy(() => VehicleScalarRelationFilterSchema), z.lazy(() => VehicleWhereInputSchema) ]).optional(),
  emergencyCall: z.union([ z.lazy(() => EmergencyCallScalarRelationFilterSchema), z.lazy(() => EmergencyCallWhereInputSchema) ]).optional(),
});

export const VehicleEmergencyCallOrderByWithRelationInputSchema: z.ZodType<Prisma.VehicleEmergencyCallOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  vehicleId: z.lazy(() => SortOrderSchema).optional(),
  emergencyCallId: z.lazy(() => SortOrderSchema).optional(),
  vehicle: z.lazy(() => VehicleOrderByWithRelationInputSchema).optional(),
  emergencyCall: z.lazy(() => EmergencyCallOrderByWithRelationInputSchema).optional(),
});

export const VehicleEmergencyCallWhereUniqueInputSchema: z.ZodType<Prisma.VehicleEmergencyCallWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => VehicleEmergencyCallWhereInputSchema), z.lazy(() => VehicleEmergencyCallWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VehicleEmergencyCallWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VehicleEmergencyCallWhereInputSchema), z.lazy(() => VehicleEmergencyCallWhereInputSchema).array() ]).optional(),
  status: z.union([ z.lazy(() => EnumEmergencyCallStatusFilterSchema), z.lazy(() => EmergencyCallStatusSchema) ]).optional(),
  vehicleId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  emergencyCallId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  vehicle: z.union([ z.lazy(() => VehicleScalarRelationFilterSchema), z.lazy(() => VehicleWhereInputSchema) ]).optional(),
  emergencyCall: z.union([ z.lazy(() => EmergencyCallScalarRelationFilterSchema), z.lazy(() => EmergencyCallWhereInputSchema) ]).optional(),
}));

export const VehicleEmergencyCallOrderByWithAggregationInputSchema: z.ZodType<Prisma.VehicleEmergencyCallOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  vehicleId: z.lazy(() => SortOrderSchema).optional(),
  emergencyCallId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VehicleEmergencyCallCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VehicleEmergencyCallMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VehicleEmergencyCallMinOrderByAggregateInputSchema).optional(),
});

export const VehicleEmergencyCallScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VehicleEmergencyCallScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => VehicleEmergencyCallScalarWhereWithAggregatesInputSchema), z.lazy(() => VehicleEmergencyCallScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VehicleEmergencyCallScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VehicleEmergencyCallScalarWhereWithAggregatesInputSchema), z.lazy(() => VehicleEmergencyCallScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumEmergencyCallStatusWithAggregatesFilterSchema), z.lazy(() => EmergencyCallStatusSchema) ]).optional(),
  vehicleId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  emergencyCallId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const ConversationWhereInputSchema: z.ZodType<Prisma.ConversationWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ConversationWhereInputSchema), z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationWhereInputSchema), z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  attendantId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  driverId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  attendant: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  driver: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional(),
});

export const ConversationOrderByWithRelationInputSchema: z.ZodType<Prisma.ConversationOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  attendantId: z.lazy(() => SortOrderSchema).optional(),
  driverId: z.lazy(() => SortOrderSchema).optional(),
  attendant: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  driver: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  messages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional(),
});

export const ConversationWhereUniqueInputSchema: z.ZodType<Prisma.ConversationWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => ConversationWhereInputSchema), z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationWhereInputSchema), z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  attendantId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  driverId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  attendant: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  driver: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional(),
}));

export const ConversationOrderByWithAggregationInputSchema: z.ZodType<Prisma.ConversationOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  attendantId: z.lazy(() => SortOrderSchema).optional(),
  driverId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ConversationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ConversationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ConversationMinOrderByAggregateInputSchema).optional(),
});

export const ConversationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ConversationScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema), z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema), z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  attendantId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  driverId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const MessageWhereInputSchema: z.ZodType<Prisma.MessageWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => MessageWhereInputSchema), z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema), z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sentAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sender: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  conversation: z.union([ z.lazy(() => ConversationScalarRelationFilterSchema), z.lazy(() => ConversationWhereInputSchema) ]).optional(),
});

export const MessageOrderByWithRelationInputSchema: z.ZodType<Prisma.MessageOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  sentAt: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  sender: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  conversation: z.lazy(() => ConversationOrderByWithRelationInputSchema).optional(),
});

export const MessageWhereUniqueInputSchema: z.ZodType<Prisma.MessageWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => MessageWhereInputSchema), z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema), z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sentAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sender: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  conversation: z.union([ z.lazy(() => ConversationScalarRelationFilterSchema), z.lazy(() => ConversationWhereInputSchema) ]).optional(),
}));

export const MessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.MessageOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  sentAt: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MessageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MessageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MessageMinOrderByAggregateInputSchema).optional(),
});

export const MessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MessageScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema), z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema), z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  sentAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  senderId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const NotificationWhereInputSchema: z.ZodType<Prisma.NotificationWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => NotificationWhereInputSchema), z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationWhereInputSchema), z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  notifiedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  emergencyCallId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  emergencyCall: z.union([ z.lazy(() => EmergencyCallScalarRelationFilterSchema), z.lazy(() => EmergencyCallWhereInputSchema) ]).optional(),
});

export const NotificationOrderByWithRelationInputSchema: z.ZodType<Prisma.NotificationOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  notifiedAt: z.lazy(() => SortOrderSchema).optional(),
  emergencyCallId: z.lazy(() => SortOrderSchema).optional(),
  emergencyCall: z.lazy(() => EmergencyCallOrderByWithRelationInputSchema).optional(),
});

export const NotificationWhereUniqueInputSchema: z.ZodType<Prisma.NotificationWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => NotificationWhereInputSchema), z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationWhereInputSchema), z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  notifiedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  emergencyCallId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  emergencyCall: z.union([ z.lazy(() => EmergencyCallScalarRelationFilterSchema), z.lazy(() => EmergencyCallWhereInputSchema) ]).optional(),
}));

export const NotificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.NotificationOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  notifiedAt: z.lazy(() => SortOrderSchema).optional(),
  emergencyCallId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NotificationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NotificationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NotificationMinOrderByAggregateInputSchema).optional(),
});

export const NotificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NotificationScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema), z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema), z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  notifiedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  emergencyCallId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleSchema),
  phone: z.string(),
  status: z.lazy(() => UserStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutDriverInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationCreateNestedManyWithoutDriverInputSchema).optional(),
  sentMessages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleSchema),
  phone: z.string(),
  status: z.lazy(() => UserStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  vehicle: z.lazy(() => VehicleUncheckedCreateNestedOneWithoutDriverInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallUncheckedCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutDriverInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneWithoutDriverNestedInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationUpdateManyWithoutDriverNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle: z.lazy(() => VehicleUncheckedUpdateOneWithoutDriverNestedInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallUncheckedUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationUncheckedUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationUncheckedUpdateManyWithoutDriverNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleSchema),
  phone: z.string(),
  status: z.lazy(() => UserStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VehicleCreateInputSchema: z.ZodType<Prisma.VehicleCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  plate: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  driver: z.lazy(() => UserCreateNestedOneWithoutVehicleInputSchema),
  emergencyCalls: z.lazy(() => VehicleEmergencyCallCreateNestedManyWithoutVehicleInputSchema).optional(),
});

export const VehicleUncheckedCreateInputSchema: z.ZodType<Prisma.VehicleUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  plate: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  driverId: z.string(),
  emergencyCalls: z.lazy(() => VehicleEmergencyCallUncheckedCreateNestedManyWithoutVehicleInputSchema).optional(),
});

export const VehicleUpdateInputSchema: z.ZodType<Prisma.VehicleUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  driver: z.lazy(() => UserUpdateOneRequiredWithoutVehicleNestedInputSchema).optional(),
  emergencyCalls: z.lazy(() => VehicleEmergencyCallUpdateManyWithoutVehicleNestedInputSchema).optional(),
});

export const VehicleUncheckedUpdateInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyCalls: z.lazy(() => VehicleEmergencyCallUncheckedUpdateManyWithoutVehicleNestedInputSchema).optional(),
});

export const VehicleCreateManyInputSchema: z.ZodType<Prisma.VehicleCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  plate: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  driverId: z.string(),
});

export const VehicleUpdateManyMutationInputSchema: z.ZodType<Prisma.VehicleUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VehicleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EmergencyCallCreateInputSchema: z.ZodType<Prisma.EmergencyCallCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  protocol: z.string(),
  address: z.string(),
  returnLocation: z.string(),
  whatHappened: z.string(),
  patientCondition: z.string(),
  apparentAge: z.number().int().optional().nullable(),
  patientCount: z.number().int(),
  injuryCondition: z.string(),
  observations: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  attendant: z.lazy(() => UserCreateNestedOneWithoutRegisteredCallsInputSchema),
  vehicles: z.lazy(() => VehicleEmergencyCallCreateNestedManyWithoutEmergencyCallInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutEmergencyCallInputSchema).optional(),
});

export const EmergencyCallUncheckedCreateInputSchema: z.ZodType<Prisma.EmergencyCallUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  protocol: z.string(),
  address: z.string(),
  returnLocation: z.string(),
  whatHappened: z.string(),
  patientCondition: z.string(),
  apparentAge: z.number().int().optional().nullable(),
  patientCount: z.number().int(),
  injuryCondition: z.string(),
  observations: z.string().optional().nullable(),
  attendantId: z.string(),
  createdAt: z.coerce.date().optional(),
  vehicles: z.lazy(() => VehicleEmergencyCallUncheckedCreateNestedManyWithoutEmergencyCallInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutEmergencyCallInputSchema).optional(),
});

export const EmergencyCallUpdateInputSchema: z.ZodType<Prisma.EmergencyCallUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  protocol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  returnLocation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  whatHappened: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apparentAge: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patientCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  injuryCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  attendant: z.lazy(() => UserUpdateOneRequiredWithoutRegisteredCallsNestedInputSchema).optional(),
  vehicles: z.lazy(() => VehicleEmergencyCallUpdateManyWithoutEmergencyCallNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutEmergencyCallNestedInputSchema).optional(),
});

export const EmergencyCallUncheckedUpdateInputSchema: z.ZodType<Prisma.EmergencyCallUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  protocol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  returnLocation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  whatHappened: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apparentAge: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patientCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  injuryCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  attendantId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vehicles: z.lazy(() => VehicleEmergencyCallUncheckedUpdateManyWithoutEmergencyCallNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutEmergencyCallNestedInputSchema).optional(),
});

export const EmergencyCallCreateManyInputSchema: z.ZodType<Prisma.EmergencyCallCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  protocol: z.string(),
  address: z.string(),
  returnLocation: z.string(),
  whatHappened: z.string(),
  patientCondition: z.string(),
  apparentAge: z.number().int().optional().nullable(),
  patientCount: z.number().int(),
  injuryCondition: z.string(),
  observations: z.string().optional().nullable(),
  attendantId: z.string(),
  createdAt: z.coerce.date().optional(),
});

export const EmergencyCallUpdateManyMutationInputSchema: z.ZodType<Prisma.EmergencyCallUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  protocol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  returnLocation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  whatHappened: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apparentAge: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patientCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  injuryCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EmergencyCallUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EmergencyCallUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  protocol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  returnLocation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  whatHappened: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apparentAge: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patientCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  injuryCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  attendantId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VehicleEmergencyCallCreateInputSchema: z.ZodType<Prisma.VehicleEmergencyCallCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  status: z.lazy(() => EmergencyCallStatusSchema).optional(),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutEmergencyCallsInputSchema),
  emergencyCall: z.lazy(() => EmergencyCallCreateNestedOneWithoutVehiclesInputSchema),
});

export const VehicleEmergencyCallUncheckedCreateInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  status: z.lazy(() => EmergencyCallStatusSchema).optional(),
  vehicleId: z.string(),
  emergencyCallId: z.string(),
});

export const VehicleEmergencyCallUpdateInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => EmergencyCallStatusSchema), z.lazy(() => EnumEmergencyCallStatusFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutEmergencyCallsNestedInputSchema).optional(),
  emergencyCall: z.lazy(() => EmergencyCallUpdateOneRequiredWithoutVehiclesNestedInputSchema).optional(),
});

export const VehicleEmergencyCallUncheckedUpdateInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => EmergencyCallStatusSchema), z.lazy(() => EnumEmergencyCallStatusFieldUpdateOperationsInputSchema) ]).optional(),
  vehicleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyCallId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VehicleEmergencyCallCreateManyInputSchema: z.ZodType<Prisma.VehicleEmergencyCallCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  status: z.lazy(() => EmergencyCallStatusSchema).optional(),
  vehicleId: z.string(),
  emergencyCallId: z.string(),
});

export const VehicleEmergencyCallUpdateManyMutationInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => EmergencyCallStatusSchema), z.lazy(() => EnumEmergencyCallStatusFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VehicleEmergencyCallUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => EmergencyCallStatusSchema), z.lazy(() => EnumEmergencyCallStatusFieldUpdateOperationsInputSchema) ]).optional(),
  vehicleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyCallId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ConversationCreateInputSchema: z.ZodType<Prisma.ConversationCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  attendant: z.lazy(() => UserCreateNestedOneWithoutConversationsAsAttendantInputSchema),
  driver: z.lazy(() => UserCreateNestedOneWithoutConversationsAsDriverInputSchema),
  messages: z.lazy(() => MessageCreateNestedManyWithoutConversationInputSchema).optional(),
});

export const ConversationUncheckedCreateInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  attendantId: z.string(),
  driverId: z.string(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional(),
});

export const ConversationUpdateInputSchema: z.ZodType<Prisma.ConversationUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  attendant: z.lazy(() => UserUpdateOneRequiredWithoutConversationsAsAttendantNestedInputSchema).optional(),
  driver: z.lazy(() => UserUpdateOneRequiredWithoutConversationsAsDriverNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutConversationNestedInputSchema).optional(),
});

export const ConversationUncheckedUpdateInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  attendantId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutConversationNestedInputSchema).optional(),
});

export const ConversationCreateManyInputSchema: z.ZodType<Prisma.ConversationCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  attendantId: z.string(),
  driverId: z.string(),
});

export const ConversationUpdateManyMutationInputSchema: z.ZodType<Prisma.ConversationUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ConversationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  attendantId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const MessageCreateInputSchema: z.ZodType<Prisma.MessageCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  text: z.string(),
  sentAt: z.coerce.date().optional(),
  sender: z.lazy(() => UserCreateNestedOneWithoutSentMessagesInputSchema),
  conversation: z.lazy(() => ConversationCreateNestedOneWithoutMessagesInputSchema),
});

export const MessageUncheckedCreateInputSchema: z.ZodType<Prisma.MessageUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  text: z.string(),
  sentAt: z.coerce.date().optional(),
  senderId: z.string(),
  conversationId: z.string(),
});

export const MessageUpdateInputSchema: z.ZodType<Prisma.MessageUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sentAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sender: z.lazy(() => UserUpdateOneRequiredWithoutSentMessagesNestedInputSchema).optional(),
  conversation: z.lazy(() => ConversationUpdateOneRequiredWithoutMessagesNestedInputSchema).optional(),
});

export const MessageUncheckedUpdateInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sentAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const MessageCreateManyInputSchema: z.ZodType<Prisma.MessageCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  text: z.string(),
  sentAt: z.coerce.date().optional(),
  senderId: z.string(),
  conversationId: z.string(),
});

export const MessageUpdateManyMutationInputSchema: z.ZodType<Prisma.MessageUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sentAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const MessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sentAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const NotificationCreateInputSchema: z.ZodType<Prisma.NotificationCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  message: z.string(),
  notifiedAt: z.coerce.date().optional(),
  emergencyCall: z.lazy(() => EmergencyCallCreateNestedOneWithoutNotificationsInputSchema),
});

export const NotificationUncheckedCreateInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  message: z.string(),
  notifiedAt: z.coerce.date().optional(),
  emergencyCallId: z.string(),
});

export const NotificationUpdateInputSchema: z.ZodType<Prisma.NotificationUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notifiedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyCall: z.lazy(() => EmergencyCallUpdateOneRequiredWithoutNotificationsNestedInputSchema).optional(),
});

export const NotificationUncheckedUpdateInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notifiedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyCallId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const NotificationCreateManyInputSchema: z.ZodType<Prisma.NotificationCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  message: z.string(),
  notifiedAt: z.coerce.date().optional(),
  emergencyCallId: z.string(),
});

export const NotificationUpdateManyMutationInputSchema: z.ZodType<Prisma.NotificationUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notifiedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const NotificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notifiedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyCallId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const EnumUserRoleFilterSchema: z.ZodType<Prisma.EnumUserRoleFilter> = z.strictObject({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => NestedEnumUserRoleFilterSchema) ]).optional(),
});

export const EnumUserStatusFilterSchema: z.ZodType<Prisma.EnumUserStatusFilter> = z.strictObject({
  equals: z.lazy(() => UserStatusSchema).optional(),
  in: z.lazy(() => UserStatusSchema).array().optional(),
  notIn: z.lazy(() => UserStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => NestedEnumUserStatusFilterSchema) ]).optional(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const VehicleNullableScalarRelationFilterSchema: z.ZodType<Prisma.VehicleNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => VehicleWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => VehicleWhereInputSchema).optional().nullable(),
});

export const EmergencyCallListRelationFilterSchema: z.ZodType<Prisma.EmergencyCallListRelationFilter> = z.strictObject({
  every: z.lazy(() => EmergencyCallWhereInputSchema).optional(),
  some: z.lazy(() => EmergencyCallWhereInputSchema).optional(),
  none: z.lazy(() => EmergencyCallWhereInputSchema).optional(),
});

export const ConversationListRelationFilterSchema: z.ZodType<Prisma.ConversationListRelationFilter> = z.strictObject({
  every: z.lazy(() => ConversationWhereInputSchema).optional(),
  some: z.lazy(() => ConversationWhereInputSchema).optional(),
  none: z.lazy(() => ConversationWhereInputSchema).optional(),
});

export const MessageListRelationFilterSchema: z.ZodType<Prisma.MessageListRelationFilter> = z.strictObject({
  every: z.lazy(() => MessageWhereInputSchema).optional(),
  some: z.lazy(() => MessageWhereInputSchema).optional(),
  none: z.lazy(() => MessageWhereInputSchema).optional(),
});

export const EmergencyCallOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EmergencyCallOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ConversationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ConversationOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const MessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MessageOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const EnumUserRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => NestedEnumUserRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
});

export const EnumUserStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => UserStatusSchema).optional(),
  in: z.lazy(() => UserStatusSchema).array().optional(),
  notIn: z.lazy(() => UserStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => NestedEnumUserStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserStatusFilterSchema).optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const VehicleEmergencyCallListRelationFilterSchema: z.ZodType<Prisma.VehicleEmergencyCallListRelationFilter> = z.strictObject({
  every: z.lazy(() => VehicleEmergencyCallWhereInputSchema).optional(),
  some: z.lazy(() => VehicleEmergencyCallWhereInputSchema).optional(),
  none: z.lazy(() => VehicleEmergencyCallWhereInputSchema).optional(),
});

export const VehicleEmergencyCallOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VehicleEmergencyCallOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const VehicleCountOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  plate: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  driverId: z.lazy(() => SortOrderSchema).optional(),
});

export const VehicleAvgOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleAvgOrderByAggregateInput> = z.strictObject({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
});

export const VehicleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  plate: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  driverId: z.lazy(() => SortOrderSchema).optional(),
});

export const VehicleMinOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  plate: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  driverId: z.lazy(() => SortOrderSchema).optional(),
});

export const VehicleSumOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleSumOrderByAggregateInput> = z.strictObject({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
});

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
});

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NotificationListRelationFilterSchema: z.ZodType<Prisma.NotificationListRelationFilter> = z.strictObject({
  every: z.lazy(() => NotificationWhereInputSchema).optional(),
  some: z.lazy(() => NotificationWhereInputSchema).optional(),
  none: z.lazy(() => NotificationWhereInputSchema).optional(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const NotificationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NotificationOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const EmergencyCallCountOrderByAggregateInputSchema: z.ZodType<Prisma.EmergencyCallCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  protocol: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  returnLocation: z.lazy(() => SortOrderSchema).optional(),
  whatHappened: z.lazy(() => SortOrderSchema).optional(),
  patientCondition: z.lazy(() => SortOrderSchema).optional(),
  apparentAge: z.lazy(() => SortOrderSchema).optional(),
  patientCount: z.lazy(() => SortOrderSchema).optional(),
  injuryCondition: z.lazy(() => SortOrderSchema).optional(),
  observations: z.lazy(() => SortOrderSchema).optional(),
  attendantId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const EmergencyCallAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EmergencyCallAvgOrderByAggregateInput> = z.strictObject({
  apparentAge: z.lazy(() => SortOrderSchema).optional(),
  patientCount: z.lazy(() => SortOrderSchema).optional(),
});

export const EmergencyCallMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EmergencyCallMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  protocol: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  returnLocation: z.lazy(() => SortOrderSchema).optional(),
  whatHappened: z.lazy(() => SortOrderSchema).optional(),
  patientCondition: z.lazy(() => SortOrderSchema).optional(),
  apparentAge: z.lazy(() => SortOrderSchema).optional(),
  patientCount: z.lazy(() => SortOrderSchema).optional(),
  injuryCondition: z.lazy(() => SortOrderSchema).optional(),
  observations: z.lazy(() => SortOrderSchema).optional(),
  attendantId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const EmergencyCallMinOrderByAggregateInputSchema: z.ZodType<Prisma.EmergencyCallMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  protocol: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  returnLocation: z.lazy(() => SortOrderSchema).optional(),
  whatHappened: z.lazy(() => SortOrderSchema).optional(),
  patientCondition: z.lazy(() => SortOrderSchema).optional(),
  apparentAge: z.lazy(() => SortOrderSchema).optional(),
  patientCount: z.lazy(() => SortOrderSchema).optional(),
  injuryCondition: z.lazy(() => SortOrderSchema).optional(),
  observations: z.lazy(() => SortOrderSchema).optional(),
  attendantId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const EmergencyCallSumOrderByAggregateInputSchema: z.ZodType<Prisma.EmergencyCallSumOrderByAggregateInput> = z.strictObject({
  apparentAge: z.lazy(() => SortOrderSchema).optional(),
  patientCount: z.lazy(() => SortOrderSchema).optional(),
});

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
});

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const EnumEmergencyCallStatusFilterSchema: z.ZodType<Prisma.EnumEmergencyCallStatusFilter> = z.strictObject({
  equals: z.lazy(() => EmergencyCallStatusSchema).optional(),
  in: z.lazy(() => EmergencyCallStatusSchema).array().optional(),
  notIn: z.lazy(() => EmergencyCallStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EmergencyCallStatusSchema), z.lazy(() => NestedEnumEmergencyCallStatusFilterSchema) ]).optional(),
});

export const VehicleScalarRelationFilterSchema: z.ZodType<Prisma.VehicleScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => VehicleWhereInputSchema).optional(),
  isNot: z.lazy(() => VehicleWhereInputSchema).optional(),
});

export const EmergencyCallScalarRelationFilterSchema: z.ZodType<Prisma.EmergencyCallScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => EmergencyCallWhereInputSchema).optional(),
  isNot: z.lazy(() => EmergencyCallWhereInputSchema).optional(),
});

export const VehicleEmergencyCallCountOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleEmergencyCallCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  vehicleId: z.lazy(() => SortOrderSchema).optional(),
  emergencyCallId: z.lazy(() => SortOrderSchema).optional(),
});

export const VehicleEmergencyCallMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleEmergencyCallMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  vehicleId: z.lazy(() => SortOrderSchema).optional(),
  emergencyCallId: z.lazy(() => SortOrderSchema).optional(),
});

export const VehicleEmergencyCallMinOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleEmergencyCallMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  vehicleId: z.lazy(() => SortOrderSchema).optional(),
  emergencyCallId: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumEmergencyCallStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEmergencyCallStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => EmergencyCallStatusSchema).optional(),
  in: z.lazy(() => EmergencyCallStatusSchema).array().optional(),
  notIn: z.lazy(() => EmergencyCallStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EmergencyCallStatusSchema), z.lazy(() => NestedEnumEmergencyCallStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEmergencyCallStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEmergencyCallStatusFilterSchema).optional(),
});

export const ConversationCountOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  attendantId: z.lazy(() => SortOrderSchema).optional(),
  driverId: z.lazy(() => SortOrderSchema).optional(),
});

export const ConversationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  attendantId: z.lazy(() => SortOrderSchema).optional(),
  driverId: z.lazy(() => SortOrderSchema).optional(),
});

export const ConversationMinOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  attendantId: z.lazy(() => SortOrderSchema).optional(),
  driverId: z.lazy(() => SortOrderSchema).optional(),
});

export const ConversationScalarRelationFilterSchema: z.ZodType<Prisma.ConversationScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ConversationWhereInputSchema).optional(),
  isNot: z.lazy(() => ConversationWhereInputSchema).optional(),
});

export const MessageCountOrderByAggregateInputSchema: z.ZodType<Prisma.MessageCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  sentAt: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
});

export const MessageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  sentAt: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
});

export const MessageMinOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  sentAt: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
});

export const NotificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  notifiedAt: z.lazy(() => SortOrderSchema).optional(),
  emergencyCallId: z.lazy(() => SortOrderSchema).optional(),
});

export const NotificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  notifiedAt: z.lazy(() => SortOrderSchema).optional(),
  emergencyCallId: z.lazy(() => SortOrderSchema).optional(),
});

export const NotificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  notifiedAt: z.lazy(() => SortOrderSchema).optional(),
  emergencyCallId: z.lazy(() => SortOrderSchema).optional(),
});

export const VehicleCreateNestedOneWithoutDriverInputSchema: z.ZodType<Prisma.VehicleCreateNestedOneWithoutDriverInput> = z.strictObject({
  create: z.union([ z.lazy(() => VehicleCreateWithoutDriverInputSchema), z.lazy(() => VehicleUncheckedCreateWithoutDriverInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VehicleCreateOrConnectWithoutDriverInputSchema).optional(),
  connect: z.lazy(() => VehicleWhereUniqueInputSchema).optional(),
});

export const EmergencyCallCreateNestedManyWithoutAttendantInputSchema: z.ZodType<Prisma.EmergencyCallCreateNestedManyWithoutAttendantInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyCallCreateWithoutAttendantInputSchema), z.lazy(() => EmergencyCallCreateWithoutAttendantInputSchema).array(), z.lazy(() => EmergencyCallUncheckedCreateWithoutAttendantInputSchema), z.lazy(() => EmergencyCallUncheckedCreateWithoutAttendantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmergencyCallCreateOrConnectWithoutAttendantInputSchema), z.lazy(() => EmergencyCallCreateOrConnectWithoutAttendantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmergencyCallCreateManyAttendantInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmergencyCallWhereUniqueInputSchema), z.lazy(() => EmergencyCallWhereUniqueInputSchema).array() ]).optional(),
});

export const ConversationCreateNestedManyWithoutAttendantInputSchema: z.ZodType<Prisma.ConversationCreateNestedManyWithoutAttendantInput> = z.strictObject({
  create: z.union([ z.lazy(() => ConversationCreateWithoutAttendantInputSchema), z.lazy(() => ConversationCreateWithoutAttendantInputSchema).array(), z.lazy(() => ConversationUncheckedCreateWithoutAttendantInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutAttendantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutAttendantInputSchema), z.lazy(() => ConversationCreateOrConnectWithoutAttendantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyAttendantInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
});

export const ConversationCreateNestedManyWithoutDriverInputSchema: z.ZodType<Prisma.ConversationCreateNestedManyWithoutDriverInput> = z.strictObject({
  create: z.union([ z.lazy(() => ConversationCreateWithoutDriverInputSchema), z.lazy(() => ConversationCreateWithoutDriverInputSchema).array(), z.lazy(() => ConversationUncheckedCreateWithoutDriverInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutDriverInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutDriverInputSchema), z.lazy(() => ConversationCreateOrConnectWithoutDriverInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyDriverInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
});

export const MessageCreateNestedManyWithoutSenderInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutSenderInput> = z.strictObject({
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema), z.lazy(() => MessageCreateWithoutSenderInputSchema).array(), z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema), z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema), z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySenderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
});

export const VehicleUncheckedCreateNestedOneWithoutDriverInputSchema: z.ZodType<Prisma.VehicleUncheckedCreateNestedOneWithoutDriverInput> = z.strictObject({
  create: z.union([ z.lazy(() => VehicleCreateWithoutDriverInputSchema), z.lazy(() => VehicleUncheckedCreateWithoutDriverInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VehicleCreateOrConnectWithoutDriverInputSchema).optional(),
  connect: z.lazy(() => VehicleWhereUniqueInputSchema).optional(),
});

export const EmergencyCallUncheckedCreateNestedManyWithoutAttendantInputSchema: z.ZodType<Prisma.EmergencyCallUncheckedCreateNestedManyWithoutAttendantInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyCallCreateWithoutAttendantInputSchema), z.lazy(() => EmergencyCallCreateWithoutAttendantInputSchema).array(), z.lazy(() => EmergencyCallUncheckedCreateWithoutAttendantInputSchema), z.lazy(() => EmergencyCallUncheckedCreateWithoutAttendantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmergencyCallCreateOrConnectWithoutAttendantInputSchema), z.lazy(() => EmergencyCallCreateOrConnectWithoutAttendantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmergencyCallCreateManyAttendantInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmergencyCallWhereUniqueInputSchema), z.lazy(() => EmergencyCallWhereUniqueInputSchema).array() ]).optional(),
});

export const ConversationUncheckedCreateNestedManyWithoutAttendantInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateNestedManyWithoutAttendantInput> = z.strictObject({
  create: z.union([ z.lazy(() => ConversationCreateWithoutAttendantInputSchema), z.lazy(() => ConversationCreateWithoutAttendantInputSchema).array(), z.lazy(() => ConversationUncheckedCreateWithoutAttendantInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutAttendantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutAttendantInputSchema), z.lazy(() => ConversationCreateOrConnectWithoutAttendantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyAttendantInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
});

export const ConversationUncheckedCreateNestedManyWithoutDriverInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateNestedManyWithoutDriverInput> = z.strictObject({
  create: z.union([ z.lazy(() => ConversationCreateWithoutDriverInputSchema), z.lazy(() => ConversationCreateWithoutDriverInputSchema).array(), z.lazy(() => ConversationUncheckedCreateWithoutDriverInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutDriverInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutDriverInputSchema), z.lazy(() => ConversationCreateOrConnectWithoutDriverInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyDriverInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
});

export const MessageUncheckedCreateNestedManyWithoutSenderInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutSenderInput> = z.strictObject({
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema), z.lazy(() => MessageCreateWithoutSenderInputSchema).array(), z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema), z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema), z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySenderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const EnumUserRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserRoleFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => UserRoleSchema).optional(),
});

export const EnumUserStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserStatusFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => UserStatusSchema).optional(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const VehicleUpdateOneWithoutDriverNestedInputSchema: z.ZodType<Prisma.VehicleUpdateOneWithoutDriverNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => VehicleCreateWithoutDriverInputSchema), z.lazy(() => VehicleUncheckedCreateWithoutDriverInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VehicleCreateOrConnectWithoutDriverInputSchema).optional(),
  upsert: z.lazy(() => VehicleUpsertWithoutDriverInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => VehicleWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => VehicleWhereInputSchema) ]).optional(),
  connect: z.lazy(() => VehicleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => VehicleUpdateToOneWithWhereWithoutDriverInputSchema), z.lazy(() => VehicleUpdateWithoutDriverInputSchema), z.lazy(() => VehicleUncheckedUpdateWithoutDriverInputSchema) ]).optional(),
});

export const EmergencyCallUpdateManyWithoutAttendantNestedInputSchema: z.ZodType<Prisma.EmergencyCallUpdateManyWithoutAttendantNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyCallCreateWithoutAttendantInputSchema), z.lazy(() => EmergencyCallCreateWithoutAttendantInputSchema).array(), z.lazy(() => EmergencyCallUncheckedCreateWithoutAttendantInputSchema), z.lazy(() => EmergencyCallUncheckedCreateWithoutAttendantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmergencyCallCreateOrConnectWithoutAttendantInputSchema), z.lazy(() => EmergencyCallCreateOrConnectWithoutAttendantInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmergencyCallUpsertWithWhereUniqueWithoutAttendantInputSchema), z.lazy(() => EmergencyCallUpsertWithWhereUniqueWithoutAttendantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmergencyCallCreateManyAttendantInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmergencyCallWhereUniqueInputSchema), z.lazy(() => EmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmergencyCallWhereUniqueInputSchema), z.lazy(() => EmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmergencyCallWhereUniqueInputSchema), z.lazy(() => EmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmergencyCallWhereUniqueInputSchema), z.lazy(() => EmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmergencyCallUpdateWithWhereUniqueWithoutAttendantInputSchema), z.lazy(() => EmergencyCallUpdateWithWhereUniqueWithoutAttendantInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmergencyCallUpdateManyWithWhereWithoutAttendantInputSchema), z.lazy(() => EmergencyCallUpdateManyWithWhereWithoutAttendantInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmergencyCallScalarWhereInputSchema), z.lazy(() => EmergencyCallScalarWhereInputSchema).array() ]).optional(),
});

export const ConversationUpdateManyWithoutAttendantNestedInputSchema: z.ZodType<Prisma.ConversationUpdateManyWithoutAttendantNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ConversationCreateWithoutAttendantInputSchema), z.lazy(() => ConversationCreateWithoutAttendantInputSchema).array(), z.lazy(() => ConversationUncheckedCreateWithoutAttendantInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutAttendantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutAttendantInputSchema), z.lazy(() => ConversationCreateOrConnectWithoutAttendantInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversationUpsertWithWhereUniqueWithoutAttendantInputSchema), z.lazy(() => ConversationUpsertWithWhereUniqueWithoutAttendantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyAttendantInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateWithWhereUniqueWithoutAttendantInputSchema), z.lazy(() => ConversationUpdateWithWhereUniqueWithoutAttendantInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversationUpdateManyWithWhereWithoutAttendantInputSchema), z.lazy(() => ConversationUpdateManyWithWhereWithoutAttendantInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversationScalarWhereInputSchema), z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
});

export const ConversationUpdateManyWithoutDriverNestedInputSchema: z.ZodType<Prisma.ConversationUpdateManyWithoutDriverNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ConversationCreateWithoutDriverInputSchema), z.lazy(() => ConversationCreateWithoutDriverInputSchema).array(), z.lazy(() => ConversationUncheckedCreateWithoutDriverInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutDriverInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutDriverInputSchema), z.lazy(() => ConversationCreateOrConnectWithoutDriverInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversationUpsertWithWhereUniqueWithoutDriverInputSchema), z.lazy(() => ConversationUpsertWithWhereUniqueWithoutDriverInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyDriverInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateWithWhereUniqueWithoutDriverInputSchema), z.lazy(() => ConversationUpdateWithWhereUniqueWithoutDriverInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversationUpdateManyWithWhereWithoutDriverInputSchema), z.lazy(() => ConversationUpdateManyWithWhereWithoutDriverInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversationScalarWhereInputSchema), z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
});

export const MessageUpdateManyWithoutSenderNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutSenderNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema), z.lazy(() => MessageCreateWithoutSenderInputSchema).array(), z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema), z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema), z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutSenderInputSchema), z.lazy(() => MessageUpsertWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySenderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutSenderInputSchema), z.lazy(() => MessageUpdateWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutSenderInputSchema), z.lazy(() => MessageUpdateManyWithWhereWithoutSenderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema), z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
});

export const VehicleUncheckedUpdateOneWithoutDriverNestedInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateOneWithoutDriverNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => VehicleCreateWithoutDriverInputSchema), z.lazy(() => VehicleUncheckedCreateWithoutDriverInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VehicleCreateOrConnectWithoutDriverInputSchema).optional(),
  upsert: z.lazy(() => VehicleUpsertWithoutDriverInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => VehicleWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => VehicleWhereInputSchema) ]).optional(),
  connect: z.lazy(() => VehicleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => VehicleUpdateToOneWithWhereWithoutDriverInputSchema), z.lazy(() => VehicleUpdateWithoutDriverInputSchema), z.lazy(() => VehicleUncheckedUpdateWithoutDriverInputSchema) ]).optional(),
});

export const EmergencyCallUncheckedUpdateManyWithoutAttendantNestedInputSchema: z.ZodType<Prisma.EmergencyCallUncheckedUpdateManyWithoutAttendantNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyCallCreateWithoutAttendantInputSchema), z.lazy(() => EmergencyCallCreateWithoutAttendantInputSchema).array(), z.lazy(() => EmergencyCallUncheckedCreateWithoutAttendantInputSchema), z.lazy(() => EmergencyCallUncheckedCreateWithoutAttendantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmergencyCallCreateOrConnectWithoutAttendantInputSchema), z.lazy(() => EmergencyCallCreateOrConnectWithoutAttendantInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmergencyCallUpsertWithWhereUniqueWithoutAttendantInputSchema), z.lazy(() => EmergencyCallUpsertWithWhereUniqueWithoutAttendantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmergencyCallCreateManyAttendantInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmergencyCallWhereUniqueInputSchema), z.lazy(() => EmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmergencyCallWhereUniqueInputSchema), z.lazy(() => EmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmergencyCallWhereUniqueInputSchema), z.lazy(() => EmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmergencyCallWhereUniqueInputSchema), z.lazy(() => EmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmergencyCallUpdateWithWhereUniqueWithoutAttendantInputSchema), z.lazy(() => EmergencyCallUpdateWithWhereUniqueWithoutAttendantInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmergencyCallUpdateManyWithWhereWithoutAttendantInputSchema), z.lazy(() => EmergencyCallUpdateManyWithWhereWithoutAttendantInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmergencyCallScalarWhereInputSchema), z.lazy(() => EmergencyCallScalarWhereInputSchema).array() ]).optional(),
});

export const ConversationUncheckedUpdateManyWithoutAttendantNestedInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyWithoutAttendantNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ConversationCreateWithoutAttendantInputSchema), z.lazy(() => ConversationCreateWithoutAttendantInputSchema).array(), z.lazy(() => ConversationUncheckedCreateWithoutAttendantInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutAttendantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutAttendantInputSchema), z.lazy(() => ConversationCreateOrConnectWithoutAttendantInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversationUpsertWithWhereUniqueWithoutAttendantInputSchema), z.lazy(() => ConversationUpsertWithWhereUniqueWithoutAttendantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyAttendantInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateWithWhereUniqueWithoutAttendantInputSchema), z.lazy(() => ConversationUpdateWithWhereUniqueWithoutAttendantInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversationUpdateManyWithWhereWithoutAttendantInputSchema), z.lazy(() => ConversationUpdateManyWithWhereWithoutAttendantInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversationScalarWhereInputSchema), z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
});

export const ConversationUncheckedUpdateManyWithoutDriverNestedInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyWithoutDriverNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ConversationCreateWithoutDriverInputSchema), z.lazy(() => ConversationCreateWithoutDriverInputSchema).array(), z.lazy(() => ConversationUncheckedCreateWithoutDriverInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutDriverInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutDriverInputSchema), z.lazy(() => ConversationCreateOrConnectWithoutDriverInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversationUpsertWithWhereUniqueWithoutDriverInputSchema), z.lazy(() => ConversationUpsertWithWhereUniqueWithoutDriverInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyDriverInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema), z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateWithWhereUniqueWithoutDriverInputSchema), z.lazy(() => ConversationUpdateWithWhereUniqueWithoutDriverInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversationUpdateManyWithWhereWithoutDriverInputSchema), z.lazy(() => ConversationUpdateManyWithWhereWithoutDriverInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversationScalarWhereInputSchema), z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
});

export const MessageUncheckedUpdateManyWithoutSenderNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutSenderNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema), z.lazy(() => MessageCreateWithoutSenderInputSchema).array(), z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema), z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema), z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutSenderInputSchema), z.lazy(() => MessageUpsertWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySenderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutSenderInputSchema), z.lazy(() => MessageUpdateWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutSenderInputSchema), z.lazy(() => MessageUpdateManyWithWhereWithoutSenderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema), z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutVehicleInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutVehicleInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutVehicleInputSchema), z.lazy(() => UserUncheckedCreateWithoutVehicleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVehicleInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const VehicleEmergencyCallCreateNestedManyWithoutVehicleInputSchema: z.ZodType<Prisma.VehicleEmergencyCallCreateNestedManyWithoutVehicleInput> = z.strictObject({
  create: z.union([ z.lazy(() => VehicleEmergencyCallCreateWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallCreateWithoutVehicleInputSchema).array(), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutVehicleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutVehicleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VehicleEmergencyCallCreateManyVehicleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
});

export const VehicleEmergencyCallUncheckedCreateNestedManyWithoutVehicleInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUncheckedCreateNestedManyWithoutVehicleInput> = z.strictObject({
  create: z.union([ z.lazy(() => VehicleEmergencyCallCreateWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallCreateWithoutVehicleInputSchema).array(), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutVehicleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutVehicleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VehicleEmergencyCallCreateManyVehicleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
});

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const UserUpdateOneRequiredWithoutVehicleNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutVehicleNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutVehicleInputSchema), z.lazy(() => UserUncheckedCreateWithoutVehicleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVehicleInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutVehicleInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutVehicleInputSchema), z.lazy(() => UserUpdateWithoutVehicleInputSchema), z.lazy(() => UserUncheckedUpdateWithoutVehicleInputSchema) ]).optional(),
});

export const VehicleEmergencyCallUpdateManyWithoutVehicleNestedInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUpdateManyWithoutVehicleNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => VehicleEmergencyCallCreateWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallCreateWithoutVehicleInputSchema).array(), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutVehicleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutVehicleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VehicleEmergencyCallUpsertWithWhereUniqueWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallUpsertWithWhereUniqueWithoutVehicleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VehicleEmergencyCallCreateManyVehicleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VehicleEmergencyCallUpdateWithWhereUniqueWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallUpdateWithWhereUniqueWithoutVehicleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VehicleEmergencyCallUpdateManyWithWhereWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallUpdateManyWithWhereWithoutVehicleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VehicleEmergencyCallScalarWhereInputSchema), z.lazy(() => VehicleEmergencyCallScalarWhereInputSchema).array() ]).optional(),
});

export const VehicleEmergencyCallUncheckedUpdateManyWithoutVehicleNestedInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUncheckedUpdateManyWithoutVehicleNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => VehicleEmergencyCallCreateWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallCreateWithoutVehicleInputSchema).array(), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutVehicleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutVehicleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VehicleEmergencyCallUpsertWithWhereUniqueWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallUpsertWithWhereUniqueWithoutVehicleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VehicleEmergencyCallCreateManyVehicleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VehicleEmergencyCallUpdateWithWhereUniqueWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallUpdateWithWhereUniqueWithoutVehicleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VehicleEmergencyCallUpdateManyWithWhereWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallUpdateManyWithWhereWithoutVehicleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VehicleEmergencyCallScalarWhereInputSchema), z.lazy(() => VehicleEmergencyCallScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutRegisteredCallsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRegisteredCallsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutRegisteredCallsInputSchema), z.lazy(() => UserUncheckedCreateWithoutRegisteredCallsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRegisteredCallsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const VehicleEmergencyCallCreateNestedManyWithoutEmergencyCallInputSchema: z.ZodType<Prisma.VehicleEmergencyCallCreateNestedManyWithoutEmergencyCallInput> = z.strictObject({
  create: z.union([ z.lazy(() => VehicleEmergencyCallCreateWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallCreateWithoutEmergencyCallInputSchema).array(), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutEmergencyCallInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutEmergencyCallInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VehicleEmergencyCallCreateManyEmergencyCallInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
});

export const NotificationCreateNestedManyWithoutEmergencyCallInputSchema: z.ZodType<Prisma.NotificationCreateNestedManyWithoutEmergencyCallInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificationCreateWithoutEmergencyCallInputSchema), z.lazy(() => NotificationCreateWithoutEmergencyCallInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutEmergencyCallInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutEmergencyCallInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutEmergencyCallInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutEmergencyCallInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyEmergencyCallInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
});

export const VehicleEmergencyCallUncheckedCreateNestedManyWithoutEmergencyCallInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUncheckedCreateNestedManyWithoutEmergencyCallInput> = z.strictObject({
  create: z.union([ z.lazy(() => VehicleEmergencyCallCreateWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallCreateWithoutEmergencyCallInputSchema).array(), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutEmergencyCallInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutEmergencyCallInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VehicleEmergencyCallCreateManyEmergencyCallInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
});

export const NotificationUncheckedCreateNestedManyWithoutEmergencyCallInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateNestedManyWithoutEmergencyCallInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificationCreateWithoutEmergencyCallInputSchema), z.lazy(() => NotificationCreateWithoutEmergencyCallInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutEmergencyCallInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutEmergencyCallInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutEmergencyCallInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutEmergencyCallInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyEmergencyCallInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
});

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const UserUpdateOneRequiredWithoutRegisteredCallsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRegisteredCallsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutRegisteredCallsInputSchema), z.lazy(() => UserUncheckedCreateWithoutRegisteredCallsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRegisteredCallsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRegisteredCallsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRegisteredCallsInputSchema), z.lazy(() => UserUpdateWithoutRegisteredCallsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutRegisteredCallsInputSchema) ]).optional(),
});

export const VehicleEmergencyCallUpdateManyWithoutEmergencyCallNestedInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUpdateManyWithoutEmergencyCallNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => VehicleEmergencyCallCreateWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallCreateWithoutEmergencyCallInputSchema).array(), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutEmergencyCallInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutEmergencyCallInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VehicleEmergencyCallUpsertWithWhereUniqueWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallUpsertWithWhereUniqueWithoutEmergencyCallInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VehicleEmergencyCallCreateManyEmergencyCallInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VehicleEmergencyCallUpdateWithWhereUniqueWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallUpdateWithWhereUniqueWithoutEmergencyCallInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VehicleEmergencyCallUpdateManyWithWhereWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallUpdateManyWithWhereWithoutEmergencyCallInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VehicleEmergencyCallScalarWhereInputSchema), z.lazy(() => VehicleEmergencyCallScalarWhereInputSchema).array() ]).optional(),
});

export const NotificationUpdateManyWithoutEmergencyCallNestedInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithoutEmergencyCallNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificationCreateWithoutEmergencyCallInputSchema), z.lazy(() => NotificationCreateWithoutEmergencyCallInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutEmergencyCallInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutEmergencyCallInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutEmergencyCallInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutEmergencyCallInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutEmergencyCallInputSchema), z.lazy(() => NotificationUpsertWithWhereUniqueWithoutEmergencyCallInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyEmergencyCallInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutEmergencyCallInputSchema), z.lazy(() => NotificationUpdateWithWhereUniqueWithoutEmergencyCallInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutEmergencyCallInputSchema), z.lazy(() => NotificationUpdateManyWithWhereWithoutEmergencyCallInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
});

export const VehicleEmergencyCallUncheckedUpdateManyWithoutEmergencyCallNestedInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUncheckedUpdateManyWithoutEmergencyCallNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => VehicleEmergencyCallCreateWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallCreateWithoutEmergencyCallInputSchema).array(), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutEmergencyCallInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallCreateOrConnectWithoutEmergencyCallInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VehicleEmergencyCallUpsertWithWhereUniqueWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallUpsertWithWhereUniqueWithoutEmergencyCallInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VehicleEmergencyCallCreateManyEmergencyCallInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema), z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VehicleEmergencyCallUpdateWithWhereUniqueWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallUpdateWithWhereUniqueWithoutEmergencyCallInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VehicleEmergencyCallUpdateManyWithWhereWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallUpdateManyWithWhereWithoutEmergencyCallInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VehicleEmergencyCallScalarWhereInputSchema), z.lazy(() => VehicleEmergencyCallScalarWhereInputSchema).array() ]).optional(),
});

export const NotificationUncheckedUpdateManyWithoutEmergencyCallNestedInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutEmergencyCallNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificationCreateWithoutEmergencyCallInputSchema), z.lazy(() => NotificationCreateWithoutEmergencyCallInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutEmergencyCallInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutEmergencyCallInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutEmergencyCallInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutEmergencyCallInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutEmergencyCallInputSchema), z.lazy(() => NotificationUpsertWithWhereUniqueWithoutEmergencyCallInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyEmergencyCallInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutEmergencyCallInputSchema), z.lazy(() => NotificationUpdateWithWhereUniqueWithoutEmergencyCallInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutEmergencyCallInputSchema), z.lazy(() => NotificationUpdateManyWithWhereWithoutEmergencyCallInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
});

export const VehicleCreateNestedOneWithoutEmergencyCallsInputSchema: z.ZodType<Prisma.VehicleCreateNestedOneWithoutEmergencyCallsInput> = z.strictObject({
  create: z.union([ z.lazy(() => VehicleCreateWithoutEmergencyCallsInputSchema), z.lazy(() => VehicleUncheckedCreateWithoutEmergencyCallsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VehicleCreateOrConnectWithoutEmergencyCallsInputSchema).optional(),
  connect: z.lazy(() => VehicleWhereUniqueInputSchema).optional(),
});

export const EmergencyCallCreateNestedOneWithoutVehiclesInputSchema: z.ZodType<Prisma.EmergencyCallCreateNestedOneWithoutVehiclesInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyCallCreateWithoutVehiclesInputSchema), z.lazy(() => EmergencyCallUncheckedCreateWithoutVehiclesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmergencyCallCreateOrConnectWithoutVehiclesInputSchema).optional(),
  connect: z.lazy(() => EmergencyCallWhereUniqueInputSchema).optional(),
});

export const EnumEmergencyCallStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEmergencyCallStatusFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => EmergencyCallStatusSchema).optional(),
});

export const VehicleUpdateOneRequiredWithoutEmergencyCallsNestedInputSchema: z.ZodType<Prisma.VehicleUpdateOneRequiredWithoutEmergencyCallsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => VehicleCreateWithoutEmergencyCallsInputSchema), z.lazy(() => VehicleUncheckedCreateWithoutEmergencyCallsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VehicleCreateOrConnectWithoutEmergencyCallsInputSchema).optional(),
  upsert: z.lazy(() => VehicleUpsertWithoutEmergencyCallsInputSchema).optional(),
  connect: z.lazy(() => VehicleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => VehicleUpdateToOneWithWhereWithoutEmergencyCallsInputSchema), z.lazy(() => VehicleUpdateWithoutEmergencyCallsInputSchema), z.lazy(() => VehicleUncheckedUpdateWithoutEmergencyCallsInputSchema) ]).optional(),
});

export const EmergencyCallUpdateOneRequiredWithoutVehiclesNestedInputSchema: z.ZodType<Prisma.EmergencyCallUpdateOneRequiredWithoutVehiclesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyCallCreateWithoutVehiclesInputSchema), z.lazy(() => EmergencyCallUncheckedCreateWithoutVehiclesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmergencyCallCreateOrConnectWithoutVehiclesInputSchema).optional(),
  upsert: z.lazy(() => EmergencyCallUpsertWithoutVehiclesInputSchema).optional(),
  connect: z.lazy(() => EmergencyCallWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmergencyCallUpdateToOneWithWhereWithoutVehiclesInputSchema), z.lazy(() => EmergencyCallUpdateWithoutVehiclesInputSchema), z.lazy(() => EmergencyCallUncheckedUpdateWithoutVehiclesInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutConversationsAsAttendantInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutConversationsAsAttendantInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsAsAttendantInputSchema), z.lazy(() => UserUncheckedCreateWithoutConversationsAsAttendantInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutConversationsAsAttendantInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserCreateNestedOneWithoutConversationsAsDriverInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutConversationsAsDriverInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsAsDriverInputSchema), z.lazy(() => UserUncheckedCreateWithoutConversationsAsDriverInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutConversationsAsDriverInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const MessageCreateNestedManyWithoutConversationInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutConversationInput> = z.strictObject({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema), z.lazy(() => MessageCreateWithoutConversationInputSchema).array(), z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema), z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema), z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
});

export const MessageUncheckedCreateNestedManyWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput> = z.strictObject({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema), z.lazy(() => MessageCreateWithoutConversationInputSchema).array(), z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema), z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema), z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
});

export const UserUpdateOneRequiredWithoutConversationsAsAttendantNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutConversationsAsAttendantNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsAsAttendantInputSchema), z.lazy(() => UserUncheckedCreateWithoutConversationsAsAttendantInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutConversationsAsAttendantInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutConversationsAsAttendantInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutConversationsAsAttendantInputSchema), z.lazy(() => UserUpdateWithoutConversationsAsAttendantInputSchema), z.lazy(() => UserUncheckedUpdateWithoutConversationsAsAttendantInputSchema) ]).optional(),
});

export const UserUpdateOneRequiredWithoutConversationsAsDriverNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutConversationsAsDriverNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsAsDriverInputSchema), z.lazy(() => UserUncheckedCreateWithoutConversationsAsDriverInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutConversationsAsDriverInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutConversationsAsDriverInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutConversationsAsDriverInputSchema), z.lazy(() => UserUpdateWithoutConversationsAsDriverInputSchema), z.lazy(() => UserUncheckedUpdateWithoutConversationsAsDriverInputSchema) ]).optional(),
});

export const MessageUpdateManyWithoutConversationNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutConversationNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema), z.lazy(() => MessageCreateWithoutConversationInputSchema).array(), z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema), z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema), z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema), z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema), z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema), z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema), z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
});

export const MessageUncheckedUpdateManyWithoutConversationNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema), z.lazy(() => MessageCreateWithoutConversationInputSchema).array(), z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema), z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema), z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema), z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema), z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema), z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema), z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema), z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSentMessagesInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSentMessagesInputSchema), z.lazy(() => UserUncheckedCreateWithoutSentMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSentMessagesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const ConversationCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateNestedOneWithoutMessagesInput> = z.strictObject({
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversationCreateOrConnectWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => ConversationWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneRequiredWithoutSentMessagesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSentMessagesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSentMessagesInputSchema), z.lazy(() => UserUncheckedCreateWithoutSentMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSentMessagesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSentMessagesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSentMessagesInputSchema), z.lazy(() => UserUpdateWithoutSentMessagesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSentMessagesInputSchema) ]).optional(),
});

export const ConversationUpdateOneRequiredWithoutMessagesNestedInputSchema: z.ZodType<Prisma.ConversationUpdateOneRequiredWithoutMessagesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversationCreateOrConnectWithoutMessagesInputSchema).optional(),
  upsert: z.lazy(() => ConversationUpsertWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => ConversationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateToOneWithWhereWithoutMessagesInputSchema), z.lazy(() => ConversationUpdateWithoutMessagesInputSchema), z.lazy(() => ConversationUncheckedUpdateWithoutMessagesInputSchema) ]).optional(),
});

export const EmergencyCallCreateNestedOneWithoutNotificationsInputSchema: z.ZodType<Prisma.EmergencyCallCreateNestedOneWithoutNotificationsInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyCallCreateWithoutNotificationsInputSchema), z.lazy(() => EmergencyCallUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmergencyCallCreateOrConnectWithoutNotificationsInputSchema).optional(),
  connect: z.lazy(() => EmergencyCallWhereUniqueInputSchema).optional(),
});

export const EmergencyCallUpdateOneRequiredWithoutNotificationsNestedInputSchema: z.ZodType<Prisma.EmergencyCallUpdateOneRequiredWithoutNotificationsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyCallCreateWithoutNotificationsInputSchema), z.lazy(() => EmergencyCallUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmergencyCallCreateOrConnectWithoutNotificationsInputSchema).optional(),
  upsert: z.lazy(() => EmergencyCallUpsertWithoutNotificationsInputSchema).optional(),
  connect: z.lazy(() => EmergencyCallWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmergencyCallUpdateToOneWithWhereWithoutNotificationsInputSchema), z.lazy(() => EmergencyCallUpdateWithoutNotificationsInputSchema), z.lazy(() => EmergencyCallUncheckedUpdateWithoutNotificationsInputSchema) ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedEnumUserRoleFilterSchema: z.ZodType<Prisma.NestedEnumUserRoleFilter> = z.strictObject({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => NestedEnumUserRoleFilterSchema) ]).optional(),
});

export const NestedEnumUserStatusFilterSchema: z.ZodType<Prisma.NestedEnumUserStatusFilter> = z.strictObject({
  equals: z.lazy(() => UserStatusSchema).optional(),
  in: z.lazy(() => UserStatusSchema).array().optional(),
  notIn: z.lazy(() => UserStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => NestedEnumUserStatusFilterSchema) ]).optional(),
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedEnumUserRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => NestedEnumUserRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
});

export const NestedEnumUserStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => UserStatusSchema).optional(),
  in: z.lazy(() => UserStatusSchema).array().optional(),
  notIn: z.lazy(() => UserStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => NestedEnumUserStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserStatusFilterSchema).optional(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
});

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
});

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const NestedEnumEmergencyCallStatusFilterSchema: z.ZodType<Prisma.NestedEnumEmergencyCallStatusFilter> = z.strictObject({
  equals: z.lazy(() => EmergencyCallStatusSchema).optional(),
  in: z.lazy(() => EmergencyCallStatusSchema).array().optional(),
  notIn: z.lazy(() => EmergencyCallStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EmergencyCallStatusSchema), z.lazy(() => NestedEnumEmergencyCallStatusFilterSchema) ]).optional(),
});

export const NestedEnumEmergencyCallStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEmergencyCallStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => EmergencyCallStatusSchema).optional(),
  in: z.lazy(() => EmergencyCallStatusSchema).array().optional(),
  notIn: z.lazy(() => EmergencyCallStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EmergencyCallStatusSchema), z.lazy(() => NestedEnumEmergencyCallStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEmergencyCallStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEmergencyCallStatusFilterSchema).optional(),
});

export const VehicleCreateWithoutDriverInputSchema: z.ZodType<Prisma.VehicleCreateWithoutDriverInput> = z.strictObject({
  id: z.uuid().optional(),
  plate: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  emergencyCalls: z.lazy(() => VehicleEmergencyCallCreateNestedManyWithoutVehicleInputSchema).optional(),
});

export const VehicleUncheckedCreateWithoutDriverInputSchema: z.ZodType<Prisma.VehicleUncheckedCreateWithoutDriverInput> = z.strictObject({
  id: z.uuid().optional(),
  plate: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  emergencyCalls: z.lazy(() => VehicleEmergencyCallUncheckedCreateNestedManyWithoutVehicleInputSchema).optional(),
});

export const VehicleCreateOrConnectWithoutDriverInputSchema: z.ZodType<Prisma.VehicleCreateOrConnectWithoutDriverInput> = z.strictObject({
  where: z.lazy(() => VehicleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VehicleCreateWithoutDriverInputSchema), z.lazy(() => VehicleUncheckedCreateWithoutDriverInputSchema) ]),
});

export const EmergencyCallCreateWithoutAttendantInputSchema: z.ZodType<Prisma.EmergencyCallCreateWithoutAttendantInput> = z.strictObject({
  id: z.uuid().optional(),
  protocol: z.string(),
  address: z.string(),
  returnLocation: z.string(),
  whatHappened: z.string(),
  patientCondition: z.string(),
  apparentAge: z.number().int().optional().nullable(),
  patientCount: z.number().int(),
  injuryCondition: z.string(),
  observations: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  vehicles: z.lazy(() => VehicleEmergencyCallCreateNestedManyWithoutEmergencyCallInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutEmergencyCallInputSchema).optional(),
});

export const EmergencyCallUncheckedCreateWithoutAttendantInputSchema: z.ZodType<Prisma.EmergencyCallUncheckedCreateWithoutAttendantInput> = z.strictObject({
  id: z.uuid().optional(),
  protocol: z.string(),
  address: z.string(),
  returnLocation: z.string(),
  whatHappened: z.string(),
  patientCondition: z.string(),
  apparentAge: z.number().int().optional().nullable(),
  patientCount: z.number().int(),
  injuryCondition: z.string(),
  observations: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  vehicles: z.lazy(() => VehicleEmergencyCallUncheckedCreateNestedManyWithoutEmergencyCallInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutEmergencyCallInputSchema).optional(),
});

export const EmergencyCallCreateOrConnectWithoutAttendantInputSchema: z.ZodType<Prisma.EmergencyCallCreateOrConnectWithoutAttendantInput> = z.strictObject({
  where: z.lazy(() => EmergencyCallWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmergencyCallCreateWithoutAttendantInputSchema), z.lazy(() => EmergencyCallUncheckedCreateWithoutAttendantInputSchema) ]),
});

export const EmergencyCallCreateManyAttendantInputEnvelopeSchema: z.ZodType<Prisma.EmergencyCallCreateManyAttendantInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => EmergencyCallCreateManyAttendantInputSchema), z.lazy(() => EmergencyCallCreateManyAttendantInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ConversationCreateWithoutAttendantInputSchema: z.ZodType<Prisma.ConversationCreateWithoutAttendantInput> = z.strictObject({
  id: z.uuid().optional(),
  driver: z.lazy(() => UserCreateNestedOneWithoutConversationsAsDriverInputSchema),
  messages: z.lazy(() => MessageCreateNestedManyWithoutConversationInputSchema).optional(),
});

export const ConversationUncheckedCreateWithoutAttendantInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateWithoutAttendantInput> = z.strictObject({
  id: z.uuid().optional(),
  driverId: z.string(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional(),
});

export const ConversationCreateOrConnectWithoutAttendantInputSchema: z.ZodType<Prisma.ConversationCreateOrConnectWithoutAttendantInput> = z.strictObject({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversationCreateWithoutAttendantInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutAttendantInputSchema) ]),
});

export const ConversationCreateManyAttendantInputEnvelopeSchema: z.ZodType<Prisma.ConversationCreateManyAttendantInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ConversationCreateManyAttendantInputSchema), z.lazy(() => ConversationCreateManyAttendantInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ConversationCreateWithoutDriverInputSchema: z.ZodType<Prisma.ConversationCreateWithoutDriverInput> = z.strictObject({
  id: z.uuid().optional(),
  attendant: z.lazy(() => UserCreateNestedOneWithoutConversationsAsAttendantInputSchema),
  messages: z.lazy(() => MessageCreateNestedManyWithoutConversationInputSchema).optional(),
});

export const ConversationUncheckedCreateWithoutDriverInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateWithoutDriverInput> = z.strictObject({
  id: z.uuid().optional(),
  attendantId: z.string(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional(),
});

export const ConversationCreateOrConnectWithoutDriverInputSchema: z.ZodType<Prisma.ConversationCreateOrConnectWithoutDriverInput> = z.strictObject({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversationCreateWithoutDriverInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutDriverInputSchema) ]),
});

export const ConversationCreateManyDriverInputEnvelopeSchema: z.ZodType<Prisma.ConversationCreateManyDriverInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ConversationCreateManyDriverInputSchema), z.lazy(() => ConversationCreateManyDriverInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const MessageCreateWithoutSenderInputSchema: z.ZodType<Prisma.MessageCreateWithoutSenderInput> = z.strictObject({
  id: z.uuid().optional(),
  text: z.string(),
  sentAt: z.coerce.date().optional(),
  conversation: z.lazy(() => ConversationCreateNestedOneWithoutMessagesInputSchema),
});

export const MessageUncheckedCreateWithoutSenderInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutSenderInput> = z.strictObject({
  id: z.uuid().optional(),
  text: z.string(),
  sentAt: z.coerce.date().optional(),
  conversationId: z.string(),
});

export const MessageCreateOrConnectWithoutSenderInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutSenderInput> = z.strictObject({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema), z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema) ]),
});

export const MessageCreateManySenderInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManySenderInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => MessageCreateManySenderInputSchema), z.lazy(() => MessageCreateManySenderInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const VehicleUpsertWithoutDriverInputSchema: z.ZodType<Prisma.VehicleUpsertWithoutDriverInput> = z.strictObject({
  update: z.union([ z.lazy(() => VehicleUpdateWithoutDriverInputSchema), z.lazy(() => VehicleUncheckedUpdateWithoutDriverInputSchema) ]),
  create: z.union([ z.lazy(() => VehicleCreateWithoutDriverInputSchema), z.lazy(() => VehicleUncheckedCreateWithoutDriverInputSchema) ]),
  where: z.lazy(() => VehicleWhereInputSchema).optional(),
});

export const VehicleUpdateToOneWithWhereWithoutDriverInputSchema: z.ZodType<Prisma.VehicleUpdateToOneWithWhereWithoutDriverInput> = z.strictObject({
  where: z.lazy(() => VehicleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => VehicleUpdateWithoutDriverInputSchema), z.lazy(() => VehicleUncheckedUpdateWithoutDriverInputSchema) ]),
});

export const VehicleUpdateWithoutDriverInputSchema: z.ZodType<Prisma.VehicleUpdateWithoutDriverInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyCalls: z.lazy(() => VehicleEmergencyCallUpdateManyWithoutVehicleNestedInputSchema).optional(),
});

export const VehicleUncheckedUpdateWithoutDriverInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateWithoutDriverInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyCalls: z.lazy(() => VehicleEmergencyCallUncheckedUpdateManyWithoutVehicleNestedInputSchema).optional(),
});

export const EmergencyCallUpsertWithWhereUniqueWithoutAttendantInputSchema: z.ZodType<Prisma.EmergencyCallUpsertWithWhereUniqueWithoutAttendantInput> = z.strictObject({
  where: z.lazy(() => EmergencyCallWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmergencyCallUpdateWithoutAttendantInputSchema), z.lazy(() => EmergencyCallUncheckedUpdateWithoutAttendantInputSchema) ]),
  create: z.union([ z.lazy(() => EmergencyCallCreateWithoutAttendantInputSchema), z.lazy(() => EmergencyCallUncheckedCreateWithoutAttendantInputSchema) ]),
});

export const EmergencyCallUpdateWithWhereUniqueWithoutAttendantInputSchema: z.ZodType<Prisma.EmergencyCallUpdateWithWhereUniqueWithoutAttendantInput> = z.strictObject({
  where: z.lazy(() => EmergencyCallWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmergencyCallUpdateWithoutAttendantInputSchema), z.lazy(() => EmergencyCallUncheckedUpdateWithoutAttendantInputSchema) ]),
});

export const EmergencyCallUpdateManyWithWhereWithoutAttendantInputSchema: z.ZodType<Prisma.EmergencyCallUpdateManyWithWhereWithoutAttendantInput> = z.strictObject({
  where: z.lazy(() => EmergencyCallScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmergencyCallUpdateManyMutationInputSchema), z.lazy(() => EmergencyCallUncheckedUpdateManyWithoutAttendantInputSchema) ]),
});

export const EmergencyCallScalarWhereInputSchema: z.ZodType<Prisma.EmergencyCallScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => EmergencyCallScalarWhereInputSchema), z.lazy(() => EmergencyCallScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmergencyCallScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmergencyCallScalarWhereInputSchema), z.lazy(() => EmergencyCallScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  protocol: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  returnLocation: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  whatHappened: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  patientCondition: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  apparentAge: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  patientCount: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  injuryCondition: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  observations: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  attendantId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const ConversationUpsertWithWhereUniqueWithoutAttendantInputSchema: z.ZodType<Prisma.ConversationUpsertWithWhereUniqueWithoutAttendantInput> = z.strictObject({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ConversationUpdateWithoutAttendantInputSchema), z.lazy(() => ConversationUncheckedUpdateWithoutAttendantInputSchema) ]),
  create: z.union([ z.lazy(() => ConversationCreateWithoutAttendantInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutAttendantInputSchema) ]),
});

export const ConversationUpdateWithWhereUniqueWithoutAttendantInputSchema: z.ZodType<Prisma.ConversationUpdateWithWhereUniqueWithoutAttendantInput> = z.strictObject({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateWithoutAttendantInputSchema), z.lazy(() => ConversationUncheckedUpdateWithoutAttendantInputSchema) ]),
});

export const ConversationUpdateManyWithWhereWithoutAttendantInputSchema: z.ZodType<Prisma.ConversationUpdateManyWithWhereWithoutAttendantInput> = z.strictObject({
  where: z.lazy(() => ConversationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateManyMutationInputSchema), z.lazy(() => ConversationUncheckedUpdateManyWithoutAttendantInputSchema) ]),
});

export const ConversationScalarWhereInputSchema: z.ZodType<Prisma.ConversationScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ConversationScalarWhereInputSchema), z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationScalarWhereInputSchema), z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  attendantId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  driverId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const ConversationUpsertWithWhereUniqueWithoutDriverInputSchema: z.ZodType<Prisma.ConversationUpsertWithWhereUniqueWithoutDriverInput> = z.strictObject({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ConversationUpdateWithoutDriverInputSchema), z.lazy(() => ConversationUncheckedUpdateWithoutDriverInputSchema) ]),
  create: z.union([ z.lazy(() => ConversationCreateWithoutDriverInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutDriverInputSchema) ]),
});

export const ConversationUpdateWithWhereUniqueWithoutDriverInputSchema: z.ZodType<Prisma.ConversationUpdateWithWhereUniqueWithoutDriverInput> = z.strictObject({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateWithoutDriverInputSchema), z.lazy(() => ConversationUncheckedUpdateWithoutDriverInputSchema) ]),
});

export const ConversationUpdateManyWithWhereWithoutDriverInputSchema: z.ZodType<Prisma.ConversationUpdateManyWithWhereWithoutDriverInput> = z.strictObject({
  where: z.lazy(() => ConversationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateManyMutationInputSchema), z.lazy(() => ConversationUncheckedUpdateManyWithoutDriverInputSchema) ]),
});

export const MessageUpsertWithWhereUniqueWithoutSenderInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutSenderInput> = z.strictObject({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutSenderInputSchema), z.lazy(() => MessageUncheckedUpdateWithoutSenderInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema), z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema) ]),
});

export const MessageUpdateWithWhereUniqueWithoutSenderInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutSenderInput> = z.strictObject({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutSenderInputSchema), z.lazy(() => MessageUncheckedUpdateWithoutSenderInputSchema) ]),
});

export const MessageUpdateManyWithWhereWithoutSenderInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutSenderInput> = z.strictObject({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema), z.lazy(() => MessageUncheckedUpdateManyWithoutSenderInputSchema) ]),
});

export const MessageScalarWhereInputSchema: z.ZodType<Prisma.MessageScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => MessageScalarWhereInputSchema), z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereInputSchema), z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sentAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const UserCreateWithoutVehicleInputSchema: z.ZodType<Prisma.UserCreateWithoutVehicleInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleSchema),
  phone: z.string(),
  status: z.lazy(() => UserStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  registeredCalls: z.lazy(() => EmergencyCallCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationCreateNestedManyWithoutDriverInputSchema).optional(),
  sentMessages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
});

export const UserUncheckedCreateWithoutVehicleInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutVehicleInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleSchema),
  phone: z.string(),
  status: z.lazy(() => UserStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  registeredCalls: z.lazy(() => EmergencyCallUncheckedCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutDriverInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
});

export const UserCreateOrConnectWithoutVehicleInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutVehicleInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutVehicleInputSchema), z.lazy(() => UserUncheckedCreateWithoutVehicleInputSchema) ]),
});

export const VehicleEmergencyCallCreateWithoutVehicleInputSchema: z.ZodType<Prisma.VehicleEmergencyCallCreateWithoutVehicleInput> = z.strictObject({
  id: z.uuid().optional(),
  status: z.lazy(() => EmergencyCallStatusSchema).optional(),
  emergencyCall: z.lazy(() => EmergencyCallCreateNestedOneWithoutVehiclesInputSchema),
});

export const VehicleEmergencyCallUncheckedCreateWithoutVehicleInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUncheckedCreateWithoutVehicleInput> = z.strictObject({
  id: z.uuid().optional(),
  status: z.lazy(() => EmergencyCallStatusSchema).optional(),
  emergencyCallId: z.string(),
});

export const VehicleEmergencyCallCreateOrConnectWithoutVehicleInputSchema: z.ZodType<Prisma.VehicleEmergencyCallCreateOrConnectWithoutVehicleInput> = z.strictObject({
  where: z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VehicleEmergencyCallCreateWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutVehicleInputSchema) ]),
});

export const VehicleEmergencyCallCreateManyVehicleInputEnvelopeSchema: z.ZodType<Prisma.VehicleEmergencyCallCreateManyVehicleInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => VehicleEmergencyCallCreateManyVehicleInputSchema), z.lazy(() => VehicleEmergencyCallCreateManyVehicleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const UserUpsertWithoutVehicleInputSchema: z.ZodType<Prisma.UserUpsertWithoutVehicleInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutVehicleInputSchema), z.lazy(() => UserUncheckedUpdateWithoutVehicleInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutVehicleInputSchema), z.lazy(() => UserUncheckedCreateWithoutVehicleInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutVehicleInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutVehicleInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutVehicleInputSchema), z.lazy(() => UserUncheckedUpdateWithoutVehicleInputSchema) ]),
});

export const UserUpdateWithoutVehicleInputSchema: z.ZodType<Prisma.UserUpdateWithoutVehicleInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  registeredCalls: z.lazy(() => EmergencyCallUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationUpdateManyWithoutDriverNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutVehicleInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutVehicleInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  registeredCalls: z.lazy(() => EmergencyCallUncheckedUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationUncheckedUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationUncheckedUpdateManyWithoutDriverNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
});

export const VehicleEmergencyCallUpsertWithWhereUniqueWithoutVehicleInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUpsertWithWhereUniqueWithoutVehicleInput> = z.strictObject({
  where: z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VehicleEmergencyCallUpdateWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedUpdateWithoutVehicleInputSchema) ]),
  create: z.union([ z.lazy(() => VehicleEmergencyCallCreateWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutVehicleInputSchema) ]),
});

export const VehicleEmergencyCallUpdateWithWhereUniqueWithoutVehicleInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUpdateWithWhereUniqueWithoutVehicleInput> = z.strictObject({
  where: z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VehicleEmergencyCallUpdateWithoutVehicleInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedUpdateWithoutVehicleInputSchema) ]),
});

export const VehicleEmergencyCallUpdateManyWithWhereWithoutVehicleInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUpdateManyWithWhereWithoutVehicleInput> = z.strictObject({
  where: z.lazy(() => VehicleEmergencyCallScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VehicleEmergencyCallUpdateManyMutationInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedUpdateManyWithoutVehicleInputSchema) ]),
});

export const VehicleEmergencyCallScalarWhereInputSchema: z.ZodType<Prisma.VehicleEmergencyCallScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => VehicleEmergencyCallScalarWhereInputSchema), z.lazy(() => VehicleEmergencyCallScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VehicleEmergencyCallScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VehicleEmergencyCallScalarWhereInputSchema), z.lazy(() => VehicleEmergencyCallScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumEmergencyCallStatusFilterSchema), z.lazy(() => EmergencyCallStatusSchema) ]).optional(),
  vehicleId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  emergencyCallId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const UserCreateWithoutRegisteredCallsInputSchema: z.ZodType<Prisma.UserCreateWithoutRegisteredCallsInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleSchema),
  phone: z.string(),
  status: z.lazy(() => UserStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutDriverInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationCreateNestedManyWithoutDriverInputSchema).optional(),
  sentMessages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
});

export const UserUncheckedCreateWithoutRegisteredCallsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRegisteredCallsInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleSchema),
  phone: z.string(),
  status: z.lazy(() => UserStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  vehicle: z.lazy(() => VehicleUncheckedCreateNestedOneWithoutDriverInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutDriverInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
});

export const UserCreateOrConnectWithoutRegisteredCallsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRegisteredCallsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRegisteredCallsInputSchema), z.lazy(() => UserUncheckedCreateWithoutRegisteredCallsInputSchema) ]),
});

export const VehicleEmergencyCallCreateWithoutEmergencyCallInputSchema: z.ZodType<Prisma.VehicleEmergencyCallCreateWithoutEmergencyCallInput> = z.strictObject({
  id: z.uuid().optional(),
  status: z.lazy(() => EmergencyCallStatusSchema).optional(),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutEmergencyCallsInputSchema),
});

export const VehicleEmergencyCallUncheckedCreateWithoutEmergencyCallInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUncheckedCreateWithoutEmergencyCallInput> = z.strictObject({
  id: z.uuid().optional(),
  status: z.lazy(() => EmergencyCallStatusSchema).optional(),
  vehicleId: z.string(),
});

export const VehicleEmergencyCallCreateOrConnectWithoutEmergencyCallInputSchema: z.ZodType<Prisma.VehicleEmergencyCallCreateOrConnectWithoutEmergencyCallInput> = z.strictObject({
  where: z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VehicleEmergencyCallCreateWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutEmergencyCallInputSchema) ]),
});

export const VehicleEmergencyCallCreateManyEmergencyCallInputEnvelopeSchema: z.ZodType<Prisma.VehicleEmergencyCallCreateManyEmergencyCallInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => VehicleEmergencyCallCreateManyEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallCreateManyEmergencyCallInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const NotificationCreateWithoutEmergencyCallInputSchema: z.ZodType<Prisma.NotificationCreateWithoutEmergencyCallInput> = z.strictObject({
  id: z.uuid().optional(),
  message: z.string(),
  notifiedAt: z.coerce.date().optional(),
});

export const NotificationUncheckedCreateWithoutEmergencyCallInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateWithoutEmergencyCallInput> = z.strictObject({
  id: z.uuid().optional(),
  message: z.string(),
  notifiedAt: z.coerce.date().optional(),
});

export const NotificationCreateOrConnectWithoutEmergencyCallInputSchema: z.ZodType<Prisma.NotificationCreateOrConnectWithoutEmergencyCallInput> = z.strictObject({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NotificationCreateWithoutEmergencyCallInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutEmergencyCallInputSchema) ]),
});

export const NotificationCreateManyEmergencyCallInputEnvelopeSchema: z.ZodType<Prisma.NotificationCreateManyEmergencyCallInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => NotificationCreateManyEmergencyCallInputSchema), z.lazy(() => NotificationCreateManyEmergencyCallInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const UserUpsertWithoutRegisteredCallsInputSchema: z.ZodType<Prisma.UserUpsertWithoutRegisteredCallsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutRegisteredCallsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutRegisteredCallsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRegisteredCallsInputSchema), z.lazy(() => UserUncheckedCreateWithoutRegisteredCallsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutRegisteredCallsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRegisteredCallsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRegisteredCallsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutRegisteredCallsInputSchema) ]),
});

export const UserUpdateWithoutRegisteredCallsInputSchema: z.ZodType<Prisma.UserUpdateWithoutRegisteredCallsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneWithoutDriverNestedInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationUpdateManyWithoutDriverNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutRegisteredCallsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRegisteredCallsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle: z.lazy(() => VehicleUncheckedUpdateOneWithoutDriverNestedInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationUncheckedUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationUncheckedUpdateManyWithoutDriverNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
});

export const VehicleEmergencyCallUpsertWithWhereUniqueWithoutEmergencyCallInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUpsertWithWhereUniqueWithoutEmergencyCallInput> = z.strictObject({
  where: z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VehicleEmergencyCallUpdateWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedUpdateWithoutEmergencyCallInputSchema) ]),
  create: z.union([ z.lazy(() => VehicleEmergencyCallCreateWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedCreateWithoutEmergencyCallInputSchema) ]),
});

export const VehicleEmergencyCallUpdateWithWhereUniqueWithoutEmergencyCallInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUpdateWithWhereUniqueWithoutEmergencyCallInput> = z.strictObject({
  where: z.lazy(() => VehicleEmergencyCallWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VehicleEmergencyCallUpdateWithoutEmergencyCallInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedUpdateWithoutEmergencyCallInputSchema) ]),
});

export const VehicleEmergencyCallUpdateManyWithWhereWithoutEmergencyCallInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUpdateManyWithWhereWithoutEmergencyCallInput> = z.strictObject({
  where: z.lazy(() => VehicleEmergencyCallScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VehicleEmergencyCallUpdateManyMutationInputSchema), z.lazy(() => VehicleEmergencyCallUncheckedUpdateManyWithoutEmergencyCallInputSchema) ]),
});

export const NotificationUpsertWithWhereUniqueWithoutEmergencyCallInputSchema: z.ZodType<Prisma.NotificationUpsertWithWhereUniqueWithoutEmergencyCallInput> = z.strictObject({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NotificationUpdateWithoutEmergencyCallInputSchema), z.lazy(() => NotificationUncheckedUpdateWithoutEmergencyCallInputSchema) ]),
  create: z.union([ z.lazy(() => NotificationCreateWithoutEmergencyCallInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutEmergencyCallInputSchema) ]),
});

export const NotificationUpdateWithWhereUniqueWithoutEmergencyCallInputSchema: z.ZodType<Prisma.NotificationUpdateWithWhereUniqueWithoutEmergencyCallInput> = z.strictObject({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateWithoutEmergencyCallInputSchema), z.lazy(() => NotificationUncheckedUpdateWithoutEmergencyCallInputSchema) ]),
});

export const NotificationUpdateManyWithWhereWithoutEmergencyCallInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithWhereWithoutEmergencyCallInput> = z.strictObject({
  where: z.lazy(() => NotificationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateManyMutationInputSchema), z.lazy(() => NotificationUncheckedUpdateManyWithoutEmergencyCallInputSchema) ]),
});

export const NotificationScalarWhereInputSchema: z.ZodType<Prisma.NotificationScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  notifiedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  emergencyCallId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const VehicleCreateWithoutEmergencyCallsInputSchema: z.ZodType<Prisma.VehicleCreateWithoutEmergencyCallsInput> = z.strictObject({
  id: z.uuid().optional(),
  plate: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  driver: z.lazy(() => UserCreateNestedOneWithoutVehicleInputSchema),
});

export const VehicleUncheckedCreateWithoutEmergencyCallsInputSchema: z.ZodType<Prisma.VehicleUncheckedCreateWithoutEmergencyCallsInput> = z.strictObject({
  id: z.uuid().optional(),
  plate: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  driverId: z.string(),
});

export const VehicleCreateOrConnectWithoutEmergencyCallsInputSchema: z.ZodType<Prisma.VehicleCreateOrConnectWithoutEmergencyCallsInput> = z.strictObject({
  where: z.lazy(() => VehicleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VehicleCreateWithoutEmergencyCallsInputSchema), z.lazy(() => VehicleUncheckedCreateWithoutEmergencyCallsInputSchema) ]),
});

export const EmergencyCallCreateWithoutVehiclesInputSchema: z.ZodType<Prisma.EmergencyCallCreateWithoutVehiclesInput> = z.strictObject({
  id: z.uuid().optional(),
  protocol: z.string(),
  address: z.string(),
  returnLocation: z.string(),
  whatHappened: z.string(),
  patientCondition: z.string(),
  apparentAge: z.number().int().optional().nullable(),
  patientCount: z.number().int(),
  injuryCondition: z.string(),
  observations: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  attendant: z.lazy(() => UserCreateNestedOneWithoutRegisteredCallsInputSchema),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutEmergencyCallInputSchema).optional(),
});

export const EmergencyCallUncheckedCreateWithoutVehiclesInputSchema: z.ZodType<Prisma.EmergencyCallUncheckedCreateWithoutVehiclesInput> = z.strictObject({
  id: z.uuid().optional(),
  protocol: z.string(),
  address: z.string(),
  returnLocation: z.string(),
  whatHappened: z.string(),
  patientCondition: z.string(),
  apparentAge: z.number().int().optional().nullable(),
  patientCount: z.number().int(),
  injuryCondition: z.string(),
  observations: z.string().optional().nullable(),
  attendantId: z.string(),
  createdAt: z.coerce.date().optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutEmergencyCallInputSchema).optional(),
});

export const EmergencyCallCreateOrConnectWithoutVehiclesInputSchema: z.ZodType<Prisma.EmergencyCallCreateOrConnectWithoutVehiclesInput> = z.strictObject({
  where: z.lazy(() => EmergencyCallWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmergencyCallCreateWithoutVehiclesInputSchema), z.lazy(() => EmergencyCallUncheckedCreateWithoutVehiclesInputSchema) ]),
});

export const VehicleUpsertWithoutEmergencyCallsInputSchema: z.ZodType<Prisma.VehicleUpsertWithoutEmergencyCallsInput> = z.strictObject({
  update: z.union([ z.lazy(() => VehicleUpdateWithoutEmergencyCallsInputSchema), z.lazy(() => VehicleUncheckedUpdateWithoutEmergencyCallsInputSchema) ]),
  create: z.union([ z.lazy(() => VehicleCreateWithoutEmergencyCallsInputSchema), z.lazy(() => VehicleUncheckedCreateWithoutEmergencyCallsInputSchema) ]),
  where: z.lazy(() => VehicleWhereInputSchema).optional(),
});

export const VehicleUpdateToOneWithWhereWithoutEmergencyCallsInputSchema: z.ZodType<Prisma.VehicleUpdateToOneWithWhereWithoutEmergencyCallsInput> = z.strictObject({
  where: z.lazy(() => VehicleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => VehicleUpdateWithoutEmergencyCallsInputSchema), z.lazy(() => VehicleUncheckedUpdateWithoutEmergencyCallsInputSchema) ]),
});

export const VehicleUpdateWithoutEmergencyCallsInputSchema: z.ZodType<Prisma.VehicleUpdateWithoutEmergencyCallsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  driver: z.lazy(() => UserUpdateOneRequiredWithoutVehicleNestedInputSchema).optional(),
});

export const VehicleUncheckedUpdateWithoutEmergencyCallsInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateWithoutEmergencyCallsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EmergencyCallUpsertWithoutVehiclesInputSchema: z.ZodType<Prisma.EmergencyCallUpsertWithoutVehiclesInput> = z.strictObject({
  update: z.union([ z.lazy(() => EmergencyCallUpdateWithoutVehiclesInputSchema), z.lazy(() => EmergencyCallUncheckedUpdateWithoutVehiclesInputSchema) ]),
  create: z.union([ z.lazy(() => EmergencyCallCreateWithoutVehiclesInputSchema), z.lazy(() => EmergencyCallUncheckedCreateWithoutVehiclesInputSchema) ]),
  where: z.lazy(() => EmergencyCallWhereInputSchema).optional(),
});

export const EmergencyCallUpdateToOneWithWhereWithoutVehiclesInputSchema: z.ZodType<Prisma.EmergencyCallUpdateToOneWithWhereWithoutVehiclesInput> = z.strictObject({
  where: z.lazy(() => EmergencyCallWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EmergencyCallUpdateWithoutVehiclesInputSchema), z.lazy(() => EmergencyCallUncheckedUpdateWithoutVehiclesInputSchema) ]),
});

export const EmergencyCallUpdateWithoutVehiclesInputSchema: z.ZodType<Prisma.EmergencyCallUpdateWithoutVehiclesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  protocol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  returnLocation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  whatHappened: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apparentAge: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patientCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  injuryCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  attendant: z.lazy(() => UserUpdateOneRequiredWithoutRegisteredCallsNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutEmergencyCallNestedInputSchema).optional(),
});

export const EmergencyCallUncheckedUpdateWithoutVehiclesInputSchema: z.ZodType<Prisma.EmergencyCallUncheckedUpdateWithoutVehiclesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  protocol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  returnLocation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  whatHappened: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apparentAge: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patientCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  injuryCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  attendantId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutEmergencyCallNestedInputSchema).optional(),
});

export const UserCreateWithoutConversationsAsAttendantInputSchema: z.ZodType<Prisma.UserCreateWithoutConversationsAsAttendantInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleSchema),
  phone: z.string(),
  status: z.lazy(() => UserStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutDriverInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationCreateNestedManyWithoutDriverInputSchema).optional(),
  sentMessages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
});

export const UserUncheckedCreateWithoutConversationsAsAttendantInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutConversationsAsAttendantInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleSchema),
  phone: z.string(),
  status: z.lazy(() => UserStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  vehicle: z.lazy(() => VehicleUncheckedCreateNestedOneWithoutDriverInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallUncheckedCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutDriverInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
});

export const UserCreateOrConnectWithoutConversationsAsAttendantInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutConversationsAsAttendantInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsAsAttendantInputSchema), z.lazy(() => UserUncheckedCreateWithoutConversationsAsAttendantInputSchema) ]),
});

export const UserCreateWithoutConversationsAsDriverInputSchema: z.ZodType<Prisma.UserCreateWithoutConversationsAsDriverInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleSchema),
  phone: z.string(),
  status: z.lazy(() => UserStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutDriverInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationCreateNestedManyWithoutAttendantInputSchema).optional(),
  sentMessages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
});

export const UserUncheckedCreateWithoutConversationsAsDriverInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutConversationsAsDriverInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleSchema),
  phone: z.string(),
  status: z.lazy(() => UserStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  vehicle: z.lazy(() => VehicleUncheckedCreateNestedOneWithoutDriverInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallUncheckedCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutAttendantInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
});

export const UserCreateOrConnectWithoutConversationsAsDriverInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutConversationsAsDriverInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsAsDriverInputSchema), z.lazy(() => UserUncheckedCreateWithoutConversationsAsDriverInputSchema) ]),
});

export const MessageCreateWithoutConversationInputSchema: z.ZodType<Prisma.MessageCreateWithoutConversationInput> = z.strictObject({
  id: z.uuid().optional(),
  text: z.string(),
  sentAt: z.coerce.date().optional(),
  sender: z.lazy(() => UserCreateNestedOneWithoutSentMessagesInputSchema),
});

export const MessageUncheckedCreateWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutConversationInput> = z.strictObject({
  id: z.uuid().optional(),
  text: z.string(),
  sentAt: z.coerce.date().optional(),
  senderId: z.string(),
});

export const MessageCreateOrConnectWithoutConversationInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutConversationInput> = z.strictObject({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema), z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema) ]),
});

export const MessageCreateManyConversationInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyConversationInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => MessageCreateManyConversationInputSchema), z.lazy(() => MessageCreateManyConversationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const UserUpsertWithoutConversationsAsAttendantInputSchema: z.ZodType<Prisma.UserUpsertWithoutConversationsAsAttendantInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutConversationsAsAttendantInputSchema), z.lazy(() => UserUncheckedUpdateWithoutConversationsAsAttendantInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsAsAttendantInputSchema), z.lazy(() => UserUncheckedCreateWithoutConversationsAsAttendantInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutConversationsAsAttendantInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutConversationsAsAttendantInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutConversationsAsAttendantInputSchema), z.lazy(() => UserUncheckedUpdateWithoutConversationsAsAttendantInputSchema) ]),
});

export const UserUpdateWithoutConversationsAsAttendantInputSchema: z.ZodType<Prisma.UserUpdateWithoutConversationsAsAttendantInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneWithoutDriverNestedInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationUpdateManyWithoutDriverNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutConversationsAsAttendantInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutConversationsAsAttendantInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle: z.lazy(() => VehicleUncheckedUpdateOneWithoutDriverNestedInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallUncheckedUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationUncheckedUpdateManyWithoutDriverNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
});

export const UserUpsertWithoutConversationsAsDriverInputSchema: z.ZodType<Prisma.UserUpsertWithoutConversationsAsDriverInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutConversationsAsDriverInputSchema), z.lazy(() => UserUncheckedUpdateWithoutConversationsAsDriverInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsAsDriverInputSchema), z.lazy(() => UserUncheckedCreateWithoutConversationsAsDriverInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutConversationsAsDriverInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutConversationsAsDriverInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutConversationsAsDriverInputSchema), z.lazy(() => UserUncheckedUpdateWithoutConversationsAsDriverInputSchema) ]),
});

export const UserUpdateWithoutConversationsAsDriverInputSchema: z.ZodType<Prisma.UserUpdateWithoutConversationsAsDriverInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneWithoutDriverNestedInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationUpdateManyWithoutAttendantNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutConversationsAsDriverInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutConversationsAsDriverInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle: z.lazy(() => VehicleUncheckedUpdateOneWithoutDriverNestedInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallUncheckedUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationUncheckedUpdateManyWithoutAttendantNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
});

export const MessageUpsertWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutConversationInput> = z.strictObject({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutConversationInputSchema), z.lazy(() => MessageUncheckedUpdateWithoutConversationInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema), z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema) ]),
});

export const MessageUpdateWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutConversationInput> = z.strictObject({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutConversationInputSchema), z.lazy(() => MessageUncheckedUpdateWithoutConversationInputSchema) ]),
});

export const MessageUpdateManyWithWhereWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutConversationInput> = z.strictObject({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema), z.lazy(() => MessageUncheckedUpdateManyWithoutConversationInputSchema) ]),
});

export const UserCreateWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserCreateWithoutSentMessagesInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleSchema),
  phone: z.string(),
  status: z.lazy(() => UserStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutDriverInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationCreateNestedManyWithoutDriverInputSchema).optional(),
});

export const UserUncheckedCreateWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSentMessagesInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleSchema),
  phone: z.string(),
  status: z.lazy(() => UserStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  vehicle: z.lazy(() => VehicleUncheckedCreateNestedOneWithoutDriverInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallUncheckedCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutAttendantInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutDriverInputSchema).optional(),
});

export const UserCreateOrConnectWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSentMessagesInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSentMessagesInputSchema), z.lazy(() => UserUncheckedCreateWithoutSentMessagesInputSchema) ]),
});

export const ConversationCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateWithoutMessagesInput> = z.strictObject({
  id: z.uuid().optional(),
  attendant: z.lazy(() => UserCreateNestedOneWithoutConversationsAsAttendantInputSchema),
  driver: z.lazy(() => UserCreateNestedOneWithoutConversationsAsDriverInputSchema),
});

export const ConversationUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateWithoutMessagesInput> = z.strictObject({
  id: z.uuid().optional(),
  attendantId: z.string(),
  driverId: z.string(),
});

export const ConversationCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateOrConnectWithoutMessagesInput> = z.strictObject({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]),
});

export const UserUpsertWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserUpsertWithoutSentMessagesInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutSentMessagesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSentMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSentMessagesInputSchema), z.lazy(() => UserUncheckedCreateWithoutSentMessagesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSentMessagesInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSentMessagesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSentMessagesInputSchema) ]),
});

export const UserUpdateWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserUpdateWithoutSentMessagesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneWithoutDriverNestedInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationUpdateManyWithoutDriverNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSentMessagesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle: z.lazy(() => VehicleUncheckedUpdateOneWithoutDriverNestedInputSchema).optional(),
  registeredCalls: z.lazy(() => EmergencyCallUncheckedUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsAttendant: z.lazy(() => ConversationUncheckedUpdateManyWithoutAttendantNestedInputSchema).optional(),
  conversationsAsDriver: z.lazy(() => ConversationUncheckedUpdateManyWithoutDriverNestedInputSchema).optional(),
});

export const ConversationUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUpsertWithoutMessagesInput> = z.strictObject({
  update: z.union([ z.lazy(() => ConversationUpdateWithoutMessagesInputSchema), z.lazy(() => ConversationUncheckedUpdateWithoutMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema), z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]),
  where: z.lazy(() => ConversationWhereInputSchema).optional(),
});

export const ConversationUpdateToOneWithWhereWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUpdateToOneWithWhereWithoutMessagesInput> = z.strictObject({
  where: z.lazy(() => ConversationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ConversationUpdateWithoutMessagesInputSchema), z.lazy(() => ConversationUncheckedUpdateWithoutMessagesInputSchema) ]),
});

export const ConversationUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUpdateWithoutMessagesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  attendant: z.lazy(() => UserUpdateOneRequiredWithoutConversationsAsAttendantNestedInputSchema).optional(),
  driver: z.lazy(() => UserUpdateOneRequiredWithoutConversationsAsDriverNestedInputSchema).optional(),
});

export const ConversationUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateWithoutMessagesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  attendantId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EmergencyCallCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.EmergencyCallCreateWithoutNotificationsInput> = z.strictObject({
  id: z.uuid().optional(),
  protocol: z.string(),
  address: z.string(),
  returnLocation: z.string(),
  whatHappened: z.string(),
  patientCondition: z.string(),
  apparentAge: z.number().int().optional().nullable(),
  patientCount: z.number().int(),
  injuryCondition: z.string(),
  observations: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  attendant: z.lazy(() => UserCreateNestedOneWithoutRegisteredCallsInputSchema),
  vehicles: z.lazy(() => VehicleEmergencyCallCreateNestedManyWithoutEmergencyCallInputSchema).optional(),
});

export const EmergencyCallUncheckedCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.EmergencyCallUncheckedCreateWithoutNotificationsInput> = z.strictObject({
  id: z.uuid().optional(),
  protocol: z.string(),
  address: z.string(),
  returnLocation: z.string(),
  whatHappened: z.string(),
  patientCondition: z.string(),
  apparentAge: z.number().int().optional().nullable(),
  patientCount: z.number().int(),
  injuryCondition: z.string(),
  observations: z.string().optional().nullable(),
  attendantId: z.string(),
  createdAt: z.coerce.date().optional(),
  vehicles: z.lazy(() => VehicleEmergencyCallUncheckedCreateNestedManyWithoutEmergencyCallInputSchema).optional(),
});

export const EmergencyCallCreateOrConnectWithoutNotificationsInputSchema: z.ZodType<Prisma.EmergencyCallCreateOrConnectWithoutNotificationsInput> = z.strictObject({
  where: z.lazy(() => EmergencyCallWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmergencyCallCreateWithoutNotificationsInputSchema), z.lazy(() => EmergencyCallUncheckedCreateWithoutNotificationsInputSchema) ]),
});

export const EmergencyCallUpsertWithoutNotificationsInputSchema: z.ZodType<Prisma.EmergencyCallUpsertWithoutNotificationsInput> = z.strictObject({
  update: z.union([ z.lazy(() => EmergencyCallUpdateWithoutNotificationsInputSchema), z.lazy(() => EmergencyCallUncheckedUpdateWithoutNotificationsInputSchema) ]),
  create: z.union([ z.lazy(() => EmergencyCallCreateWithoutNotificationsInputSchema), z.lazy(() => EmergencyCallUncheckedCreateWithoutNotificationsInputSchema) ]),
  where: z.lazy(() => EmergencyCallWhereInputSchema).optional(),
});

export const EmergencyCallUpdateToOneWithWhereWithoutNotificationsInputSchema: z.ZodType<Prisma.EmergencyCallUpdateToOneWithWhereWithoutNotificationsInput> = z.strictObject({
  where: z.lazy(() => EmergencyCallWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EmergencyCallUpdateWithoutNotificationsInputSchema), z.lazy(() => EmergencyCallUncheckedUpdateWithoutNotificationsInputSchema) ]),
});

export const EmergencyCallUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.EmergencyCallUpdateWithoutNotificationsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  protocol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  returnLocation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  whatHappened: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apparentAge: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patientCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  injuryCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  attendant: z.lazy(() => UserUpdateOneRequiredWithoutRegisteredCallsNestedInputSchema).optional(),
  vehicles: z.lazy(() => VehicleEmergencyCallUpdateManyWithoutEmergencyCallNestedInputSchema).optional(),
});

export const EmergencyCallUncheckedUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.EmergencyCallUncheckedUpdateWithoutNotificationsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  protocol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  returnLocation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  whatHappened: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apparentAge: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patientCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  injuryCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  attendantId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vehicles: z.lazy(() => VehicleEmergencyCallUncheckedUpdateManyWithoutEmergencyCallNestedInputSchema).optional(),
});

export const EmergencyCallCreateManyAttendantInputSchema: z.ZodType<Prisma.EmergencyCallCreateManyAttendantInput> = z.strictObject({
  id: z.uuid().optional(),
  protocol: z.string(),
  address: z.string(),
  returnLocation: z.string(),
  whatHappened: z.string(),
  patientCondition: z.string(),
  apparentAge: z.number().int().optional().nullable(),
  patientCount: z.number().int(),
  injuryCondition: z.string(),
  observations: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
});

export const ConversationCreateManyAttendantInputSchema: z.ZodType<Prisma.ConversationCreateManyAttendantInput> = z.strictObject({
  id: z.uuid().optional(),
  driverId: z.string(),
});

export const ConversationCreateManyDriverInputSchema: z.ZodType<Prisma.ConversationCreateManyDriverInput> = z.strictObject({
  id: z.uuid().optional(),
  attendantId: z.string(),
});

export const MessageCreateManySenderInputSchema: z.ZodType<Prisma.MessageCreateManySenderInput> = z.strictObject({
  id: z.uuid().optional(),
  text: z.string(),
  sentAt: z.coerce.date().optional(),
  conversationId: z.string(),
});

export const EmergencyCallUpdateWithoutAttendantInputSchema: z.ZodType<Prisma.EmergencyCallUpdateWithoutAttendantInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  protocol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  returnLocation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  whatHappened: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apparentAge: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patientCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  injuryCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vehicles: z.lazy(() => VehicleEmergencyCallUpdateManyWithoutEmergencyCallNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutEmergencyCallNestedInputSchema).optional(),
});

export const EmergencyCallUncheckedUpdateWithoutAttendantInputSchema: z.ZodType<Prisma.EmergencyCallUncheckedUpdateWithoutAttendantInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  protocol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  returnLocation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  whatHappened: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apparentAge: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patientCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  injuryCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vehicles: z.lazy(() => VehicleEmergencyCallUncheckedUpdateManyWithoutEmergencyCallNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutEmergencyCallNestedInputSchema).optional(),
});

export const EmergencyCallUncheckedUpdateManyWithoutAttendantInputSchema: z.ZodType<Prisma.EmergencyCallUncheckedUpdateManyWithoutAttendantInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  protocol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  returnLocation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  whatHappened: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apparentAge: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patientCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  injuryCondition: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ConversationUpdateWithoutAttendantInputSchema: z.ZodType<Prisma.ConversationUpdateWithoutAttendantInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driver: z.lazy(() => UserUpdateOneRequiredWithoutConversationsAsDriverNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutConversationNestedInputSchema).optional(),
});

export const ConversationUncheckedUpdateWithoutAttendantInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateWithoutAttendantInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutConversationNestedInputSchema).optional(),
});

export const ConversationUncheckedUpdateManyWithoutAttendantInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyWithoutAttendantInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ConversationUpdateWithoutDriverInputSchema: z.ZodType<Prisma.ConversationUpdateWithoutDriverInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  attendant: z.lazy(() => UserUpdateOneRequiredWithoutConversationsAsAttendantNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutConversationNestedInputSchema).optional(),
});

export const ConversationUncheckedUpdateWithoutDriverInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateWithoutDriverInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  attendantId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutConversationNestedInputSchema).optional(),
});

export const ConversationUncheckedUpdateManyWithoutDriverInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyWithoutDriverInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  attendantId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const MessageUpdateWithoutSenderInputSchema: z.ZodType<Prisma.MessageUpdateWithoutSenderInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sentAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  conversation: z.lazy(() => ConversationUpdateOneRequiredWithoutMessagesNestedInputSchema).optional(),
});

export const MessageUncheckedUpdateWithoutSenderInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutSenderInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sentAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const MessageUncheckedUpdateManyWithoutSenderInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutSenderInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sentAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VehicleEmergencyCallCreateManyVehicleInputSchema: z.ZodType<Prisma.VehicleEmergencyCallCreateManyVehicleInput> = z.strictObject({
  id: z.uuid().optional(),
  status: z.lazy(() => EmergencyCallStatusSchema).optional(),
  emergencyCallId: z.string(),
});

export const VehicleEmergencyCallUpdateWithoutVehicleInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUpdateWithoutVehicleInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => EmergencyCallStatusSchema), z.lazy(() => EnumEmergencyCallStatusFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyCall: z.lazy(() => EmergencyCallUpdateOneRequiredWithoutVehiclesNestedInputSchema).optional(),
});

export const VehicleEmergencyCallUncheckedUpdateWithoutVehicleInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUncheckedUpdateWithoutVehicleInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => EmergencyCallStatusSchema), z.lazy(() => EnumEmergencyCallStatusFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyCallId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VehicleEmergencyCallUncheckedUpdateManyWithoutVehicleInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUncheckedUpdateManyWithoutVehicleInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => EmergencyCallStatusSchema), z.lazy(() => EnumEmergencyCallStatusFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyCallId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VehicleEmergencyCallCreateManyEmergencyCallInputSchema: z.ZodType<Prisma.VehicleEmergencyCallCreateManyEmergencyCallInput> = z.strictObject({
  id: z.uuid().optional(),
  status: z.lazy(() => EmergencyCallStatusSchema).optional(),
  vehicleId: z.string(),
});

export const NotificationCreateManyEmergencyCallInputSchema: z.ZodType<Prisma.NotificationCreateManyEmergencyCallInput> = z.strictObject({
  id: z.uuid().optional(),
  message: z.string(),
  notifiedAt: z.coerce.date().optional(),
});

export const VehicleEmergencyCallUpdateWithoutEmergencyCallInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUpdateWithoutEmergencyCallInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => EmergencyCallStatusSchema), z.lazy(() => EnumEmergencyCallStatusFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutEmergencyCallsNestedInputSchema).optional(),
});

export const VehicleEmergencyCallUncheckedUpdateWithoutEmergencyCallInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUncheckedUpdateWithoutEmergencyCallInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => EmergencyCallStatusSchema), z.lazy(() => EnumEmergencyCallStatusFieldUpdateOperationsInputSchema) ]).optional(),
  vehicleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VehicleEmergencyCallUncheckedUpdateManyWithoutEmergencyCallInputSchema: z.ZodType<Prisma.VehicleEmergencyCallUncheckedUpdateManyWithoutEmergencyCallInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => EmergencyCallStatusSchema), z.lazy(() => EnumEmergencyCallStatusFieldUpdateOperationsInputSchema) ]).optional(),
  vehicleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const NotificationUpdateWithoutEmergencyCallInputSchema: z.ZodType<Prisma.NotificationUpdateWithoutEmergencyCallInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notifiedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const NotificationUncheckedUpdateWithoutEmergencyCallInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateWithoutEmergencyCallInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notifiedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const NotificationUncheckedUpdateManyWithoutEmergencyCallInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutEmergencyCallInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notifiedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const MessageCreateManyConversationInputSchema: z.ZodType<Prisma.MessageCreateManyConversationInput> = z.strictObject({
  id: z.uuid().optional(),
  text: z.string(),
  sentAt: z.coerce.date().optional(),
  senderId: z.string(),
});

export const MessageUpdateWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpdateWithoutConversationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sentAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sender: z.lazy(() => UserUpdateOneRequiredWithoutSentMessagesNestedInputSchema).optional(),
});

export const MessageUncheckedUpdateWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutConversationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sentAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const MessageUncheckedUpdateManyWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutConversationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sentAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(), 
  having: UserScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const VehicleFindFirstArgsSchema: z.ZodType<Prisma.VehicleFindFirstArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  where: VehicleWhereInputSchema.optional(), 
  orderBy: z.union([ VehicleOrderByWithRelationInputSchema.array(), VehicleOrderByWithRelationInputSchema ]).optional(),
  cursor: VehicleWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VehicleScalarFieldEnumSchema, VehicleScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VehicleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VehicleFindFirstOrThrowArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  where: VehicleWhereInputSchema.optional(), 
  orderBy: z.union([ VehicleOrderByWithRelationInputSchema.array(), VehicleOrderByWithRelationInputSchema ]).optional(),
  cursor: VehicleWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VehicleScalarFieldEnumSchema, VehicleScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VehicleFindManyArgsSchema: z.ZodType<Prisma.VehicleFindManyArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  where: VehicleWhereInputSchema.optional(), 
  orderBy: z.union([ VehicleOrderByWithRelationInputSchema.array(), VehicleOrderByWithRelationInputSchema ]).optional(),
  cursor: VehicleWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VehicleScalarFieldEnumSchema, VehicleScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VehicleAggregateArgsSchema: z.ZodType<Prisma.VehicleAggregateArgs> = z.object({
  where: VehicleWhereInputSchema.optional(), 
  orderBy: z.union([ VehicleOrderByWithRelationInputSchema.array(), VehicleOrderByWithRelationInputSchema ]).optional(),
  cursor: VehicleWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VehicleGroupByArgsSchema: z.ZodType<Prisma.VehicleGroupByArgs> = z.object({
  where: VehicleWhereInputSchema.optional(), 
  orderBy: z.union([ VehicleOrderByWithAggregationInputSchema.array(), VehicleOrderByWithAggregationInputSchema ]).optional(),
  by: VehicleScalarFieldEnumSchema.array(), 
  having: VehicleScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VehicleFindUniqueArgsSchema: z.ZodType<Prisma.VehicleFindUniqueArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  where: VehicleWhereUniqueInputSchema, 
}).strict();

export const VehicleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VehicleFindUniqueOrThrowArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  where: VehicleWhereUniqueInputSchema, 
}).strict();

export const EmergencyCallFindFirstArgsSchema: z.ZodType<Prisma.EmergencyCallFindFirstArgs> = z.object({
  select: EmergencyCallSelectSchema.optional(),
  include: EmergencyCallIncludeSchema.optional(),
  where: EmergencyCallWhereInputSchema.optional(), 
  orderBy: z.union([ EmergencyCallOrderByWithRelationInputSchema.array(), EmergencyCallOrderByWithRelationInputSchema ]).optional(),
  cursor: EmergencyCallWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmergencyCallScalarFieldEnumSchema, EmergencyCallScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const EmergencyCallFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EmergencyCallFindFirstOrThrowArgs> = z.object({
  select: EmergencyCallSelectSchema.optional(),
  include: EmergencyCallIncludeSchema.optional(),
  where: EmergencyCallWhereInputSchema.optional(), 
  orderBy: z.union([ EmergencyCallOrderByWithRelationInputSchema.array(), EmergencyCallOrderByWithRelationInputSchema ]).optional(),
  cursor: EmergencyCallWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmergencyCallScalarFieldEnumSchema, EmergencyCallScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const EmergencyCallFindManyArgsSchema: z.ZodType<Prisma.EmergencyCallFindManyArgs> = z.object({
  select: EmergencyCallSelectSchema.optional(),
  include: EmergencyCallIncludeSchema.optional(),
  where: EmergencyCallWhereInputSchema.optional(), 
  orderBy: z.union([ EmergencyCallOrderByWithRelationInputSchema.array(), EmergencyCallOrderByWithRelationInputSchema ]).optional(),
  cursor: EmergencyCallWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmergencyCallScalarFieldEnumSchema, EmergencyCallScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const EmergencyCallAggregateArgsSchema: z.ZodType<Prisma.EmergencyCallAggregateArgs> = z.object({
  where: EmergencyCallWhereInputSchema.optional(), 
  orderBy: z.union([ EmergencyCallOrderByWithRelationInputSchema.array(), EmergencyCallOrderByWithRelationInputSchema ]).optional(),
  cursor: EmergencyCallWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const EmergencyCallGroupByArgsSchema: z.ZodType<Prisma.EmergencyCallGroupByArgs> = z.object({
  where: EmergencyCallWhereInputSchema.optional(), 
  orderBy: z.union([ EmergencyCallOrderByWithAggregationInputSchema.array(), EmergencyCallOrderByWithAggregationInputSchema ]).optional(),
  by: EmergencyCallScalarFieldEnumSchema.array(), 
  having: EmergencyCallScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const EmergencyCallFindUniqueArgsSchema: z.ZodType<Prisma.EmergencyCallFindUniqueArgs> = z.object({
  select: EmergencyCallSelectSchema.optional(),
  include: EmergencyCallIncludeSchema.optional(),
  where: EmergencyCallWhereUniqueInputSchema, 
}).strict();

export const EmergencyCallFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EmergencyCallFindUniqueOrThrowArgs> = z.object({
  select: EmergencyCallSelectSchema.optional(),
  include: EmergencyCallIncludeSchema.optional(),
  where: EmergencyCallWhereUniqueInputSchema, 
}).strict();

export const VehicleEmergencyCallFindFirstArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallFindFirstArgs> = z.object({
  select: VehicleEmergencyCallSelectSchema.optional(),
  include: VehicleEmergencyCallIncludeSchema.optional(),
  where: VehicleEmergencyCallWhereInputSchema.optional(), 
  orderBy: z.union([ VehicleEmergencyCallOrderByWithRelationInputSchema.array(), VehicleEmergencyCallOrderByWithRelationInputSchema ]).optional(),
  cursor: VehicleEmergencyCallWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VehicleEmergencyCallScalarFieldEnumSchema, VehicleEmergencyCallScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VehicleEmergencyCallFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallFindFirstOrThrowArgs> = z.object({
  select: VehicleEmergencyCallSelectSchema.optional(),
  include: VehicleEmergencyCallIncludeSchema.optional(),
  where: VehicleEmergencyCallWhereInputSchema.optional(), 
  orderBy: z.union([ VehicleEmergencyCallOrderByWithRelationInputSchema.array(), VehicleEmergencyCallOrderByWithRelationInputSchema ]).optional(),
  cursor: VehicleEmergencyCallWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VehicleEmergencyCallScalarFieldEnumSchema, VehicleEmergencyCallScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VehicleEmergencyCallFindManyArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallFindManyArgs> = z.object({
  select: VehicleEmergencyCallSelectSchema.optional(),
  include: VehicleEmergencyCallIncludeSchema.optional(),
  where: VehicleEmergencyCallWhereInputSchema.optional(), 
  orderBy: z.union([ VehicleEmergencyCallOrderByWithRelationInputSchema.array(), VehicleEmergencyCallOrderByWithRelationInputSchema ]).optional(),
  cursor: VehicleEmergencyCallWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VehicleEmergencyCallScalarFieldEnumSchema, VehicleEmergencyCallScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VehicleEmergencyCallAggregateArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallAggregateArgs> = z.object({
  where: VehicleEmergencyCallWhereInputSchema.optional(), 
  orderBy: z.union([ VehicleEmergencyCallOrderByWithRelationInputSchema.array(), VehicleEmergencyCallOrderByWithRelationInputSchema ]).optional(),
  cursor: VehicleEmergencyCallWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VehicleEmergencyCallGroupByArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallGroupByArgs> = z.object({
  where: VehicleEmergencyCallWhereInputSchema.optional(), 
  orderBy: z.union([ VehicleEmergencyCallOrderByWithAggregationInputSchema.array(), VehicleEmergencyCallOrderByWithAggregationInputSchema ]).optional(),
  by: VehicleEmergencyCallScalarFieldEnumSchema.array(), 
  having: VehicleEmergencyCallScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VehicleEmergencyCallFindUniqueArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallFindUniqueArgs> = z.object({
  select: VehicleEmergencyCallSelectSchema.optional(),
  include: VehicleEmergencyCallIncludeSchema.optional(),
  where: VehicleEmergencyCallWhereUniqueInputSchema, 
}).strict();

export const VehicleEmergencyCallFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallFindUniqueOrThrowArgs> = z.object({
  select: VehicleEmergencyCallSelectSchema.optional(),
  include: VehicleEmergencyCallIncludeSchema.optional(),
  where: VehicleEmergencyCallWhereUniqueInputSchema, 
}).strict();

export const ConversationFindFirstArgsSchema: z.ZodType<Prisma.ConversationFindFirstArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereInputSchema.optional(), 
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(), ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema, ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ConversationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ConversationFindFirstOrThrowArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereInputSchema.optional(), 
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(), ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema, ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ConversationFindManyArgsSchema: z.ZodType<Prisma.ConversationFindManyArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereInputSchema.optional(), 
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(), ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema, ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ConversationAggregateArgsSchema: z.ZodType<Prisma.ConversationAggregateArgs> = z.object({
  where: ConversationWhereInputSchema.optional(), 
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(), ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ConversationGroupByArgsSchema: z.ZodType<Prisma.ConversationGroupByArgs> = z.object({
  where: ConversationWhereInputSchema.optional(), 
  orderBy: z.union([ ConversationOrderByWithAggregationInputSchema.array(), ConversationOrderByWithAggregationInputSchema ]).optional(),
  by: ConversationScalarFieldEnumSchema.array(), 
  having: ConversationScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ConversationFindUniqueArgsSchema: z.ZodType<Prisma.ConversationFindUniqueArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema, 
}).strict();

export const ConversationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ConversationFindUniqueOrThrowArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema, 
}).strict();

export const MessageFindFirstArgsSchema: z.ZodType<Prisma.MessageFindFirstArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(), 
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(), MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema, MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const MessageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MessageFindFirstOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(), 
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(), MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema, MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const MessageFindManyArgsSchema: z.ZodType<Prisma.MessageFindManyArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(), 
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(), MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema, MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const MessageAggregateArgsSchema: z.ZodType<Prisma.MessageAggregateArgs> = z.object({
  where: MessageWhereInputSchema.optional(), 
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(), MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const MessageGroupByArgsSchema: z.ZodType<Prisma.MessageGroupByArgs> = z.object({
  where: MessageWhereInputSchema.optional(), 
  orderBy: z.union([ MessageOrderByWithAggregationInputSchema.array(), MessageOrderByWithAggregationInputSchema ]).optional(),
  by: MessageScalarFieldEnumSchema.array(), 
  having: MessageScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const MessageFindUniqueArgsSchema: z.ZodType<Prisma.MessageFindUniqueArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema, 
}).strict();

export const MessageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MessageFindUniqueOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema, 
}).strict();

export const NotificationFindFirstArgsSchema: z.ZodType<Prisma.NotificationFindFirstArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereInputSchema.optional(), 
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(), NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationScalarFieldEnumSchema, NotificationScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const NotificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NotificationFindFirstOrThrowArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereInputSchema.optional(), 
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(), NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationScalarFieldEnumSchema, NotificationScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const NotificationFindManyArgsSchema: z.ZodType<Prisma.NotificationFindManyArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereInputSchema.optional(), 
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(), NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationScalarFieldEnumSchema, NotificationScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const NotificationAggregateArgsSchema: z.ZodType<Prisma.NotificationAggregateArgs> = z.object({
  where: NotificationWhereInputSchema.optional(), 
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(), NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const NotificationGroupByArgsSchema: z.ZodType<Prisma.NotificationGroupByArgs> = z.object({
  where: NotificationWhereInputSchema.optional(), 
  orderBy: z.union([ NotificationOrderByWithAggregationInputSchema.array(), NotificationOrderByWithAggregationInputSchema ]).optional(),
  by: NotificationScalarFieldEnumSchema.array(), 
  having: NotificationScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const NotificationFindUniqueArgsSchema: z.ZodType<Prisma.NotificationFindUniqueArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema, 
}).strict();

export const NotificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NotificationFindUniqueOrThrowArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema, 
}).strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
  create: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const VehicleCreateArgsSchema: z.ZodType<Prisma.VehicleCreateArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  data: z.union([ VehicleCreateInputSchema, VehicleUncheckedCreateInputSchema ]),
}).strict();

export const VehicleUpsertArgsSchema: z.ZodType<Prisma.VehicleUpsertArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  where: VehicleWhereUniqueInputSchema, 
  create: z.union([ VehicleCreateInputSchema, VehicleUncheckedCreateInputSchema ]),
  update: z.union([ VehicleUpdateInputSchema, VehicleUncheckedUpdateInputSchema ]),
}).strict();

export const VehicleCreateManyArgsSchema: z.ZodType<Prisma.VehicleCreateManyArgs> = z.object({
  data: z.union([ VehicleCreateManyInputSchema, VehicleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const VehicleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VehicleCreateManyAndReturnArgs> = z.object({
  data: z.union([ VehicleCreateManyInputSchema, VehicleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const VehicleDeleteArgsSchema: z.ZodType<Prisma.VehicleDeleteArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  where: VehicleWhereUniqueInputSchema, 
}).strict();

export const VehicleUpdateArgsSchema: z.ZodType<Prisma.VehicleUpdateArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  data: z.union([ VehicleUpdateInputSchema, VehicleUncheckedUpdateInputSchema ]),
  where: VehicleWhereUniqueInputSchema, 
}).strict();

export const VehicleUpdateManyArgsSchema: z.ZodType<Prisma.VehicleUpdateManyArgs> = z.object({
  data: z.union([ VehicleUpdateManyMutationInputSchema, VehicleUncheckedUpdateManyInputSchema ]),
  where: VehicleWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const VehicleUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VehicleUpdateManyAndReturnArgs> = z.object({
  data: z.union([ VehicleUpdateManyMutationInputSchema, VehicleUncheckedUpdateManyInputSchema ]),
  where: VehicleWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const VehicleDeleteManyArgsSchema: z.ZodType<Prisma.VehicleDeleteManyArgs> = z.object({
  where: VehicleWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const EmergencyCallCreateArgsSchema: z.ZodType<Prisma.EmergencyCallCreateArgs> = z.object({
  select: EmergencyCallSelectSchema.optional(),
  include: EmergencyCallIncludeSchema.optional(),
  data: z.union([ EmergencyCallCreateInputSchema, EmergencyCallUncheckedCreateInputSchema ]),
}).strict();

export const EmergencyCallUpsertArgsSchema: z.ZodType<Prisma.EmergencyCallUpsertArgs> = z.object({
  select: EmergencyCallSelectSchema.optional(),
  include: EmergencyCallIncludeSchema.optional(),
  where: EmergencyCallWhereUniqueInputSchema, 
  create: z.union([ EmergencyCallCreateInputSchema, EmergencyCallUncheckedCreateInputSchema ]),
  update: z.union([ EmergencyCallUpdateInputSchema, EmergencyCallUncheckedUpdateInputSchema ]),
}).strict();

export const EmergencyCallCreateManyArgsSchema: z.ZodType<Prisma.EmergencyCallCreateManyArgs> = z.object({
  data: z.union([ EmergencyCallCreateManyInputSchema, EmergencyCallCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const EmergencyCallCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EmergencyCallCreateManyAndReturnArgs> = z.object({
  data: z.union([ EmergencyCallCreateManyInputSchema, EmergencyCallCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const EmergencyCallDeleteArgsSchema: z.ZodType<Prisma.EmergencyCallDeleteArgs> = z.object({
  select: EmergencyCallSelectSchema.optional(),
  include: EmergencyCallIncludeSchema.optional(),
  where: EmergencyCallWhereUniqueInputSchema, 
}).strict();

export const EmergencyCallUpdateArgsSchema: z.ZodType<Prisma.EmergencyCallUpdateArgs> = z.object({
  select: EmergencyCallSelectSchema.optional(),
  include: EmergencyCallIncludeSchema.optional(),
  data: z.union([ EmergencyCallUpdateInputSchema, EmergencyCallUncheckedUpdateInputSchema ]),
  where: EmergencyCallWhereUniqueInputSchema, 
}).strict();

export const EmergencyCallUpdateManyArgsSchema: z.ZodType<Prisma.EmergencyCallUpdateManyArgs> = z.object({
  data: z.union([ EmergencyCallUpdateManyMutationInputSchema, EmergencyCallUncheckedUpdateManyInputSchema ]),
  where: EmergencyCallWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const EmergencyCallUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EmergencyCallUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EmergencyCallUpdateManyMutationInputSchema, EmergencyCallUncheckedUpdateManyInputSchema ]),
  where: EmergencyCallWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const EmergencyCallDeleteManyArgsSchema: z.ZodType<Prisma.EmergencyCallDeleteManyArgs> = z.object({
  where: EmergencyCallWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const VehicleEmergencyCallCreateArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallCreateArgs> = z.object({
  select: VehicleEmergencyCallSelectSchema.optional(),
  include: VehicleEmergencyCallIncludeSchema.optional(),
  data: z.union([ VehicleEmergencyCallCreateInputSchema, VehicleEmergencyCallUncheckedCreateInputSchema ]),
}).strict();

export const VehicleEmergencyCallUpsertArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallUpsertArgs> = z.object({
  select: VehicleEmergencyCallSelectSchema.optional(),
  include: VehicleEmergencyCallIncludeSchema.optional(),
  where: VehicleEmergencyCallWhereUniqueInputSchema, 
  create: z.union([ VehicleEmergencyCallCreateInputSchema, VehicleEmergencyCallUncheckedCreateInputSchema ]),
  update: z.union([ VehicleEmergencyCallUpdateInputSchema, VehicleEmergencyCallUncheckedUpdateInputSchema ]),
}).strict();

export const VehicleEmergencyCallCreateManyArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallCreateManyArgs> = z.object({
  data: z.union([ VehicleEmergencyCallCreateManyInputSchema, VehicleEmergencyCallCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const VehicleEmergencyCallCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallCreateManyAndReturnArgs> = z.object({
  data: z.union([ VehicleEmergencyCallCreateManyInputSchema, VehicleEmergencyCallCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const VehicleEmergencyCallDeleteArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallDeleteArgs> = z.object({
  select: VehicleEmergencyCallSelectSchema.optional(),
  include: VehicleEmergencyCallIncludeSchema.optional(),
  where: VehicleEmergencyCallWhereUniqueInputSchema, 
}).strict();

export const VehicleEmergencyCallUpdateArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallUpdateArgs> = z.object({
  select: VehicleEmergencyCallSelectSchema.optional(),
  include: VehicleEmergencyCallIncludeSchema.optional(),
  data: z.union([ VehicleEmergencyCallUpdateInputSchema, VehicleEmergencyCallUncheckedUpdateInputSchema ]),
  where: VehicleEmergencyCallWhereUniqueInputSchema, 
}).strict();

export const VehicleEmergencyCallUpdateManyArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallUpdateManyArgs> = z.object({
  data: z.union([ VehicleEmergencyCallUpdateManyMutationInputSchema, VehicleEmergencyCallUncheckedUpdateManyInputSchema ]),
  where: VehicleEmergencyCallWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const VehicleEmergencyCallUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallUpdateManyAndReturnArgs> = z.object({
  data: z.union([ VehicleEmergencyCallUpdateManyMutationInputSchema, VehicleEmergencyCallUncheckedUpdateManyInputSchema ]),
  where: VehicleEmergencyCallWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const VehicleEmergencyCallDeleteManyArgsSchema: z.ZodType<Prisma.VehicleEmergencyCallDeleteManyArgs> = z.object({
  where: VehicleEmergencyCallWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ConversationCreateArgsSchema: z.ZodType<Prisma.ConversationCreateArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  data: z.union([ ConversationCreateInputSchema, ConversationUncheckedCreateInputSchema ]),
}).strict();

export const ConversationUpsertArgsSchema: z.ZodType<Prisma.ConversationUpsertArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema, 
  create: z.union([ ConversationCreateInputSchema, ConversationUncheckedCreateInputSchema ]),
  update: z.union([ ConversationUpdateInputSchema, ConversationUncheckedUpdateInputSchema ]),
}).strict();

export const ConversationCreateManyArgsSchema: z.ZodType<Prisma.ConversationCreateManyArgs> = z.object({
  data: z.union([ ConversationCreateManyInputSchema, ConversationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ConversationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ConversationCreateManyAndReturnArgs> = z.object({
  data: z.union([ ConversationCreateManyInputSchema, ConversationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ConversationDeleteArgsSchema: z.ZodType<Prisma.ConversationDeleteArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema, 
}).strict();

export const ConversationUpdateArgsSchema: z.ZodType<Prisma.ConversationUpdateArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  data: z.union([ ConversationUpdateInputSchema, ConversationUncheckedUpdateInputSchema ]),
  where: ConversationWhereUniqueInputSchema, 
}).strict();

export const ConversationUpdateManyArgsSchema: z.ZodType<Prisma.ConversationUpdateManyArgs> = z.object({
  data: z.union([ ConversationUpdateManyMutationInputSchema, ConversationUncheckedUpdateManyInputSchema ]),
  where: ConversationWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ConversationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ConversationUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ConversationUpdateManyMutationInputSchema, ConversationUncheckedUpdateManyInputSchema ]),
  where: ConversationWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ConversationDeleteManyArgsSchema: z.ZodType<Prisma.ConversationDeleteManyArgs> = z.object({
  where: ConversationWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const MessageCreateArgsSchema: z.ZodType<Prisma.MessageCreateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageCreateInputSchema, MessageUncheckedCreateInputSchema ]),
}).strict();

export const MessageUpsertArgsSchema: z.ZodType<Prisma.MessageUpsertArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema, 
  create: z.union([ MessageCreateInputSchema, MessageUncheckedCreateInputSchema ]),
  update: z.union([ MessageUpdateInputSchema, MessageUncheckedUpdateInputSchema ]),
}).strict();

export const MessageCreateManyArgsSchema: z.ZodType<Prisma.MessageCreateManyArgs> = z.object({
  data: z.union([ MessageCreateManyInputSchema, MessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const MessageCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MessageCreateManyAndReturnArgs> = z.object({
  data: z.union([ MessageCreateManyInputSchema, MessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const MessageDeleteArgsSchema: z.ZodType<Prisma.MessageDeleteArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema, 
}).strict();

export const MessageUpdateArgsSchema: z.ZodType<Prisma.MessageUpdateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageUpdateInputSchema, MessageUncheckedUpdateInputSchema ]),
  where: MessageWhereUniqueInputSchema, 
}).strict();

export const MessageUpdateManyArgsSchema: z.ZodType<Prisma.MessageUpdateManyArgs> = z.object({
  data: z.union([ MessageUpdateManyMutationInputSchema, MessageUncheckedUpdateManyInputSchema ]),
  where: MessageWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const MessageUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.MessageUpdateManyAndReturnArgs> = z.object({
  data: z.union([ MessageUpdateManyMutationInputSchema, MessageUncheckedUpdateManyInputSchema ]),
  where: MessageWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const MessageDeleteManyArgsSchema: z.ZodType<Prisma.MessageDeleteManyArgs> = z.object({
  where: MessageWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const NotificationCreateArgsSchema: z.ZodType<Prisma.NotificationCreateArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  data: z.union([ NotificationCreateInputSchema, NotificationUncheckedCreateInputSchema ]),
}).strict();

export const NotificationUpsertArgsSchema: z.ZodType<Prisma.NotificationUpsertArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema, 
  create: z.union([ NotificationCreateInputSchema, NotificationUncheckedCreateInputSchema ]),
  update: z.union([ NotificationUpdateInputSchema, NotificationUncheckedUpdateInputSchema ]),
}).strict();

export const NotificationCreateManyArgsSchema: z.ZodType<Prisma.NotificationCreateManyArgs> = z.object({
  data: z.union([ NotificationCreateManyInputSchema, NotificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const NotificationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NotificationCreateManyAndReturnArgs> = z.object({
  data: z.union([ NotificationCreateManyInputSchema, NotificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const NotificationDeleteArgsSchema: z.ZodType<Prisma.NotificationDeleteArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema, 
}).strict();

export const NotificationUpdateArgsSchema: z.ZodType<Prisma.NotificationUpdateArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  data: z.union([ NotificationUpdateInputSchema, NotificationUncheckedUpdateInputSchema ]),
  where: NotificationWhereUniqueInputSchema, 
}).strict();

export const NotificationUpdateManyArgsSchema: z.ZodType<Prisma.NotificationUpdateManyArgs> = z.object({
  data: z.union([ NotificationUpdateManyMutationInputSchema, NotificationUncheckedUpdateManyInputSchema ]),
  where: NotificationWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const NotificationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.NotificationUpdateManyAndReturnArgs> = z.object({
  data: z.union([ NotificationUpdateManyMutationInputSchema, NotificationUncheckedUpdateManyInputSchema ]),
  where: NotificationWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const NotificationDeleteManyArgsSchema: z.ZodType<Prisma.NotificationDeleteManyArgs> = z.object({
  where: NotificationWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();