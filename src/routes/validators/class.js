import { z } from "zod";

const turnSchema = z.object({
  id: z.int(),
  dictada: z.boolean(),
  dia: z.date(),
});

export default turnSchema;
