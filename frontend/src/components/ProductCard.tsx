import React from 'react';
import { type Product } from '../types';
import NoImage from "../assets/no-image.svg"

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      currencySign: "standard"
    });
    return formatter.format(price);
  }

  const image = product.image ? product.image : NoImage

  return (
    <div className="bg-white rounded-top-left-xl overflow-hidden break-inside-avoid mb-10">
      <div className="flex bg-red-500">
        <div className="flex-1 flex justify-center">
          <div className="bg-gray-200 flex flex-1 rounded-top-left-xl w-24 h-36 items-center justify-center">
            <img className={`rounded-top-left-xl h-36  flex-1 ${!product.image ? "object-contain" : "object-cover"}`} src={image} />
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-[10px] font-bold text-gray-800 uppercase">{product.title}</h3>
            <p className="text-gray-600 text-[9px] capitalize mt-1">{product.category}</p>
          </div>
        </div>
        <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded inline-flex self-end">
          {formatPrice(product.price)}
        </div>

        {!!product.description && <p className="mt-3 text-gray-600 text-sm line-clamp-2">{product.description}</p>}
      </div>
    </div>
  );
};

export default ProductCard;