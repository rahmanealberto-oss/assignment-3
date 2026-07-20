"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { addItem } from "@/lib/items";
import type { CategoryValue } from "@/lib/types";
import { CATEGORIES } from "@/lib/categories";
import Button from "./Button";

type FormState = {
  title: string;
  description: string;
  category: CategoryValue;
  wantedInExchange: string;
  contact: string;
};

const INITIAL_STATE: FormState = {
  title: "",
  description: "",
  category: "electronica",
  wantedInExchange: "",
  contact: "",
};

export default function ItemForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }) as FormState);
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
      category: form.category,
      wantedInExchange: form.wantedInExchange.trim(),
      contact: form.contact.trim(),
    });

    router.push("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-soft flex flex-col gap-6 rounded-2xl border border-border bg-surface p-8 md:p-10"
    >
      <Field label="Título del artículo" htmlFor="title">
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

      <Field label="Categoría" htmlFor="category">
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className={inputClasses}
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
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

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit">Publicar artículo</Button>
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
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium uppercase tracking-widest text-muted"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClasses =
  "focus-ring rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-base text-foreground outline-none transition-all duration-200 placeholder:text-muted/60";
