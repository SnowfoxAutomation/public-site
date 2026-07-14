"use client";

import {
  useActionState,
  useEffect,
  useRef,
} from "react";

import {
  submitContact,
  type ContactActionState,
} from "@/app/actions/contact";

import { Button } from "@/components/ui/button";

import { contactFormVariants } from "./ContactForm.variants";
import { Turnstile } from "./Turnstile";

const initialState: ContactActionState = {
  status: "idle",
  message: "",
};

export function ContactForm() {
  const [state, action, pending] =
    useActionState(
      submitContact,
      initialState,
    );

  const formStartedAtRef =
    useRef<HTMLInputElement>(null);

  const formRef =
    useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formStartedAtRef.current) {
      formStartedAtRef.current.value = String(
        Date.now(),
      );
    }
  }, []);

  useEffect(() => {
    if (state.status !== "success") {
      return;
    }

    formRef.current?.reset();

    if (formStartedAtRef.current) {
      formStartedAtRef.current.value = String(
        Date.now(),
      );
    }
  }, [state.status]);

  return (
    <form
      ref={formRef}
      action={action}
      className={contactFormVariants.form}
    >
      <input
        ref={formStartedAtRef}
        type="hidden"
        name="formStartedAt"
      />

      <input
        hidden
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        name="website"
      />

      <div className={contactFormVariants.field}>
        <label
          htmlFor="name"
          className={contactFormVariants.label}
        >
          Name{" "}
          <span className={contactFormVariants.required}>
            *
          </span>
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          className={contactFormVariants.input}
          disabled={pending}
        />
      </div>

      <div className={contactFormVariants.field}>
        <label
          htmlFor="organization"
          className={contactFormVariants.label}
        >
          Organization
        </label>

        <input
          id="organization"
          name="organization"
          type="text"
          maxLength={120}
          autoComplete="organization"
          className={contactFormVariants.input}
          disabled={pending}
        />
      </div>

      <div className={contactFormVariants.field}>
        <label
          htmlFor="email"
          className={contactFormVariants.label}
        >
          Email{" "}
          <span className={contactFormVariants.required}>
            *
          </span>
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={320}
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          className={contactFormVariants.input}
          disabled={pending}
        />
      </div>

      <div className={contactFormVariants.field}>
        <label
          htmlFor="subject"
          className={contactFormVariants.label}
        >
          Subject{" "}
          <span className={contactFormVariants.required}>
            *
          </span>
        </label>

        <input
          id="subject"
          name="subject"
          type="text"
          required
          minLength={3}
          maxLength={120}
          className={contactFormVariants.input}
          disabled={pending}
        />
      </div>

      <div className={contactFormVariants.field}>
        <label
          htmlFor="message"
          className={contactFormVariants.label}
        >
          Message{" "}
          <span className={contactFormVariants.required}>
            *
          </span>
        </label>

        <textarea
          id="message"
          name="message"
          rows={8}
          required
          minLength={20}
          maxLength={5000}
          className={contactFormVariants.textarea}
          disabled={pending}
        />

        <p className={contactFormVariants.helper}>
          Do not include classified, protected or
          operationally sensitive information.
        </p>
      </div>

      <Turnstile disabled={pending} />

      <div className={contactFormVariants.footer}>
        <Button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
        >
          {pending
            ? "Sending..."
            : "Send Message"}
        </Button>

        {state.status !== "idle" ? (
          <p
            role={
              state.status === "error"
                ? "alert"
                : "status"
            }
            aria-live="polite"
            className={
              contactFormVariants.message[
                state.status
              ]
            }
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}