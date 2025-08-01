import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserShield } from "react-icons/fa";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Mutation: Make Admin
  const makeAdminMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.patch(`/users/admin/${userId}`);
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire("Success", data.message, "success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to make admin",
        "error"
      );
    },
  });

  // Mutation: Remove Admin
  const removeAdminMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.patch(`/users/remove-admin/${userId}`);
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire("Success", data.message, "success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to remove admin",
        "error"
      );
    },
  });

  // Loading UI
  if (isLoading) return <p className="text-center text-lg">Loading users...</p>;

  // Helper to disable buttons while mutation runs
  const isMutating =
    makeAdminMutation.isLoading || removeAdminMutation.isLoading;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaUserShield />
        Admin Management
      </h2>
      <table className="w-full table-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border px-4 py-2 text-left">{user.email}</td>
              <td className="border px-4 py-2 capitalize">{user.role}</td>
              <td className="border px-4 py-2">
                {user.role !== "admin" ? (
                  <button
                    onClick={() => makeAdminMutation.mutate(user._id)}
                    disabled={isMutating}
                    className="btn btn-sm btn-primary text-black"
                  >
                    Make Admin
                  </button>
                ) : (
                  <button
                    onClick={() => removeAdminMutation.mutate(user._id)}
                    disabled={isMutating}
                    className="btn btn-sm btn-error text-black"
                  >
                    Remove Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MakeAdmin;
