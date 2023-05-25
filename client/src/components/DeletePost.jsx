import React from 'react';

const DeletePost = ({ id, userId }) => {
  const handleDelete = async () => {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userId}`,
      },
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <button onClick={handleDelete}>Delete Post</button>
  );
};

export default DeletePost;