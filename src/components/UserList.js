import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";

const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setUsers(data.data);
        setFilteredUsers(data.data);
        setTotalPages(data.total_pages);
      });
  }, [page]);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <div className="p-5">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-52 p-2 mb-4 border rounded-lg"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} setUsers={setUsers} users={users} />
        ))}
      </div>
      
      <div className="flex justify-center mt-5 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${page === index + 1 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
