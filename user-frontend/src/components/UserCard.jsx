import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 10px;
  width: 250px;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const UserCard = ({ user }) => {
  return (
    <Card>
      <Avatar src={user.image} alt={user.firstName} />
      <h3>{user.firstName} {user.lastName}</h3>
      <p>Role: {user.role}</p>
      <Link to={`/user/${user.id}`}>View Details</Link>
    </Card>
  );
};

export default UserCard;
