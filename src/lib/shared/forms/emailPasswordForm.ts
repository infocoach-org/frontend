import zod from "zod";

const TeacherForm = zod.object({
  email: zod.string().nonempty("email missing").email("email not correct"),
  password: zod
    .string()
    .nonempty("password missing")
    .min(8, "password should be at least 8 characters long")
    .refine(
      (s) => /[a-zA-Z]/.test(s),
      "password should have at least one letter"
    )
    .refine((s) => /\d/.test(s), "password should have at least one number")
    .refine(
      (s) => /[#!"$%&/\\()=?*+'#-_.:]/.test(s),
      "password should have at least one of: #!\"$%&/\\()=?*+'#-_.:"
    ),
});

export default TeacherForm;
