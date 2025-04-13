
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const playerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  grade: z.string().min(1, "Série é obrigatória"),
});

export type PlayerFormValues = z.infer<typeof playerSchema>;

interface PlayerFormProps {
  onSubmitPlayerInfo: (data: PlayerFormValues) => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ onSubmitPlayerInfo }) => {
  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      name: "",
      grade: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitPlayerInfo)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Série</FormLabel>
              <FormControl>
                <Input placeholder="Digite sua série" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="game-button w-full md:w-auto">
          Continuar
        </Button>
      </form>
    </Form>
  );
};

export default PlayerForm;
