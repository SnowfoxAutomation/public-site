"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useState,
  useTransition,
  type FormEvent,
} from "react";
import { useForm } from "react-hook-form";

import {
  submitContact,
  type ContactActionState,
} from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { contactContent } from "@/content/contact";
import {
  contactFieldsSchema,
  type ContactFieldsData,
} from "@/lib/contact/schema";

import { contactFormVariants } from "./ContactForm.variants";
import { Turnstile } from "./Turnstile";

const initialState: ContactActionState = {
  status: "idle",
  message: "",
};

export function ContactForm() {
  const [state, setState] =
    useState<ContactActionState>(initialState);

  const [turnstileKey, setTurnstileKey] =
    useState(0);

  const [pending, startTransition] =
    useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFieldsData>({
    resolver: zodResolver(
      contactFieldsSchema,
    ),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      organization: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const submitValidatedForm =
    handleSubmit((fields, event) => {
      const form =
        event?.currentTarget;

      if (!(form instanceof HTMLFormElement)) {
        setState({
          status: "error",
          message:
            contactContent.form.messages
              .unavailable,
        });

        return;
      }

      const formData = new FormData(form);

      formData.set("name", fields.name);
      formData.set(
        "organization",
        fields.organization,
      );
      formData.set("email", fields.email);
      formData.set("subject", fields.subject);
      formData.set("message", fields.message);

      setState(initialState);

      startTransition(async () => {
        const result = await submitContact(
          initialState,
          formData,
        );

        setState(result);

        if (result.status === "success") {
          reset();
          form.reset();

          setTurnstileKey(
            (currentKey) => currentKey + 1,
          );
        }
      });
    });

  function handleFormSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    void submitValidatedForm(event);
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className={contactFormVariants.form}
      noValidate
    >
      <div className={contactFormVariants.section}>
        <input
          hidden
          aria-hidden="true"
          tabIndex={-1}
          autoComplete="off"
          name="website"
        />

        <div className={contactFormVariants.field}>
          <div className={contactFormVariants.labelRow}>
            <label
              htmlFor="name"
              className={contactFormVariants.label}
            >
              {
                contactContent.form.fields.name
                  .label
              }{" "}
              <span
                aria-hidden="true"
                className={
                  contactFormVariants.required
                }
              >
                {
                  contactContent.form
                    .requiredIndicator
                }
              </span>
            </label>
          </div>

          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={
              contactContent.form.fields.name
                .placeholder
            }
            aria-required="true"
            aria-invalid={
              errors.name ? true : undefined
            }
            aria-describedby={
              errors.name
                ? "name-error"
                : undefined
            }
            className={contactFormVariants.input}
            disabled={pending}
            {...register("name")}
          />

          {errors.name ? (
            <p
              id="name-error"
              role="alert"
              className={
                contactFormVariants.fieldError
              }
            >
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className={contactFormVariants.field}>
          <div className={contactFormVariants.labelRow}>
            <label
              htmlFor="organization"
              className={contactFormVariants.label}
            >
              {
                contactContent.form.fields
                  .organization.label
              }
            </label>

            <span
              className={
                contactFormVariants.optional
              }
            >
              {
                contactContent.form.fields
                  .organization.optionalLabel
              }
            </span>
          </div>

          <input
            id="organization"
            type="text"
            autoComplete="organization"
            placeholder={
              contactContent.form.fields
                .organization.placeholder
            }
            aria-invalid={
              errors.organization
                ? true
                : undefined
            }
            aria-describedby={
              errors.organization
                ? "organization-error"
                : undefined
            }
            className={contactFormVariants.input}
            disabled={pending}
            {...register("organization")}
          />

          {errors.organization ? (
            <p
              id="organization-error"
              role="alert"
              className={
                contactFormVariants.fieldError
              }
            >
              {errors.organization.message}
            </p>
          ) : null}
        </div>

        <div className={contactFormVariants.field}>
          <div className={contactFormVariants.labelRow}>
            <label
              htmlFor="email"
              className={contactFormVariants.label}
            >
              {
                contactContent.form.fields.email
                  .label
              }{" "}
              <span
                aria-hidden="true"
                className={
                  contactFormVariants.required
                }
              >
                {
                  contactContent.form
                    .requiredIndicator
                }
              </span>
            </label>
          </div>

          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            placeholder={
              contactContent.form.fields.email
                .placeholder
            }
            aria-required="true"
            aria-invalid={
              errors.email ? true : undefined
            }
            aria-describedby={
              errors.email
                ? "email-error"
                : undefined
            }
            className={contactFormVariants.input}
            disabled={pending}
            {...register("email")}
          />

          {errors.email ? (
            <p
              id="email-error"
              role="alert"
              className={
                contactFormVariants.fieldError
              }
            >
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className={contactFormVariants.field}>
          <div className={contactFormVariants.labelRow}>
            <label
              htmlFor="subject"
              className={contactFormVariants.label}
            >
              {
                contactContent.form.fields.subject
                  .label
              }{" "}
              <span
                aria-hidden="true"
                className={
                  contactFormVariants.required
                }
              >
                {
                  contactContent.form
                    .requiredIndicator
                }
              </span>
            </label>
          </div>

          <input
            id="subject"
            type="text"
            placeholder={
              contactContent.form.fields.subject
                .placeholder
            }
            aria-required="true"
            aria-invalid={
              errors.subject ? true : undefined
            }
            aria-describedby={
              errors.subject
                ? "subject-error"
                : undefined
            }
            className={contactFormVariants.input}
            disabled={pending}
            {...register("subject")}
          />

          {errors.subject ? (
            <p
              id="subject-error"
              role="alert"
              className={
                contactFormVariants.fieldError
              }
            >
              {errors.subject.message}
            </p>
          ) : null}
        </div>

        <div className={contactFormVariants.field}>
          <div className={contactFormVariants.labelRow}>
            <label
              htmlFor="message"
              className={contactFormVariants.label}
            >
              {
                contactContent.form.fields.message
                  .label
              }{" "}
              <span
                aria-hidden="true"
                className={
                  contactFormVariants.required
                }
              >
                {
                  contactContent.form
                    .requiredIndicator
                }
              </span>
            </label>
          </div>

          <textarea
            id="message"
            rows={8}
            placeholder={
              contactContent.form.fields.message
                .placeholder
            }
            aria-required="true"
            aria-invalid={
              errors.message ? true : undefined
            }
            aria-describedby={
              errors.message
                ? "message-error message-guidance"
                : "message-guidance"
            }
            className={
              contactFormVariants.textarea
            }
            disabled={pending}
            {...register("message")}
          />

          {errors.message ? (
            <p
              id="message-error"
              role="alert"
              className={
                contactFormVariants.fieldError
              }
            >
              {errors.message.message}
            </p>
          ) : null}

          <p
            id="message-guidance"
            className={contactFormVariants.helper}
          >
            {
              contactContent.form.fields.message
                .guidance
            }
          </p>
        </div>

        <Turnstile
          key={turnstileKey}
          disabled={pending}
        />
      </div>

      <div className={contactFormVariants.footer}>
        <Button
          type="submit"
          size="large"
          disabled={pending}
          aria-disabled={pending}
          className={contactFormVariants.submit}
        >
          {pending
            ? contactContent.form.pendingLabel
            : contactContent.form.submitLabel}
        </Button>

        {state.status !== "idle" ? (
          <p
            role={
              state.status === "error"
                ? "alert"
                : "status"
            }
            aria-live="polite"
            className={[
              contactFormVariants.status,
              state.status === "success"
                ? contactFormVariants.success
                : contactFormVariants.error,
            ].join(" ")}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}