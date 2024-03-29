"use client";

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
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getUser } from "@/lib/redux/features/userSlice";
import AccountSearch from "./AccountSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isModal, setModal] = useState<boolean>(false);
  const [inputAction, setInputAction] = useState<"create" | "edit">("create");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
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

  const loadUsers = useCallback((search: string = "") => {
    setUsers((prev) => ({ ...prev, loading: true }));
    getUsers(search)
      .then((result) =>
        setUsers({
          loading: false,
          data: result,
        })
      )
      .catch((e) => setUsers({ loading: false, data: [] }));
  }, []);

  useEffect(() => {
    if (isLoading) {
      dispatch(getUser());

      const search = searchParams.get("s") || "";
      loadUsers(search);
    } else {
      setLoading(true);
    }
  }, [isLoading, loadUsers, dispatch, searchParams]);

  const handleAccountSearch = useCallback(
    (value: string) => {
      clearTimeout(searchTimeout);

      setSearchTimeout(
        setTimeout(() => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("s", value);
          router.push(pathname + "?" + params.toString());
        }, 1000)
      );
    },
    [searchParams, pathname, router, searchTimeout]
  );

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
            {user.role === "super admin" && (
              <button
                aria-label="Add account"
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
            )}
            <AdminInput
              active={isModal}
              opencloseModal={toggleModal}
              loadUsers={loadUsers}
            />
            <AccountSearch
              onSearch={handleAccountSearch}
              value={searchParams.get("s") || ""}
            />
            {users.loading ? (
              <AccountLoading />
            ) : (
              <AdminList users={users.data} loadUsers={loadUsers} />
            )}
          </div>
        </div>
      </section>
    </AccountModalContext.Provider>
  );
};

export default AccountPage;
