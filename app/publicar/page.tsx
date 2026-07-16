import ItemForm from "@/components/ItemForm";

export default function PublicarPage() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-10 px-6 py-16">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          Nuevo artículo
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
          Publicar un artículo
        </h1>
        <p className="text-sm text-muted">
          Describe lo que quieres intercambiar y qué te gustaría recibir a
          cambio.
        </p>
      </div>

      <ItemForm />
    </div>
  );
}
