import React, { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import { fetchUsers, fetchUsersByRole, fetchAllRoles } from '../services/userService';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
`;

const Home = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    fetchAllRoles().then(setRoles);
    fetchUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedRole) {
      fetchUsersByRole(selectedRole).then(setUsers);
    } else {
      fetchUsers().then(setUsers);
    }
  }, [selectedRole]);

  return (
    <Container>
      <h1>User List</h1>
      <Select onChange={(e) => setSelectedRole(e.target.value)}>
        <option value="">All Roles</option>
        {roles.map((role) => (
          <option key={role} value={role}>{role}</option>
        ))}
      </Select>
      <Grid>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
