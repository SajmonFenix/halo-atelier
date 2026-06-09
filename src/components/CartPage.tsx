import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { Trash2, Minus, Plus, ArrowLeft } from 'lucide-react';

interface CartPageProps {
  onBack: () => void;
  onCheckout: () => void;
}

export function CartPage({ onBack, onCheckout }: CartPageProps) {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <section className="py-24 md:py-36 px-6 bg-halo-section min-h-screen">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-halo-text mb-4">Košík</h1>
          <p className="font-sans text-sm text-halo-text/50 mb-8">Košík je prázdny.</p>
          <button onClick={onBack} className="font-sans text-xs tracking-editorial uppercase bg-halo-button text-halo-text px-8 py-3.5 hover:bg-halo-hover hover:text-white transition-colors duration-300">
            Pokračovať v nák upe
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-36 px-6 bg-halo-section min-h-screen">
      <div className="max-w-5xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 font-sans text-xs tracking-editorial uppercase text-halo-text/60 hover:text-halo-text transition-colors mb-8">
          <ArrowLeft size={14} />
          Späť do obchodu
        </button>

        <h1 className="font-serif text-3xl md:text-4xl font-medium text-halo-text mb-12">Košík</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="hidden md:grid grid-cols-[80px_1fr_100px_100px_40px] gap-4 pb-3 border-b border-halo-button/30 mb-4">
              <span />
              <span className="font-sans text-[10px] uppercase text-halo-text/50">Produkt</span>
              <span className="font-sans text-[10px] uppercase text-halo-text/50 text-right">Cena</span>
              <span className="font-sans text-[10px] uppercase text-halo-text/50 text-center">Množstvo</span>
              <span />
            </div>

            <div className="flex flex-col gap-4">
              {items.map(item => {
                const key = `${item.product.id}-${item.variation.sku}`;
                return (
                  <div key={key} className="grid grid-cols-[80px_1fr] md:grid-cols-[80px_1fr_100px_100px_40px] gap-4 pb-4 border-b border-halo-button/20 items-center">
                    <div className="w-20 h-24 bg-halo-section">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-medium text-halo-text">{item.product.name}</h4>
                      <p className="font-sans text-xs text-halo-text/50">
                        {item.variation.attributes.farba}, {item.variation.attributes.dĺžka}
                      </p>
                      <p className="font-sans text-xs text-halo-text mt-1 md:hidden">{formatPrice(item.variation.price)}</p>
                      <button
                        onClick={() => removeItem(item.product.id, item.variation.sku)}
                        className="font-sans text-[10px] uppercase text-red-400 hover:text-red-500 transition-colors mt-1 md:hidden"
                      >
                        Odstrániť
                      </button>
                    </div>
                    <div className="hidden md:block text-right">
                      <span className="font-sans text-sm text-halo-text">{formatPrice(item.variation.price)}</span>
                    </div>
                    <div className="hidden md:flex justify-center">
                      <div className="flex items-center border border-halo-button">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.variation.sku, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-halo-text hover:bg-halo-button/20 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-10 text-center font-sans text-sm text-halo-text">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.variation.sku, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-halo-text hover:bg-halo-button/20 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="hidden md:flex justify-end">
                      <button
                        onClick={() => removeItem(item.product.id, item.variation.sku)}
                        className="w-8 h-8 flex items-center justify-center text-halo-text/30 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="md:hidden mt-4">
              {items.map(item => {
                const key = `${item.product.id}-${item.variation.sku}`;
                return (
                  <div key={key} className="flex items-center justify-between border border-halo-button/40 px-3 py-2 mb-2">
                    <span className="font-sans text-xs text-halo-text/60">Množstvo</span>
                    <div className="flex items-center border border-halo-button">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.variation.sku, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-halo-text hover:bg-halo-button/20"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-10 text-center font-sans text-sm text-halo-text">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.variation.sku, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-halo-text hover:bg-halo-button/20"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-halo-bg p-6">
              <h3 className="font-serif text-lg font-medium text-halo-text mb-4">Sumár košíka</h3>
              <div className="flex justify-between mb-3 pb-3 border-b border-halo-button/20">
                <span className="font-sans text-sm text-halo-text/60">Medzisúčet</span>
                <span className="font-sans text-sm text-halo-text">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="font-sans text-sm text-halo-text font-semibold">Spolu</span>
                <span className="font-sans text-base font-semibold text-halo-text">{formatPrice(subtotal)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full font-sans text-xs tracking-editorial uppercase bg-halo-text text-[#FAF7F4] py-4 hover:bg-halo-text/90 transition-colors duration-300"
              >
                Prejsť k pokladni
              </button>
              <button onClick={onBack} className="w-full font-sans text-xs tracking-editorial uppercase text-halo-text/50 py-3 mt-2 hover:text-halo-text transition-colors">
                Pokračovať v nákupe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
