import { z } from "zod";

const total = z.array(z.string()).superRefine((val, ctx) => {
  if (val.length > 3) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      maximum: 3,
      type: "array",
      inclusive: true,
      message: "Too many items 😡",
    });
  }

  if (val.length !== new Set(val).size) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_date,
      message: `No duplicates allowed.`,
    });
  }
});

console.log(total.safeParse(["adfe", "adf", "sd", "def"])?.error);
