"use client";

import { FaSearch } from "react-icons/fa";
import AdminList from "./AccountList";
import AdminInput from "./AccountInput";

import {
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FaPlus } from "react-icons/fa6";
import { User, getUsers } from "@/services/user";
import AccountLoading from "./AccountLoading";

type AccountInput = {
  id: string;
  name: string;
  email: string;
};

export const AccountModalContext = createContext<{
  modal: boolean;
  toggleModal: () => void;
  accountInput: AccountInput;
  setAccountInput: (value: SetStateAction<AccountInput>) => void;
  inputAction: "create" | "edit";
  setInputAction: (value: SetStateAction<"create" | "edit">) => void;
}>({
  modal: false,
  toggleModal: () => {},
  accountInput: {
    id: "",
    name: "",
    email: "",
  },
  setAccountInput: () => {},
  inputAction: "create",
  setInputAction: () => {},
});

const AccountPage = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isModal, setModal] = useState<boolean>(false);
  const [inputAction, setInputAction] = useState<"create" | "edit">("create");
  const [accountInput, setAccountInput] = useState<AccountInput>({
    id: "",
    name: "",
    email: "",
  });
  const [users, setUsers] = useState<{
    data: User[];
    loading: boolean;
  }>({
    data: [],
    loading: true,
  });

  const toggleModal = useCallback(() => {
    setModal((prev) => !prev);
  }, []);

  const reloadUsers = useCallback(() => {
    setUsers((prev) => ({ ...prev, loading: true }));
    getUsers()
      .then((result) =>
        setUsers({
          loading: false,
          data: result,
        })
      )
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    if (isLoading) {
      reloadUsers();
    } else {
      setLoading(true);
    }
  }, [isLoading, reloadUsers]);

  return (
    <AccountModalContext.Provider
      value={{
        modal: isModal,
        toggleModal,
        accountInput,
        setAccountInput,
        inputAction,
        setInputAction,
      }}>
      <section className="py-16">
        <div className="container max-w-full">
          <div className="p-4">
            <h1 className="text-3xl font-one mb-3 tracking-wide font-semibold">
              Admin
            </h1>
            <button
              onClick={() => {
                toggleModal();
                setInputAction("create");
                setAccountInput({
                  id: "",
                  name: "",
                  email: "",
                });
              }}
              className="fixed bottom-5 right-5 p-3 border border-white bg-two text-white rounded-md text-xl hover:bg-four focus:ring focus:ring-[rgba(179,203,166,.5)] z-40">
              <FaPlus />
            </button>
            <AdminInput
              active={isModal}
              opencloseModal={toggleModal}
              reloadUsers={reloadUsers}
            />
            <div className="search relative w-full max-w-[400px] mb-3">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 pr-8 py-1 rounded-md border  w-full"
              />
              <button className="absolute top-1/2 -translate-y-1/2 right-3">
                <FaSearch />
              </button>
            </div>
            {users.loading ? (
              <AccountLoading />
            ) : (
              <AdminList users={users.data} reloadUsers={reloadUsers} />
            )}
          </div>
        </div>
      </section>
    </AccountModalContext.Provider>
  );
};

export default AccountPage;
