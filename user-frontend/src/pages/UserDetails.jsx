import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../services/userService';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserById(id).then(setUser);
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Avatar src={user.image} alt={user.firstName} />
      <h2>{user.firstName} {user.lastName}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Role: {user.role}</p>
      <p>Company: {user.company?.name}</p>
      <p>Department: {user.company?.department}</p>
    </Container>
  );
};

export default UserDetails;
