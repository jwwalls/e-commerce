import React from 'react'

async function DeletePost(id){
  const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
  });
  const result = await response.json()
  return result;
}

export default DeletePost