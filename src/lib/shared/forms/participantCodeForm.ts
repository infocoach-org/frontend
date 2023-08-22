import zod from "zod";

const ParticipantForm = zod.object({
  code: zod
    .string()
    .min(6, "password should be at least 6 characters long")
    .refine(
      (s) => /^[a-zA-Z0-9]*$/.test(s),
      "code can only contain letters and passwords"
    )
    .transform((s) => s.toLocaleLowerCase()),
});

export default ParticipantForm;
