export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoRequestBody {
  title: string;
  color: string;
  completed?: boolean;
}

export interface InsertResult {
  insertId: number;
}

export interface TableCheckResult {
  tableExists: number;
}

export interface DeleteTodoResult {
  message: string;
  id: number;
}
