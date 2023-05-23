"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import Hero from "./components/Hero";
const schema = z.object({
  username: z.string().nonempty("username is required"),
  email: z.string().email(),
  bio: z.string().nonempty("bio field is required"),
  urls: z
    .object({
      link: z.string(),
    })
    .array()
    .nonempty(),
});

function Profile() {
  const { register, formState, control, handleSubmit, setValue } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
    defaultValues: {
      urls: [
        {
          link: "https://shadcn.com",
        },
      ],
    },
  });

  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "urls",
    control,
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };
  return (
    <div>
      <Hero
        title="Profile"
        content="This is how others will see you on the site."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1">
          <Label htmlFor="username">username</Label>
          <Input
            {...register("username")}
            type="text"
            id="username"
            placeholder="alex@gmail.com"
          />
          <p className="text-sm text-zinc-600">
            This is your public display name. It can be your real name or a
            pseudonym
          </p>
          <p className="text-rose-500 font-semibold text-sm">
            {errors?.username?.message}
          </p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">email</Label>
          <Select
            onValueChange={(value) => {
              setValue("email", value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Verified Email</SelectLabel>
                <SelectItem value="alex@gmail.com">alex@gmail.com</SelectItem>
                <SelectItem value="zim@gmail.com">zim@gmail.com</SelectItem>
                <SelectItem value="beron@gmail.com">beron@gmail.com</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-sm text-zinc-600">
            You can manage verified email addresses in your email settings.
          </p>
          <p className="text-rose-500 font-semibold text-sm">
            {errors?.email?.message}
          </p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="bio">bio</Label>
          <Textarea {...register("bio")} id="bio" placeholder="bio ..." />
          <p className="text-sm text-zinc-600">
            somply describe ... what you wish to write
          </p>
          <p className="text-rose-500 font-semibold text-sm">
            {errors?.bio?.message}
          </p>
        </div>

        <div className="space-y-1 mb-10">
          <Label htmlFor="URLs">URLs</Label>

          {fields.map((field, index) => {
            return (
              <section className="flex gap-4 items-center" key={field.id}>
                <Input
                  className="flex-1"
                  type="text"
                  {...register(`urls.${index}.link`)}
                  id="URLs"
                  placeholder="URLs ..."
                />
                <Trash2
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => remove(index)}
                />
              </section>
            );
          })}
          <div>
            <button
              className="text-sm"
              onClick={() =>
                append({
                  link: "",
                })
              }
              type="button"
            >
              Add URL
            </button>
          </div>

          <p className="text-rose-500 font-semibold text-sm">
            {errors?.urls?.message}
          </p>
        </div>

        <div>
          <button
            type="submit"
            className="px-4 text-sm py-2 rounded bg-black text-white"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
