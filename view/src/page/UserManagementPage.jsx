/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Save,
  AlertCircle,
  X,
  Shield,
  User,
  Briefcase,
} from "lucide-react";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("all");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define available roles
  const ROLES = {
    admin: { label: "Admin", icon: Shield, color: "text-purple-600" },
    user: { label: "User", icon: User, color: "text-blue-600" },
    employee: { label: "Employee", icon: Briefcase, color: "text-green-600" },
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5173/api/v1/user/alluser"
        );
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();

        const userArray = data.users?.data || [];
        const transformedUsers = userArray.map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role.toLowerCase().trim(), // Ensure role is lowercase and trimmed
          image: user.photo,
          active: true,
          createdAt: new Date(user.createdAt).toLocaleDateString(),
        }));

        setUsers(transformedUsers);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleUpdate = async () => {
    if (!selectedUser || !newRole || !Object.keys(ROLES).includes(newRole))
      return;

    try {
      const response = await fetch(
        `http://localhost:5173/api/v1/user/${selectedUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!response.ok) throw new Error("Failed to update user");

      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, role: newRole } : user
        )
      );
      setUpdateModalOpen(false);
      setSelectedUser(null);
      setNewRole("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(
        `http://localhost:5173/api/v1/user/${selectedUser.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete user");

      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const RoleTag = ({ role }) => {
    const roleInfo = ROLES[role] || {
      label: "Unknown",
      icon: User,
      color: "text-gray-600",
    };
    const Icon = roleInfo.icon;

    return (
      <div className={`inline-flex items-center gap-1.5 ${roleInfo.color}`}>
        <Icon size={16} />
        <span>{roleInfo.label}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="text-red-500" />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Users Management Dashboard
          </h1>
          <p className="text-xl text-gray-600">Manage and monitor all users</p>
        </div>

        {/* Role Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Object.entries(ROLES).map(([role, info]) => {
            const count = users.filter((user) => user.role === role).length;
            const Icon = info.icon;
            return (
              <div key={role} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total {info.label}s</p>
                    <p className="text-2xl font-bold mt-1">{count}</p>
                  </div>
                  <Icon className={`${info.color} w-8 h-8`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  {Object.entries(ROLES).map(([role, info]) => (
                    <option key={role} value={role}>
                      {info.label}s
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Joined Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={
                            user.image === "default.jpg"
                              ? "/api/placeholder/40/40"
                              : user.image
                          }
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="ml-3 font-medium text-gray-900">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setNewRole(user.role);
                          setUpdateModalOpen(true);
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
                      >
                        <RoleTag role={user.role} />
                        <Save size={16} className="text-gray-400" />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.createdAt}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setDeleteModalOpen(true);
                        }}
                        className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={10}>10 rows</option>
                  <option value={20}>20 rows</option>
                  <option value={50}>50 rows</option>
                </select>
                <ChevronDown
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Role Modal */}
      {updateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setUpdateModalOpen(false)}
          />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Update User Role
                </h3>
                <button
                  onClick={() => setUpdateModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select New Role
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                    >
                      {Object.entries(ROLES).map(([role, info]) => (
                        <option key={role} value={role}>
                          {info.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setUpdateModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRoleUpdate}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Update Role
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setDeleteModalOpen(false)}
          />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete User
                </h3>
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                  <AlertCircle className="text-red-500" size={24} />
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      Are you sure you want to delete this user?
                    </p>
                    <p className="text-sm text-red-600 mt-1">
                      This action cannot be undone. The user will lose all
                      access to the system.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setDeleteModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
