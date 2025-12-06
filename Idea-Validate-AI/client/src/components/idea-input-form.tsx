import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lightbulb, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { insertValidationSchema, type InsertValidation } from "@shared/schema";

interface IdeaInputFormProps {
  onSubmit: (idea: string) => void;
  isLoading: boolean;
}

const examplePrompts = [
  "A mobile app that helps remote teams build stronger connections through daily micro-interactions and virtual coffee chats",
  "An AI-powered platform that generates personalized meal plans based on dietary restrictions, budget, and local grocery store sales",
  "A marketplace connecting local artisans with consumers who want unique, handmade home decor items",
];

export function IdeaInputForm({ onSubmit, isLoading }: IdeaInputFormProps) {
  const [charCount, setCharCount] = useState(0);

  const form = useForm<InsertValidation>({
    resolver: zodResolver(insertValidationSchema),
    defaultValues: {
      idea: "",
    },
  });

  const handleSubmit = (data: InsertValidation) => {
    onSubmit(data.idea);
  };

  const handleExampleClick = (example: string) => {
    form.setValue("idea", example);
    setCharCount(example.length);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-card-border">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Lightbulb className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Describe Your Startup Idea
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground max-w-md mx-auto">
            Tell us about your concept, and our AI will generate a comprehensive business validation report in seconds.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="idea"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe your startup idea in detail. What problem does it solve? Who is it for? What makes it unique?"
                        className="min-h-40 resize-none text-base"
                        onChange={(e) => {
                          field.onChange(e);
                          setCharCount(e.target.value.length);
                        }}
                        data-testid="input-idea"
                      />
                    </FormControl>
                    <div className="flex justify-between items-center">
                      <FormMessage />
                      <span className="text-sm text-muted-foreground">
                        {charCount} characters
                      </span>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={isLoading}
                data-testid="button-validate"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    Analyzing Your Idea...
                  </>
                ) : (
                  <>
                    Generate Validation Report
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">
              Try an example:
            </p>
            <div className="space-y-2">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(prompt)}
                  className="w-full text-left p-3 rounded-md bg-muted/50 text-sm text-muted-foreground hover-elevate active-elevate-2 transition-colors"
                  data-testid={`button-example-${index}`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
