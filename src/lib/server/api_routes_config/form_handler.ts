import type * as Kit from "@sveltejs/kit";
import { error } from "@sveltejs/kit";
import type { ZodType, ZodTypeDef } from "zod";

export function formHandler<
  RouteParams extends Partial<Record<string, string>>,
  RouteId extends string | null,
  ZodOutput,
  Def extends ZodTypeDef,
  ZodInput
>(
  handle: Kit.RequestHandler<RouteParams & { form: ZodOutput }, RouteId>,
  jsonForm: ZodType<ZodOutput, Def, ZodInput>
): Kit.RequestHandler<RouteParams, RouteId> {
  return (
    requestEvent: Kit.RequestEvent<RouteParams, RouteId>
  ): Kit.MaybePromise<Response> => {
    return requestEvent.request
      .json()
      .catch(() => {
        throw error(400, { message: "could not open json" });
      })
      .then((data) => {
        const result = jsonForm.safeParse(data);
        if (result.success) {
          const form = result.data;
          return handle({
            ...requestEvent,
            params: { ...requestEvent.params, form },
          });
        } else {
          throw error(400, { message: result.error.message });
        }
      });
  };
}
