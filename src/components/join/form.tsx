"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/utility/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formSchema, type JoinFormValues } from "@/utils/join-form";

export const Form = () => {
  const form = useForm<JoinFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      workEmail: "",
      companySize: undefined,
      role: undefined,
      anythingElse: "",
    },
  });

  function onSubmit(values: JoinFormValues) {
    console.log(values);
  }

  return (
    <form className="w-full max-w-xl" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!form.formState.errors.firstName}>
            <FieldLabel htmlFor="firstName">First name</FieldLabel>
            <FieldContent>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                aria-invalid={!!form.formState.errors.firstName}
                {...form.register("firstName")}
              />
              <FieldError errors={[form.formState.errors.firstName]} />
            </FieldContent>
          </Field>

          <Field data-invalid={!!form.formState.errors.lastName}>
            <FieldLabel htmlFor="lastName">Last name</FieldLabel>
            <FieldContent>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                aria-invalid={!!form.formState.errors.lastName}
                {...form.register("lastName")}
              />
              <FieldError errors={[form.formState.errors.lastName]} />
            </FieldContent>
          </Field>
        </div>

        <Field data-invalid={!!form.formState.errors.companyName}>
          <FieldLabel htmlFor="companyName">Company name</FieldLabel>
          <FieldContent>
            <Input
              id="companyName"
              placeholder="Enter your company name"
              aria-invalid={!!form.formState.errors.companyName}
              {...form.register("companyName")}
            />
            <FieldError errors={[form.formState.errors.companyName]} />
          </FieldContent>
        </Field>

        <Field data-invalid={!!form.formState.errors.workEmail}>
          <FieldLabel htmlFor="workEmail">Work email</FieldLabel>
          <FieldContent>
            <Input
              id="workEmail"
              type="email"
              placeholder="you@company.com"
              aria-invalid={!!form.formState.errors.workEmail}
              {...form.register("workEmail")}
            />
            <FieldError errors={[form.formState.errors.workEmail]} />
          </FieldContent>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Controller
            control={form.control}
            name="companySize"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="companySize">Company size</FieldLabel>
                <FieldContent>
                  <Select
                    value={field.value ?? null}
                    onValueChange={(value) =>
                      field.onChange(value ?? undefined)
                    }
                  >
                    <SelectTrigger
                      id="companySize"
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 people</SelectItem>
                      <SelectItem value="2-5">2-5 people</SelectItem>
                      <SelectItem value="5+">5+ people</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError errors={[fieldState.error]} />
                </FieldContent>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="role"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="role">Your role</FieldLabel>
                <FieldContent>
                  <Select
                    value={field.value ?? null}
                    onValueChange={(value) =>
                      field.onChange(value ?? undefined)
                    }
                  >
                    <SelectTrigger
                      id="role"
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="founder">Founder</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="customer support">
                        Customer support
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError errors={[fieldState.error]} />
                </FieldContent>
              </Field>
            )}
          />
        </div>

        <Field data-invalid={!!form.formState.errors.anythingElse}>
          <FieldLabel htmlFor="anythingElse">Anything else?</FieldLabel>
          <FieldContent>
            <Textarea
              id="anythingElse"
              placeholder="Tell us anything else you'd like to add"
              aria-invalid={!!form.formState.errors.anythingElse}
              {...form.register("anythingElse")}
            />
            <FieldDescription>
              Optional, up to 1000 characters.
            </FieldDescription>
            <FieldError errors={[form.formState.errors.anythingElse]} />
          </FieldContent>
        </Field>

        <Button
          type="submit"
          className="bg-brand border-brand w-full self-start border"
        >
          Submit request
        </Button>
      </FieldGroup>
    </form>
  );
};
