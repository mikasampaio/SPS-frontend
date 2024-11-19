import React, { useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import CreateUser from "../components/createUserModal";

function Users() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await UserService.get();

      setUsers(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await UserService.deleteUser(id);

      const filteredUsers = users.filter((user) => user.id !== id);
      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Usuários</h1>

        <Button
          onClick={() => setIsVisible(true)}
          label="Novo Usuário"
          fullSize="w-1/4"
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Tipo</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody className="">
          {users.map((user) => (
            <tr key={user.id} className="text-center border-2">
              <td>{user.id}</td>
              {user.type === "admin" ? "Administrador" : "Usuário"}
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="flex gap-2 justify-center">
                <Button
                  label="Editar"
                  onClick={() => navigate(`/users/${user.id}`)}
                />
                <Button onClick={() => deleteUser(user.id)} label="Excluir" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isVisible && (
        <CreateUser
          visible={isVisible}
          setVisible={setIsVisible}
          getUsers={getUsers}
        />
      )}
    </div>
  );
}

export default Users;
