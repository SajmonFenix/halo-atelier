import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

interface MiniCartProps {
  open: boolean;
  onClose: () => void;
  onViewCart: () => void;
  onCheckout: () => void;
}

export function MiniCart({ open, onClose, onViewCart, onCheckout }: MiniCartProps) {
  const { items, removeItem, updateQuantity, itemCount, subtotal } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-black/40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-[71] bg-halo-bg shadow-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5 border-b border-halo-button/30">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-halo-text" />
              <span className="font-sans text-sm text-halo-text">Košík ({itemCount})</span>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-halo-text hover:bg-halo-button/20 transition-colors">
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag size={40} className="text-halo-button mb-4" />
                <p className="font-sans text-sm text-halo-text/50">Košík je prázdny</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {items.map(item => {
                  const key = `${item.product.id}-${item.variation.sku}`;
                  return (
                    <div key={key} className="flex gap-4 pb-4 border-b border-halo-button/20">
                      <div className="w-20 h-24 flex-shrink-0 bg-halo-section">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-medium text-halo-text mb-0.5">{item.product.name}</h4>
                        <p className="font-sans text-xs text-halo-text/50 mb-1">
                          {item.variation.attributes.farba}, {item.variation.attributes.dĺžka}
                        </p>
                        <p className="font-sans text-sm font-semibold text-halo-text mb-2">{formatPrice(item.variation.price)}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-halo-button">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variation.sku, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-halo-text hover:bg-halo-button/20 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center font-sans text-xs text-halo-text">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variation.sku, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-halo-text hover:bg-halo-button/20 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.variation.sku)}
                            className="font-sans text-[10px] uppercase text-halo-text/40 hover:text-red-500 transition-colors"
                          >
                            Odstrániť
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-halo-button/30 px-6 py-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-sm text-halo-text">Medzisúčet</span>
                <span className="font-sans text-base font-semibold text-halo-text">{formatPrice(subtotal)}</span>
              </div>
              <button
                onClick={onViewCart}
                className="w-full font-sans text-xs tracking-editorial uppercase bg-halo-button text-halo-text py-3.5 mb-2 hover:bg-halo-hover hover:text-white transition-colors duration-300"
              >
                Zobraziť košík
              </button>
              <button
                onClick={onCheckout}
                className="w-full font-sans text-xs tracking-editorial uppercase bg-halo-text text-[#FAF7F4] py-3.5 hover:bg-halo-text/90 transition-colors duration-300"
              >
                Prejsť k pokladni
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
