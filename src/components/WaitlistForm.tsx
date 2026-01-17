"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export default function WaitlistForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) return;
    // TODO: Replace with API or CRM integration
    console.log("Waitlist submission", data);
    alert("Thank you for joining the waitlist!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="text" {...register("honeypot")} style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
      <div>
        <label>Email</label>
        <input className="w-full p-2 rounded bg-accent" {...register("email")} />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>
      <button type="submit" className="bg-primary text-black px-4 py-2 rounded" disabled={isSubmitting}>Join</button>
      {isSubmitSuccessful && <div className="text-green-500 mt-2">Submitted!</div>}
    </form>
  );
}
