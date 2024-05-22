import React, { useEffect, useState } from 'react';

import { UserDto } from '../../api/dto/user.dto';
import { useApi } from '../../api/ApiProvider';
import MenuAppBar from '../../app-bar/MenuAppBar';
import UserItem from './UserItem';

function Users() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const apiClient = useApi();

  useEffect(() => {
    async function fetchUsers() {
      const response = await apiClient.getUsers();
      if (response.success) {
        setUsers(response.data);
      }
    }

    fetchUsers();
  }, [apiClient]);

  async function deleteUser(id: number) {
    const response = await apiClient.deleteUser(id);
    if (response.success) {
      setUsers(users.filter((user) => user.id !== id));
    }
  }

  return (
    <div>
      <MenuAppBar />
      <h1>Users</h1>
      {users.map((user) => (
        <UserItem key={user.id} user={user} deleteUser={deleteUser} />
      ))}
    </div>
  );
}

export default Users;
