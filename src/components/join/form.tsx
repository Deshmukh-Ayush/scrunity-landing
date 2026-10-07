"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { submitJoinRequest } from "@/actions/join";
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
import { COUNTRIES } from "@/utils/countries";
import { formSchema, type JoinFormValues } from "@/utils/join-form";

export const Form = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<JoinFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      workEmail: "",
      phoneNumber: "",
      country: undefined,
      companySize: undefined,
      role: undefined,
      anythingElse: "",
    },
  });

  async function onSubmit(values: JoinFormValues) {
    setSubmitError(null);
    try {
      const res = await submitJoinRequest(values);

      if (!res.success) {
        setSubmitError(
          res.error || "Failed to submit request. Please try again.",
        );
        toast.error(res.error || "Failed to submit request. Please try again.");
        return;
      }

      setEmailSent(Boolean(res.emailSent));
      setIsSuccess(true);
      toast.success(res.message || "Request submitted successfully!");
      form.reset();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      console.error("Submission error:", err);
      setSubmitError(message);
      toast.error(message);
    }
  }

  if (isSuccess) {
    return (
      <div className="flex w-full max-w-xl flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white/70 p-8 text-center backdrop-blur-md">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-neutral-900 text-white">
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            className="size-6"
            strokeWidth={2}
          />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900">
          You&apos;re on the list!
        </h3>
        <p className="mt-2 text-sm text-neutral-600">
          {emailSent ? (
            <>
              We&apos;ve sent a confirmation to your email. Our team will review your
              submission and get in touch within <strong>24 hours</strong>.
            </>
          ) : (
            <>
              Thank you for signing up! Our team will review your submission and
              get in touch within <strong>24 hours</strong>.
            </>
          )}
        </p>
        <Button
          type="button"
          className="mt-6 border-neutral-300 bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
          onClick={() => {
            setIsSuccess(false);
            setEmailSent(false);
          }}
        >
          Submit another response
        </Button>
      </div>
    );
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
          <Field data-invalid={!!form.formState.errors.phoneNumber}>
            <FieldLabel htmlFor="phoneNumber">Phone number</FieldLabel>
            <FieldContent>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 (555) 000-0000"
                aria-invalid={!!form.formState.errors.phoneNumber}
                {...form.register("phoneNumber")}
              />
              <FieldError errors={[form.formState.errors.phoneNumber]} />
            </FieldContent>
          </Field>

          <Controller
            control={form.control}
            name="country"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="country">Country</FieldLabel>
                <FieldContent>
                  <Select
                    value={field.value ?? null}
                    onValueChange={(value) =>
                      field.onChange(value ?? undefined)
                    }
                  >
                    <SelectTrigger
                      id="country"
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {COUNTRIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={[fieldState.error]} />
                </FieldContent>
              </Field>
            )}
          />
        </div>

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

        {submitError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {submitError}
          </div>
        )}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="bg-brand border-brand w-full self-start border disabled:cursor-not-allowed disabled:opacity-60"
        >
          {form.formState.isSubmitting ? "Submitting request..." : "Submit request"}
        </Button>
      </FieldGroup>
    </form>
  );
};
