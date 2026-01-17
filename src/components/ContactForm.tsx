"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  company: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) return;
    // TODO: Replace with API or CRM integration
    console.log("Contact submission", data);
    alert("Thank you! We'll be in touch.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="text" {...register("honeypot")} style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
      <div>
        <label>Name</label>
        <input className="w-full p-2 rounded bg-accent" {...register("name")} />
        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
      </div>
      <div>
        <label>Email</label>
        <input className="w-full p-2 rounded bg-accent" {...register("email")} />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>
      <div>
        <label>Company</label>
        <input className="w-full p-2 rounded bg-accent" {...register("company")} />
      </div>
      <div>
        <label>Message</label>
        <textarea className="w-full p-2 rounded bg-accent" rows={4} {...register("message")} />
        {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
      </div>
      <button type="submit" className="bg-primary text-black px-4 py-2 rounded" disabled={isSubmitting}>Send</button>
      {isSubmitSuccessful && <div className="text-green-500 mt-2">Submitted!</div>}
    </form>
  );
}
