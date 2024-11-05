export interface Todo {
  id: number;
  user_id: string;
  task: string;
  is_complete: boolean;
  inserted_at: Date;
}

export interface Note {
  id: number;
  user_id: string;
  thought: string;
  inserted_at: Date;
}
