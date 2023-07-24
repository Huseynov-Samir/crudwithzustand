import axios from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const crudStore = create(
  immer((set) => ({
    todos: [],
    getMyData: async () => {
      const res = await axios.get("http://localhost:3000/todos");
      set({ todos: await res.data });
    },
    createDataAPI: async (title, body) => {
      const res = await axios.post("http://localhost:3000/todos", {
        id: Math.random,
        text: title,
        body: body,
      });
      set((state) => ({
        todos: [...state.todos, res.data],
      }));
    },
    deleteMyApi: async (id) => {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    },
  }))
);
