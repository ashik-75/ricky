import { Edit } from "lucide-react";

function EditUser({ payload, setUser, setEdit }: any) {
  const handleEditClick = () => {
    setUser({
      name: payload.name,
      email: payload.email,
    });

    setEdit(true);
  };
  return (
    <div className="absolute right-2 bottom-2">
      <button onClick={handleEditClick}>
        <Edit className="h-5 w-5" />
      </button>
    </div>
  );
}

export default EditUser;
