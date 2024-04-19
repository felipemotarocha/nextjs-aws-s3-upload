"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/form";
import { Input } from "../_components/ui/input";
import { Button } from "../_components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserByEmail } from "./_actions/get-user-by-email";
import { useState } from "react";
import { User } from "@prisma/client";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email(),
});

const SearchUser = () => {
  const [user, setUser] = useState<User | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const user = await getUserByEmail(data.email);
    if (!user) {
      return alert("Usuário não encontrado");
    }
    setUser(user);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="Enter user e-mail" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Buscar</Button>
        </form>
      </Form>

      {user && (
        <div className="space-y-2 p-5">
          <h1>Usuário encontrado</h1>

          <h2>{user.email}</h2>
          {user?.imageUrl && (
            <Image
              src={user.imageUrl}
              alt={user.email}
              width={120}
              height={120}
              className="rounded-full"
            />
          )}
        </div>
      )}
    </>
  );
};

export default SearchUser;
