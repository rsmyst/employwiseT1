import React from "react";

interface UserCardProps {
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  animate: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  animate,
}) => {
  return (
    <div
      className={`card ${
        animate ? "animate-fade-in" : ""
      } transition-transform transform hover:scale-120 rounded-lg`}
    >
      <img src={user.avatar} alt={user.first_name} className="w-full" />
      <div className="p-4">
        <h2 className="text-lg font-bold">
          {user.first_name} {user.last_name}
        </h2>
        <p className="break-words overflow-hidden text-sm">{user.email}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => onEdit(user.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
