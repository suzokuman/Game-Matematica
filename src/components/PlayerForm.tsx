
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

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
                <Select value={field.value} onValueChange={field.onChange} defaultValue="">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a série" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1º ano">1º ano</SelectItem>
                    <SelectItem value="2º ano">2º ano</SelectItem>
                    <SelectItem value="3º ano">3º ano</SelectItem>
                    <SelectItem value="4º ano">4º ano</SelectItem>
                    <SelectItem value="5º ano">5º ano</SelectItem>
                    <SelectItem value="6º ano">6º ano</SelectItem>
                    <SelectItem value="7º ano">7º ano</SelectItem>
                    <SelectItem value="8º ano">8º ano</SelectItem>
                    <SelectItem value="9º ano">9º ano</SelectItem>
                  </SelectContent>
                </Select>
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
