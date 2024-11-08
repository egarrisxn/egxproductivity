"use server";
import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Todo, Note, Event } from "@/lib/types";

//! TODOS

export async function fetchTodos(): Promise<Todo[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("todos").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export async function addTodo(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("todos")
    .insert([
      {
        user_id: user?.id,
        task: formData.get("task") as string,
        is_complete: false,
        inserted_at: new Date(),
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function editTodo(todo: Todo) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("todos")
    .update({ task: todo.task })
    .eq("id", todo.id)
    .eq("user_id", user?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteTodo(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function deleteCompletedTodos() {
  const supabase = await createClient();

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("is_complete", true);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function deleteAllTodos() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("user_id", user?.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function onCheckChange(todo: Todo) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("todos")
    .update({ is_complete: !todo?.is_complete })
    .eq("id", todo?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

//! NOTES

export async function addNote(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("notes")
    .insert([
      {
        user_id: user?.id,
        thought: formData.get("thought") as string,
        inserted_at: new Date(),
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function editNote(note: Note) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("notes")
    .update({ thought: note.thought })
    .eq("id", note.id)
    .eq("user_id", user?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteNote(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

//! CALENDAR EVENTS

export async function getEvents(date: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("date", date)
    .eq("user_id", user?.id)
    .order("time", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data;
}

export async function addEvent(
  title: string,
  description: string,
  time: string,
  date: string,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("events")
    .insert({ user_id: user?.id, title, description, time, date })
    .select();

  if (error) {
    console.error("Error adding event:", error);
    return null;
  }

  return data[0];
}

export async function updateEvent(
  id: number,
  title: string,
  description: string,
  time: string,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("events")
    .update({ title, description, time })
    .eq("id", id)
    .eq("user_id", user?.id)
    .select();

  if (error) {
    console.error("Error updating event:", error);
    return null;
  }

  return data[0];
}

export async function deleteEvent(id: number) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id)
    .eq("user_id", user?.id);

  if (error) {
    console.error("Error deleting event:", error);
    return false;
  }

  return true;
}

//! AUTHENTICATION

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/login", error.message);
  }

  //! See if this is necessary or not
  revalidatePath("/", "layout");
  return redirect("/protected");
}

export async function signup(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
}

export async function forgotPassword(formData: FormData) {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
}
