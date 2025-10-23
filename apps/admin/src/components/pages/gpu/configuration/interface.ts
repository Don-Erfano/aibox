import { z } from "zod";
import { configurationSchema } from "./constants";

type TRequestData = z.infer<typeof configurationSchema>;

export type { TRequestData };
