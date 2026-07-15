import ItemForm from "@/components/ItemForm";

export default function PublicarPage() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-6 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Publicar un bien
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Describe lo que quieres intercambiar y qué te gustaría recibir a
          cambio.
        </p>
      </div>

      <ItemForm />
    </div>
  );
}
