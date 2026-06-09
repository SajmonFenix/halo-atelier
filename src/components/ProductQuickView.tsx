import { useState } from 'react';
import type { Product, CartItemVariation } from '../data/products';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus } from 'lucide-react';

interface ProductQuickViewProps {
  product: Product;
  onClose: () => void;
  onAddedToCart?: () => void;
}

export function ProductQuickView({ product, onClose, onAddedToCart }: ProductQuickViewProps) {
  const { addItem } = useCart();
  const [selectedVariation, setSelectedVariation] = useState<CartItemVariation>(
    product.variations.find(v => v.stock_status === 'instock') || product.variations[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const colorAttr = product.attributes.find(a => a.name === 'Farba');
  const lengthAttr = product.attributes.find(a => a.name === 'Dĺžka');

  const selectVariation = (attrName: string, value: string) => {
    const newAttrs = { ...selectedVariation.attributes, [attrName]: value };
    const match = product.variations.find(v =>
      Object.entries(newAttrs).every(([k, val]) => v.attributes[k] === val)
    );
    if (match) setSelectedVariation(match);
  };

  const handleAdd = () => {
    addItem(product, selectedVariation, quantity);
    setAdded(true);
    onAddedToCart?.();
    onClose();
    setTimeout(() => setAdded(false), 2000);
  };

  const inStock = selectedVariation.stock_status === 'instock';

  const colorSwatches: Record<string, string> = {
    'Prirodzená blond': '#E8D5B7',
    'Popolavá blond': '#C4BBAF',
    'Gaštanová hnedá': '#6B4226',
    'Tmavá hnedá': '#3E2723',
    'Čierna': '#1A1A1A',
    'Medená': '#B85C3A',
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-halo-bg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white text-halo-text transition-colors">
          <X size={18} />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[3/4]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.on_sale && (
              <span className="absolute top-3 left-3 font-sans text-[10px] tracking-editorial uppercase bg-[#FAF7F4] text-halo-text px-3 py-1">
                Výpredaj
              </span>
            )}
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <p className="font-sans text-[10px] tracking-editorial uppercase text-halo-accent mb-2">Halo Atelier</p>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-halo-text mb-4">{product.name}</h2>

              <div className="flex items-center gap-2 mb-4">
                {product.on_sale ? (
                  <>
                    <span className="font-sans text-lg text-halo-text font-semibold">{formatPrice(selectedVariation.price)}</span>
                    <span className="font-sans text-sm text-halo-text/50 line-through">{formatPrice(product.regular_price + (selectedVariation.price - (product.sale_price || product.regular_price)))}</span>
                  </>
                ) : (
                  <span className="font-sans text-lg text-halo-text font-semibold">{formatPrice(selectedVariation.price)}</span>
                )}
              </div>

              <p className="font-sans text-sm leading-[1.7] text-halo-text/70 mb-6">{product.short_description}</p>

              {colorAttr && (
                <div className="mb-5">
                  <p className="font-sans text-xs uppercase text-halo-text/60 mb-2.5">Farba: <span className="text-halo-text">{selectedVariation.attributes.farba}</span></p>
                  <div className="flex flex-wrap gap-2.5">
                    {colorAttr.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => selectVariation('farba', opt)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                          selectedVariation.attributes.farba === opt ? 'border-halo-hover scale-110' : 'border-transparent hover:border-halo-button'
                        }`}
                        style={{ backgroundColor: colorSwatches[opt] || '#ccc' }}
                        title={opt}
                      />
                    ))}
                  </div>
                </div>
              )}

              {lengthAttr && (
                <div className="mb-6">
                  <p className="font-sans text-xs uppercase text-halo-text/60 mb-2.5">Dĺžka: <span className="text-halo-text">{selectedVariation.attributes.dĺžka}</span></p>
                  <div className="flex flex-wrap gap-2">
                    {lengthAttr.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => selectVariation('dĺžka', opt)}
                        className={`font-sans text-xs px-4 py-2 border transition-all duration-200 ${
                          selectedVariation.attributes.dĺžka === opt
                            ? 'bg-halo-text text-[#FAF7F4] border-halo-text'
                            : 'bg-transparent text-halo-text border-halo-button hover:bg-halo-button/20'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center border border-halo-button">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-halo-text hover:bg-halo-button/20 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center font-sans text-sm text-halo-text">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-halo-text hover:bg-halo-button/20 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                disabled={!inStock}
                className="w-full font-sans text-xs tracking-editorial uppercase bg-halo-button text-halo-text py-4 hover:bg-halo-hover hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!inStock ? 'Vypredané' : added ? 'Pridané do košíka ✓' : 'Pridať do košíka'}
              </button>

              {!inStock && (
                <p className="font-sans text-xs text-red-500 mt-2 text-center">Táto kombinácia je vypredaná.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
