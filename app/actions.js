'use server';
import db from '../_data/db.json';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const addUser = async (formData) => {
  await new Promise((res) => setTimeout(res, 2000));
  const newUser = {
    id: db.users.length + 1,
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    roleName: formData.get('roleName'),
    createdAt: new Date().toISOString(),
  };
  db.users.push(newUser);
  console.log(db.users);
  revalidatePath('/users');
  redirect('/users');
};

export const addRole = async (formData) => {
  const roleName = formData.get('roleName');
  const shortDescription = formData.get('shortDescription');

  const isDuplicate = db.roles.some((role) => role.roleName === roleName);

  if (isDuplicate) {
    throw new Error('Duplicate role name. Please choose a unique role name.');
  }

  // If not a duplicate, add a new role
  await new Promise((res) => setTimeout(res, 2000));

  const role = {
    id: db.roles.length + 1,
    roleName: roleName,
    shortDescription: shortDescription,
  };

  db.roles.push(role);

  revalidatePath('/roles');

  redirect('/roles');
};

export const updateUser = async (formData, userId) => {
  await new Promise((res) => setTimeout(res, 2000));

  const existingUser = db.users.find((user) => user.id === parseInt(userId));

  if (existingUser) {
    existingUser.firstName = formData.get('firstName');
    existingUser.lastName = formData.get('lastName');
    existingUser.email = formData.get('email');
    existingUser.roleName = formData.get('roleName');
  }
  db.users = db.users.map((user) =>
    user.id === existingUser.id ? existingUser : user
  );
  console.log(existingUser);

  revalidatePath(`/users/${userId}`);
  redirect('/users');
};

export const editRole = async (formData, roleId) => {
  await new Promise((res) => setTimeout(res, 2000));

  const roleIndex = db.roles.findIndex((role) => role.id.toString() === roleId);
  if (roleIndex !== -1) {
    const roleName = formData.get('roleName');

    const isDuplicate = db.roles.some(
      (role, index) => index !== roleIndex && role.roleName === roleName
    );

    if (isDuplicate) {
      throw new Error('Duplicate role name. Please choose a unique role name.');
    }

    // Update role information
    db.roles[roleIndex].roleName = roleName;
    db.roles[roleIndex].shortDescription = formData.get('shortDescription');

    revalidatePath(`/roles/${roleId}`);
    redirect('/roles');
  } else {
    console.error('Role not found for editing');
  }
};
