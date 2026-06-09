import { useState } from 'react';
import type { Product } from '../data/products';
import { formatPrice, getDefaultVariation } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onAddedToCart?: () => void;
}

export function ProductCard({ product, onQuickView, onViewProduct, onAddedToCart }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const defaultVar = getDefaultVariation(product);
  const inStock = defaultVar.stock_status === 'instock';

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!inStock) return;
    addItem(product);
    setAdded(true);
    onAddedToCart?.();
    setTimeout(() => setAdded(false), 2000);
  };

  const handleViewDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewProduct(product);
  };

  return (
    <div className="product-card group cursor-pointer bg-halo-bg">
      <div onClick={() => onViewProduct(product)} className="relative overflow-hidden aspect-[3/4] bg-halo-bg mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.on_sale && (
          <span className="absolute top-3 left-3 z-10 font-sans text-[10px] tracking-editorial uppercase bg-[#FAF7F4] text-halo-text px-3 py-1">
            Výpredaj
          </span>
        )}
        {!inStock && (
          <span className="absolute top-3 left-3 z-10 font-sans text-[10px] tracking-editorial uppercase bg-halo-text/80 text-[#FAF7F4] px-3 py-1">
            Vypredané
          </span>
        )}
        <div className="absolute inset-0 bg-halo-text/0 transition-colors duration-500 group-hover:bg-halo-text/5" />
        <button
          onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white text-halo-text opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <Eye size={16} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-full group-hover:translate-y-0 transition-all duration-300 hidden md:block">
          <div className="flex">
            <button
              onClick={handleViewDetail}
              className="flex-1 font-sans text-[10px] tracking-editorial uppercase bg-halo-text text-[#FAF7F4] py-3.5 hover:bg-halo-text/90 transition-colors duration-300"
            >
              Zobraziť detail
            </button>
            <button
              onClick={handleAdd}
              disabled={!inStock}
              className="flex-1 font-sans text-[10px] tracking-editorial uppercase bg-halo-button text-halo-text py-3.5 hover:bg-halo-hover hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!inStock ? 'Vypredané' : added ? 'Pridané ✓' : 'Do košíka'}
            </button>
          </div>
        </div>
      </div>
      <div onClick={() => onViewProduct(product)} className="p-3">
        <p className="font-sans text-[10px] tracking-editorial uppercase text-halo-accent mb-1">Halo Atelier</p>
        <h3 className="font-serif text-lg md:text-xl font-medium text-halo-text mb-1.5">{product.name}</h3>
        <div className="flex items-center gap-2">
          {product.on_sale ? (
            <>
              <span className="font-sans text-sm text-halo-text font-semibold">{formatPrice(defaultVar.price)}</span>
              <span className="font-sans text-xs text-halo-text/50 line-through">{formatPrice(product.regular_price)}</span>
            </>
          ) : (
            <span className="font-sans text-sm text-halo-text font-semibold">{formatPrice(defaultVar.price)}</span>
          )}
        </div>
      </div>
      <div className="px-1 mt-3 md:hidden flex flex-col gap-2">
        <button
          onClick={handleViewDetail}
          className="w-full font-sans text-xs tracking-editorial uppercase bg-halo-text text-[#FAF7F4] py-3 hover:bg-halo-text/90 transition-colors duration-300"
        >
          Zobraziť detail
        </button>
        <button
          onClick={handleAdd}
          disabled={!inStock}
          className="w-full font-sans text-xs tracking-editorial uppercase bg-halo-button text-halo-text py-3 hover:bg-halo-hover hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ShoppingCart size={14} />
          {!inStock ? 'Vypredané' : added ? 'Pridané ✓' : 'Do košíka'}
        </button>
      </div>
    </div>
  );
}
