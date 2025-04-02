import React, { useState } from "react";

const UserCard = ({ user, setUsers, users }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ first_name: user.first_name, last_name: user.last_name, email: user.email });

  const handleDelete = async (id) => {
    const response = await fetch(`https://reqres.in/api/users/${id}`, { method: "DELETE" });
    if (response.ok) {
      alert("User deleted successfully!");
      setUsers(users.filter(user => user.id !== id));
    } else {
      alert("Failed to delete user.");
    }
  };

  const handleUpdate = async () => {
    const response = await fetch(`https://reqres.in/api/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser)
    });
    if (response.ok) {
      alert("User updated successfully!");
      setUsers(users.map(u => (u.id === user.id ? { ...u, ...updatedUser } : u)));
      setIsEditing(false);
    } else {
      alert("Failed to update user.");
    }
  };

  return (
    <div className="border p-4 rounded shadow bg-gradient-to-br from-blue-300 to-purple-700 text-white">
      <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full border-2 border-white" />
      {isEditing ? (
        <div>
          <input type="text" value={updatedUser.first_name} onChange={(e) => setUpdatedUser({ ...updatedUser, first_name: e.target.value })} className="text-black p-1 rounded mb-1" />
          <input type="text" value={updatedUser.last_name} onChange={(e) => setUpdatedUser({ ...updatedUser, last_name: e.target.value })} className="text-black p-1 rounded mb-1" />
          <input type="email" value={updatedUser.email} onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })} className="text-black p-1 rounded mb-1" />
        </div>
      ) : (
        <>
          <h2 className="font-semibold text-lg">{user.first_name} {user.last_name}</h2>
          <p>{user.email}</p>
        </>
      )}
      <div className="mt-2">
        {isEditing ? (
          <button className="bg-green-500 text-white p-1 rounded mr-2" onClick={handleUpdate}>Update</button>
        ) : (
          <button className="bg-yellow-500 text-white p-1 rounded mr-2" onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button className="bg-red-500 text-white p-1 rounded" onClick={() => handleDelete(user.id)}>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;