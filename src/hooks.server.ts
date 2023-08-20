import "reflect-metadata";
import { container } from "tsyringe";

import { initializeServices } from "$lib/server";

await initializeServices();

// TODO: handle errors from zod and typeorm and custom service or repo errors
