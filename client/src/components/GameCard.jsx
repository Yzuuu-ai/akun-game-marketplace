import React from "react";

const GameCard = ({ account }) => {
  // Format harga ke IDR
  const formatHarga = (harga) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(harga);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <img 
        src={account.image} 
        alt={account.namaGame} 
        className="w-full h-40 object-cover rounded" 
      />
      <h3 className="text-lg font-bold mt-2">{account.namaGame}</h3>
      <p className="text-sm text-gray-600">{account.deskripsi || account.description}</p>
      <p className="text-green-600 font-semibold mt-1">
        {formatHarga(account.harga)}
      </p>
    </div>
  );
};

export default GameCard;