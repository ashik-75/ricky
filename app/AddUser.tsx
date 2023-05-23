"use client";

import Loader from "@/components/Loader/Loader";
import { User } from "@prisma/client";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import { addUser, getUsers, updateUser } from "./actions";

function AddUser() {
  const queryClient = useQueryClient();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [edit, setEdit] = useState(false);

  // infinite scrolling
  const {
    fetchNextPage,
    data: D,
    isError: getIsError,
    error: getError,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["notes"],
    queryFn: ({ pageParam }) => {
      console.log({ pageParam });
      return getUsers(pageParam);
    },
    getNextPageParam: (lastPage) => {
      console.log({ lastPage });

      return lastPage.cursor;
    },
  });

  console.log({ D, getIsError, getError, hasNextPage });

  const users = D?.pages.map((d) => d.users).flat() || [];

  // update Note

  const {
    mutate: updateMutation,
    data: updateData,
    isError: upisError,
    error: UpError,
  } = useMutation({
    mutationFn: (payload) => updateUser(payload!),
    onMutate: (newDocument: User) => {
      queryClient.cancelQueries(["users"]);
      const previousData = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (old: any) => {
        return old.map((dt: any) =>
          dt.email === newDocument.email ? { ...dt, ...newDocument } : { ...dt }
        );
      });

      return { previousData };
    },
    onSettled: (data, error, variable, context) => {
      if (error) {
        queryClient.setQueryData(["users"], context?.previousData);
      } else {
        queryClient.invalidateQueries(["users"]);
      }
    },
  });

  // add user
  const { data, mutate, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: (payload: User) => {
      return addUser(payload);
    },

    onMutate: async (newTodo) => {
      queryClient.cancelQueries({
        queryKey: ["users"],
      });

      const previousData = queryClient.getQueryData(["users"]);

      console.log({ previousData });

      queryClient.setQueryData(["users"], (old: any) => {
        console.log("OLD: ", old, "NewTODO: ", newTodo);
        return [...old, newTodo];
      });

      return { previousData };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["users"], () => context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (user.email && user.name) {
      if (edit) {
        console.log("ENTER");
        // @ts-expect-error
        updateMutation(user);
        setEdit(false);
      } else {
        // @ts-expect-error
        mutate(user);
      }

      setUser({
        name: "",
        email: "",
      });
    }
  };

  if (false) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-5">
        <div>
          <input
            onChange={handleChange}
            value={user.email}
            name="email"
            type="email"
            className="px-4 py-2 rounded border bg-transparent border-slate-500"
          />
        </div>
        <div>
          <input
            value={user.name}
            onChange={handleChange}
            name="name"
            type="text"
            className="px-4 py-2 rounded border bg-transparent border-slate-500"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded border-slate-500 border text-white shadow font-medium"
        >
          {edit ? "Update" : "Add"}
        </button>
      </form>

      {/* @ts-expect-error */}
      {isError && <div>{error.message}</div>}

      <ul className="grid grid-cols-4 gap-5 mt-5">
        {users?.map((user) => (
          <li
            key={user.id}
            className="group bg-slate-900 grou relative p-4 rounded hover:bg-slate-700"
          >
            <div className="space-y-1">
              <h1 className="font-bold text-xl">{user.name}</h1>
              <h1>{user.email}</h1>
            </div>

            <DeleteUser email={user.email} />
            <EditUser setEdit={setEdit} payload={user} setUser={setUser} />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <div className="flex justify-center items-center">
          <button
            disabled={!hasNextPage}
            onClick={() => fetchNextPage()}
            className="px-4 py-2 rounded border border-gray-500"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default AddUser;
