"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { addItem } from "@/lib/items";
import Button from "./Button";

type FormState = {
  title: string;
  description: string;
  wantedInExchange: string;
  imageUrl: string;
  contact: string;
};

const INITIAL_STATE: FormState = {
  title: "",
  description: "",
  wantedInExchange: "",
  imageUrl: "",
  contact: "",
};

export default function ItemForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim() || !form.wantedInExchange.trim()) {
      setError("Completa el título, la descripción y qué buscas a cambio.");
      return;
    }

    addItem({
      title: form.title.trim(),
      description: form.description.trim(),
      wantedInExchange: form.wantedInExchange.trim(),
      imageUrl: form.imageUrl.trim(),
      contact: form.contact.trim(),
    });

    router.push("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <Field label="Título del bien" htmlFor="title">
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Ej. Bicicleta de montaña rodada 26"
          className={inputClasses}
        />
      </Field>

      <Field label="Descripción" htmlFor="description">
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Cuenta el estado, la marca, hace cuánto lo tienes, etc."
          rows={4}
          className={inputClasses}
        />
      </Field>

      <Field label="¿Qué buscas a cambio?" htmlFor="wantedInExchange">
        <input
          id="wantedInExchange"
          name="wantedInExchange"
          type="text"
          value={form.wantedInExchange}
          onChange={handleChange}
          placeholder="Ej. Guitarra acústica o audífonos"
          className={inputClasses}
        />
      </Field>

      <Field label="URL de una imagen (opcional)" htmlFor="imageUrl">
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://..."
          className={inputClasses}
        />
      </Field>

      <Field label="Cómo contactarte (opcional)" htmlFor="contact">
        <input
          id="contact"
          name="contact"
          type="text"
          value={form.contact}
          onChange={handleChange}
          placeholder="Correo, teléfono o usuario de red social"
          className={inputClasses}
        />
      </Field>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit">Publicar bien</Button>
        <Button href="/" variant="secondary">
          Cancelar
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClasses =
  "rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-50";
