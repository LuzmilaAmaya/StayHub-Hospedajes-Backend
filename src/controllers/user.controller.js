import {
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  toggleUserStatusService,
  changeUserRoleService,
} from "../services/user.service.js";

export const getUsers = async (req, res) => {
  try {
    const users = await getUsersService();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({
      message: "Usuario no encontrado",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await updateUserService(
      req.params.id,
      req.body
    );

    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await deleteUserService(req.params.id);

    res.json({
      message: "Usuario eliminado",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const user = await toggleUserStatusService(
      req.params.id
    );

    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const changeUserRole = async (req, res) => {
  try {
    const user = await changeUserRoleService(
      req.params.id,
      req.body.role
    );

    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};