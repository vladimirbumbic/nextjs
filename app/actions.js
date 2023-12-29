'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import axios from 'axios';

//roles

export const getRoles = async () => {
  const res = await axios.get('http://localhost:3001/roles', {
    next: { revalidate: 0 },
  });
  return res.data;
};

export const addRole = async (formData) => {
  await new Promise((res) => setTimeout(res, 2000));

  try {
    const roleName = formData.get('roleName');
    const shortDescription = formData.get('shortDescription');

    const response = await axios.get('http://localhost:3001/roles');
    const roles = response.data;

    const isDuplicate = roles.some((role) => role.roleName === roleName);

    if (isDuplicate) {
      throw new Error('Duplicate role name. Please choose a unique role name.');
    }

    // If not a duplicate, add a new role
    await axios.post('http://localhost:3001/roles', {
      id: roles.length + 1,
      roleName: roleName,
      shortDescription: shortDescription,
    });
  } catch (error) {
    console.error('Error adding role:', error.message);
    throw error;
  }

  revalidatePath('/roles');
  redirect('/roles');
};

export const editRole = async (formData, roleId) => {
  await new Promise((res) => setTimeout(res, 2000));

  try {
    const response = await axios.get('http://localhost:3001/roles');
    const roles = response.data;

    const roleIndex = roles.findIndex((role) => role.id.toString() === roleId);

    if (roleIndex !== -1) {
      const roleName = formData.get('roleName');

      const isDuplicate = roles.some(
        (role, index) => index !== roleIndex && role.roleName === roleName
      );

      if (isDuplicate) {
        throw new Error(
          'Duplicate role name. Please choose a unique role name.'
        );
      }

      // Update role information
      roles[roleIndex].roleName = roleName;
      roles[roleIndex].shortDescription = formData.get('shortDescription');

      // Update the roles on the server
      await axios.put(
        `http://localhost:3001/roles/${roleId}`,
        roles[roleIndex]
      );
    } else {
      console.error('Role not found for editing');
    }
  } catch (error) {
    console.error('Error editing role:', error.message);
    throw error;
  }

  revalidatePath(`/roles/${roleId}`);
  redirect('/roles');
};

//users

export const getUsers = async () => {
  const res = await axios.get('http://localhost:3001/users', {
    next: { revalidate: 0 },
  });
  return res.data;
};

export const addUser = async (formData) => {
  await new Promise((res) => setTimeout(res, 2000));

  try {
    const response = await axios.get('http://localhost:3001/users');
    const users = response.data;

    const newUser = {
      id: users.length + 1,
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      roleName: formData.get('roleName'),
      createdAt: new Date().toISOString(),
    };

    const isDuplicate = users.some((user) => user.email === newUser.email);

    if (isDuplicate) {
      throw new Error('Duplicate email. Please use a unique email address.');
    }

    // Update the users on the server
    await axios.post('http://localhost:3001/users', newUser);
  } catch (error) {
    console.error('Error adding user:', error.message);
    throw error;
  }

  revalidatePath('/users');
  redirect('/users');
};

export const updateUser = async (formData, userId) => {
  await new Promise((res) => setTimeout(res, 2000));

  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const roleName = formData.get('roleName');

  try {
    // Fetch the existing user data
    const response = await axios.get(`http://localhost:3001/users/${userId}`);
    const existingUser = response.data;

    // Check for duplicate emails
    const responseAllUsers = await axios.get('http://localhost:3001/users');
    const allUsers = responseAllUsers.data;

    const isDuplicate = allUsers.some(
      (user) => user.email === email && user.id !== existingUser.id
    );

    if (isDuplicate) {
      throw new Error('Duplicate email. Please use a unique email address.');
    }

    // Update the user data
    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.email = email;
    existingUser.roleName = roleName;

    // Update the user
    await axios.put(`http://localhost:3001/users/${userId}`, existingUser);
  } catch (error) {
    console.error('Error updating user:', error.message);
    throw error;
  }

  revalidatePath(`/users/${userId}`);
  redirect('/users');
};
