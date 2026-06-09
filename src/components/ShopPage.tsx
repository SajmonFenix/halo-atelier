import { products, type Product } from '../data/products';
import { ProductCard } from './ProductCard';

interface ShopPageProps {
  onQuickView: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onAddedToCart?: () => void;
}

export function ShopPage({ onQuickView, onViewProduct, onAddedToCart }: ShopPageProps) {
  return (
    <section className="py-32 md:py-44 px-6 bg-halo-section min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-sans text-xs tracking-editorial uppercase text-halo-accent mb-4 font-normal">Obchod</p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-halo-text leading-[1.2] mb-4">
            Každý kus ako šperk.
          </h1>
          <p className="font-sans text-sm md:text-base text-halo-text/60 max-w-md mx-auto">
            Prémiové parochne a vlasové diely. Vyberte si svoj strih, farbu a dĺžku.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onViewProduct={onViewProduct}
              onAddedToCart={onAddedToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
