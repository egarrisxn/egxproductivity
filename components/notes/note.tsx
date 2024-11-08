import NoteData from "./note-data";
import DeleteNote from "./delete-note";
import { editNote } from "@/app/actions";
import type { Note } from "@/lib/interface";

export default async function Note({ note }: { note: Note }) {
  return (
    <div className="flex items-center gap-2">
      <form
        className="flex-1 flex items-center gap-2"
        action={async () => {
          "use server";

          await editNote(note);
        }}
      >
        <NoteData note={note} />
      </form>
      <DeleteNote id={note.id} />
    </div>
  );
}
