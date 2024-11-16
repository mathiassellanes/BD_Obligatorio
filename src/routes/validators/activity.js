import { z } from "zod";

const activitySchema = z.object({
  id: z.int(),
  description: z.string(),
  cost: z.int(),
});

export default turnSchema;
