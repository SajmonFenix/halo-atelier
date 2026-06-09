import { useState } from 'react';
import type { Product, CartItemVariation } from '../data/products';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Minus, Plus } from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddedToCart?: () => void;
}

const colorSwatches: Record<string, string> = {
  'Prirodzená blond': '#E8D5B7',
  'Popolavá blond': '#C4BBAF',
  'Gaštanová hnedá': '#6B4226',
  'Tmavá hnedá': '#3E2723',
  'Čierna': '#1A1A1A',
  'Medená': '#B85C3A',
};

export function ProductDetailPage({ product, onBack, onAddedToCart }: ProductDetailPageProps) {
  const { addItem } = useCart();
  const [selectedVariation, setSelectedVariation] = useState<CartItemVariation>(
    product.variations.find(v => v.stock_status === 'instock') || product.variations[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [mainImg, setMainImg] = useState(product.image);

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
    setTimeout(() => setAdded(false), 2000);
  };

  const inStock = selectedVariation.stock_status === 'instock';

  return (
    <section className="min-h-screen bg-halo-section">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-36">
        <button onClick={onBack} className="flex items-center gap-2 font-sans text-xs tracking-editorial uppercase text-halo-text/60 hover:text-halo-text transition-colors mb-8">
          <ArrowLeft size={14} />
          Späť do obchodu
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <div className="relative aspect-[3/4] bg-halo-bg">
              <img src={mainImg} alt={product.name} className="w-full h-full object-cover" />
              {product.on_sale && (
                <span className="absolute top-4 left-4 font-sans text-[10px] tracking-editorial uppercase bg-[#FAF7F4] text-halo-text px-3 py-1">
                  Výpredaj
                </span>
              )}
              {!inStock && (
                <span className="absolute top-4 left-4 font-sans text-[10px] tracking-editorial uppercase bg-halo-text/80 text-[#FAF7F4] px-3 py-1">
                  Vypredané
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="font-sans text-[10px] tracking-editorial uppercase text-halo-accent mb-2">Halo Atelier</p>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-halo-text mb-3">{product.name}</h1>

            <p className="font-sans text-xs text-halo-text/40 mb-1">SKU: {product.sku} / {selectedVariation.sku}</p>

            <div className="flex items-center gap-2 mb-6">
              {product.on_sale ? (
                <>
                  <span className="font-sans text-2xl text-halo-text font-semibold">{formatPrice(selectedVariation.price)}</span>
                  <span className="font-sans text-base text-halo-text/50 line-through">{formatPrice(product.regular_price)}</span>
                </>
              ) : (
                <span className="font-sans text-2xl text-halo-text font-semibold">{formatPrice(selectedVariation.price)}</span>
              )}
            </div>

            <hr className="border-halo-button/30 mb-6" />

            <div className="prose prose-sm font-sans text-base leading-[1.8] text-halo-text/80 mb-8 max-w-none">
              {product.description.split('\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <hr className="border-halo-button/30 mb-6" />

            {colorAttr && (
              <div className="mb-6">
                <p className="font-sans text-xs uppercase text-halo-text/60 mb-3">
                  Farba: <span className="text-halo-text font-medium">{selectedVariation.attributes.farba}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {colorAttr.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => selectVariation('farba', opt)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                        selectedVariation.attributes.farba === opt ? 'border-halo-hover scale-110 shadow-md' : 'border-transparent hover:border-halo-button'
                      }`}
                      style={{ backgroundColor: colorSwatches[opt] || '#ccc' }}
                      title={opt}
                    />
                  ))}
                </div>
              </div>
            )}

            {lengthAttr && (
              <div className="mb-8">
                <p className="font-sans text-xs uppercase text-halo-text/60 mb-3">
                  Dĺžka: <span className="text-halo-text font-medium">{selectedVariation.attributes.dĺžka}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {lengthAttr.options.map(opt => {
                    const premium = opt.includes('45cm') ? 20 : opt.includes('55cm') ? 40 : 0;
                    const base = product.on_sale && product.sale_price ? product.sale_price : product.regular_price;
                    return (
                      <button
                        key={opt}
                        onClick={() => selectVariation('dĺžka', opt)}
                        className={`font-sans text-xs px-5 py-3 border transition-all duration-200 ${
                          selectedVariation.attributes.dĺžka === opt
                            ? 'bg-halo-text text-[#FAF7F4] border-halo-text'
                            : 'bg-transparent text-halo-text border-halo-button hover:bg-halo-button/20'
                        }`}
                      >
                        {opt}
                        {premium > 0 && <span className="ml-1 text-[10px] opacity-60">(+{formatPrice(premium)})</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-halo-button">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center text-halo-text hover:bg-halo-button/20 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-14 text-center font-sans text-base text-halo-text">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-12 h-12 flex items-center justify-center text-halo-text hover:bg-halo-button/20 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={!inStock}
              className="w-full font-sans text-xs tracking-editorial uppercase bg-halo-text text-[#FAF7F4] py-4 hover:bg-halo-text/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!inStock ? 'Vypredané' : added ? 'Pridané do košíka ✓' : 'Pridať do košíka'}
            </button>

            {!inStock && (
              <p className="font-sans text-xs text-red-500 mt-3 text-center">Táto kombinácia je vypredaná. Prosím, vyberte inú variantu.</p>
            )}

            <div className="mt-8 pt-6 border-t border-halo-button/30">
              <p className="font-sans text-xs text-halo-text/40 leading-[1.8]">
                Kategórie: {product.categories.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
