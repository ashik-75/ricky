import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { deleteUser } from "./actions";

function DeleteUser({ email }: { email: string }) {
  const queryClient = useQueryClient();

  const { data, isSuccess, mutate } = useMutation({
    mutationFn: (email) => deleteUser(email!),
    onMutate: (newData) => {
      queryClient.cancelQueries(["users"]);

      const previousData = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (old: any) =>
        old.filter((dt: any) => dt.email !== email)
      );

      return { previousData };
    },
    onSettled: (data, error, variables, context) => {
      if (error) {
        queryClient.setQueriesData(["users"], context?.previousData);
      } else {
        queryClient.invalidateQueries(["users"]);
      }
    },
  });

  return (
    <button
      // @ts-expect-error
      onClick={() => mutate(email)}
      className="absolute right-2 top-2 hidden group-hover:block"
    >
      <X className="h-5 w-5" />
    </button>
  );
}

export default DeleteUser;
