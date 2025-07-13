
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  const gradeOptions = [
    { value: "1", label: "1º Ano" },
    { value: "2", label: "2º Ano" },
    { value: "3", label: "3º Ano" },
    { value: "4", label: "4º Ano" },
    { value: "5", label: "5º Ano" },
    { value: "6", label: "6º Ano" },
    { value: "7", label: "7º Ano" },
    { value: "8", label: "8º Ano" },
    { value: "9", label: "9º Ano" },
  ];

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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua série" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {gradeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
