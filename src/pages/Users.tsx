import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../services/api";
import { useAuth } from "../context/useAuth";
import UserCard from "../components/UserCard";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [animateCards, setAnimateCards] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastUserElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  useEffect(() => {
    if (users.length > 0) {
      setTimeout(() => {
        setAnimateCards(true);
      }, 100);
    }
  }, [users]);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const response: UserResponse = await getUsers(page);

      setUsers((prevUsers) => {
        // Avoid duplicate users when page is reset
        if (page === 1) {
          return [...response.data];
        }
        return [...prevUsers, ...response.data];
      });

      setHasMore(page < response.total_pages);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (userId: number) => {
    navigate(`/users/${userId}/edit`);
  };

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      showNotification("User deleted successfully.", "success");
    } catch (err) {
      showNotification("Failed to delete user.", "error");
      console.error("Error deleting user:", err);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Reset to first page when searching
    if (e.target.value === "" && filteredUsers.length === 0) {
      fetchUsers(1);
    } else {
      setCurrentPage(1);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {notification && (
        <div
          className={`alert ${
            notification.type === "success" ? "alert-success" : "alert-error"
          }`}
        >
          {notification.message}
        </div>
      )}

      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 mb-4 w-full rounded-md"
      />

      {error && <p className="text-red-500">{error}</p>}

      {loading && users.length === 0 && (
        <div className="flex items-center justify-center my-8">
          <div className="spinner border-t-4 border-blue-500 border-solid rounded-full h-12 w-12 animate-spin"></div>
        </div>
      )}

      {!loading && searchTerm && filteredUsers.length === 0 && (
        <div className="text-center py-8">
          <div className="bg-gray-100 rounded-lg p-6 inline-block animate-fade-in">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No Results Found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              No users match your search criteria.
            </p>
          </div>
        </div>
      )}

      {filteredUsers.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredUsers.map((user, index) => {
            if (filteredUsers.length === index + 1) {
              return (
                <div key={user.id} ref={lastUserElementRef}>
                  <UserCard
                    user={user}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    animate={animateCards}
                  />
                </div>
              );
            } else {
              return (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  animate={animateCards}
                />
              );
            }
          })}
        </div>
      )}

      {loading && users.length > 0 && (
        <div className="flex items-center justify-center mt-6">
          <div className="spinner border-t-4 border-blue-500 border-solid rounded-full h-8 w-8 animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Users;
