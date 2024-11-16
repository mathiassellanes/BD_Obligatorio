import { z } from "zod";

const turnSchema = z.object({
  id: z.int(),
  starthour: z.hours(),
  finishhour: z.hours(),
});

export default turnSchema;
