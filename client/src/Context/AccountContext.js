import { createContext, useState, useEffect } from 'react';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState(() => {
    const savedAccounts = localStorage.getItem('akunList');
    return savedAccounts ? JSON.parse(savedAccounts) : [];
  });

  useEffect(() => {
    localStorage.setItem('akunList', JSON.stringify(accounts));
  }, [accounts]);

  const addAccount = (account) => {
    const newAccount = {
      ...account,
      id: Date.now(),
      namaGame: account.namaGame,
      harga: account.harga
    };
    setAccounts((prev) => [...prev, newAccount]);
  };

  const removeAccount = (id) => {
    setAccounts((prev) => prev.filter(account => account.id !== id));
  };

  return (
    <AccountContext.Provider value={{ accounts, addAccount, removeAccount }}>
      {children}
    </AccountContext.Provider>
  );
};