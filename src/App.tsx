import { useState } from 'react';
import { useInView } from './hooks/useInView';
import { CartProvider, useCart } from './context/CartContext';
import { products, type Product } from './data/products';
import { ProductCard } from './components/ProductCard';
import { ProductQuickView } from './components/ProductQuickView';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ShopPage } from './components/ShopPage';
import { MiniCart } from './components/MiniCart';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { ShoppingCart } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

type View = 'home' | 'shop' | 'product' | 'cart' | 'checkout';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.9s ease-out ${delay}s, transform 0.9s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const Divider = () => (
  <span className="text-halo-text text-lg tracking-editorial mx-2 select-none">&#10023; &#10023; &#10023;</span>
);

const values = [
  {
    title: 'Jemnosť',
    desc: 'K žene aj k materiálu. Vedieť, kedy stačí málo. Tiché gesto, ktoré povie viac ako hlasné slová.',
  },
  {
    title: 'Úcta',
    desc: 'Ku každému príbehu. Rešpektovať cestu ženy a nemeniť ju, iba doplniť to, čo sama cíti.',
  },
  {
    title: 'Prirodzenosť',
    desc: 'Nič nasilu. Hľadať pravdivú líniu a farbu, ktorá nie je dokonalá, ale je skutočná.',
  },
  {
    title: 'Ženskosť',
    desc: 'Neha, sila a krehkosť v rovnováhe, ktorú si každá žena nesie inak.',
  },
];

function Hero({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#F3EBE2]">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/generated-1780910617720.png"
          alt="Editorial fashion"
          className="w-full h-full object-cover object-top opacity-85"
        />
        <div className="absolute inset-0 bg-[#F3EBE2]/50" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-32 md:py-0">
        <div className="max-w-xl">
          <p className="animate-fadeInUp delay-400 font-sans text-[11px] tracking-[4px] uppercase text-[#3D3D3D] mb-6">
            Prémiový ateliér parochní
          </p>

          <h1 className="animate-fadeInUp delay-500 mb-6">
            <span className="block font-serif text-5xl md:text-7xl font-normal leading-[1.0] text-[#4A403A]">
              Všetko o žene
            </span>
            <span className="block font-serif text-5xl md:text-7xl font-normal italic leading-[1.0] text-[#4A403A]">
              takej, aká je.
            </span>
          </h1>

          <div className="animate-fadeInUp delay-600 w-15 h-[1px] bg-[#C5BEB6] mb-6" />

          <p className="animate-fadeInUp delay-700 font-sans text-base font-normal leading-[1.6] text-[#3D3D3D] mb-10">
            Prémiový ateliér parochní a vlasových diel — priestor, kde sa krása nesnaží, len je.
          </p>

          <button
            onClick={() => onNavigate('shop')}
            className="animate-fadeInUp delay-800 inline-block font-sans text-[11px] tracking-[3px] uppercase bg-[#4A403A] text-[#FAF7F4] px-8 py-4 hover:bg-[#CFC3B8] transition-colors duration-300"
          >
            Prejsť do obchodu
          </button>
        </div>
      </div>

      <div className="absolute right-24 top-16 hidden lg:flex flex-col items-center gap-2 animate-fadeInUp delay-800">
        <div className="w-px h-20 bg-[#C5BEB6]" />
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section id="pribeh" className="py-24 md:py-36 px-6 bg-halo-bg">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="font-sans text-xs tracking-editorial uppercase text-halo-text mb-8 text-center font-normal">Náš príbeh</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-halo-text leading-[1.2] mb-12 text-center">
            Vrátiť sa k tomu,<br />čo je skutočné
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="max-w-xl">
            <FadeIn delay={0.2}><Divider /></FadeIn>
            <FadeIn delay={0.3}>
              <p className="font-sans text-base md:text-lg leading-[1.8] text-halo-text/85 mt-10">
                Halo Atelier vznikol z jednoduchej myšlienky – vrátiť sa k tomu, čo je skutočné. K hodnotám, ktoré tu boli vždy. K jemnosti. K úcte. K prirodzenej kráse ženy.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="font-sans text-base md:text-lg leading-[1.8] text-halo-text/85 mt-6">
                V dnešnom svete sa často zabúda na to najpodstatnejšie – že každá žena je jedinečná presne taká, aká je. Naším cieľom nikdy nebolo ženy meniť. Chceme len jemne podčiarknuť ich charizmu, osobnosť a svetlo, ktoré už v sebe majú.
              </p>
            </FadeIn>
            <FadeIn delay={0.5}><Divider /></FadeIn>
            <FadeIn delay={0.6}>
              <p className="font-sans text-base md:text-lg leading-[1.8] text-halo-text/85 mt-10">
                Pre nás parochňa nie je maska. Je to detail. Šperk, ktorý môže žene pripomenúť jej vlastnú krásu.
              </p>
            </FadeIn>
            <FadeIn delay={0.7}>
              <p className="font-sans text-base md:text-lg leading-[1.8] text-halo-text/85 mt-6">
                Halo Atelier vznikol pre ženy, ktoré svoje vlasy stratili, ale aj pre ženy, ktoré ich majú a jednoducho túžia po zmene alebo novom pocite. Pre ženy s rôznymi príbehmi. S rôznymi cestami. Pre každú, ktorá chce cítiť, že môže byť sama sebou.
              </p>
            </FadeIn>
            <FadeIn delay={0.8}><Divider /></FadeIn>
            <FadeIn delay={0.9}>
              <p className="font-sans text-sm tracking-editorial uppercase text-halo-text mt-10">
                S láskou a úctou k ženskosti. Halo Atelier.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="relative">
              <img
                src="/images/generated-1780910628869.png"
                alt="Halo Atelier story"
                className="w-full h-auto object-cover rounded-sm"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

interface ProductsSectionProps {
  onQuickView: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onViewAll: () => void;
  onAddedToCart?: () => void;
}

function ProductsSection({ onQuickView, onViewProduct, onViewAll, onAddedToCart }: ProductsSectionProps) {
  return (
    <section id="kolekcia" className="py-24 md:py-36 px-6 bg-halo-section">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16 md:mb-24">
            <p className="font-sans text-xs tracking-editorial uppercase text-halo-text mb-4 font-normal">Kolekcia</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-halo-text leading-[1.2] mb-4">
              Každý kus ako šperk.
            </h2>
            <p className="font-sans text-sm md:text-base text-halo-text/60 max-w-md mx-auto">
              Navrhnuté s dôrazom na detail, materiál a tvar, ktorý rešpektuje tvár.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {products.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.1}>
              <ProductCard
                product={product}
                onQuickView={onQuickView}
                onViewProduct={onViewProduct}
                onAddedToCart={onAddedToCart}
              />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.8}>
          <div className="text-center mt-16">
            <button
              onClick={onViewAll}
              className="font-sans text-xs tracking-editorial uppercase bg-halo-button text-halo-text px-10 py-4 hover:bg-halo-hover hover:text-white transition-colors duration-300"
            >
              Zobraziť celú kolekciu
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section id="filozofia" className="py-24 md:py-36 px-6 bg-halo-bg">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="font-sans text-xs tracking-editorial uppercase text-halo-text mb-12 text-center font-normal">Filozofia</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <FadeIn>
            <div className="relative">
              <img
                src="/images/generated-1780910628869.png"
                alt="Halo Atelier filozofia"
                className="w-full h-auto object-cover"
              />
            </div>
          </FadeIn>

          <div>
            <FadeIn delay={0.1}>
              <blockquote className="font-serif text-2xl md:text-3xl text-halo-text leading-[1.2] mb-12">
                Krása tu nevzniká nátlakom. Vzniká v tichu, v pozornosti a v rozhodnutí cítiť sa opäť ako žena.
              </blockquote>
            </FadeIn>
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {values.map((value, i) => (
                <FadeIn key={value.title} delay={0.2 + i * 0.08}>
                  <div>
                    <p className="font-sans text-[10px] tracking-editorial uppercase text-halo-text mb-2">0{i + 1}</p>
                    <h3 className="font-serif text-lg md:text-xl font-semibold text-halo-text mb-2">{value.title}</h3>
                    <p className="font-sans text-sm leading-[1.6] text-halo-text/60">{value.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ForWhom() {
  return (
    <section id="pre-koho" className="py-24 md:py-36 px-6 bg-halo-section">
      <div className="max-w-[72rem] mx-auto text-center p-10 md:p-16">
        <FadeIn>
          <p className="font-sans text-xs tracking-editorial uppercase text-halo-text mb-8 text-center font-normal">Pre koho</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="bg-[#FAF7F4] p-8 md:p-10 mb-8 md:mb-10">
            <h2 className="font-serif text-2xl md:text-3xl text-halo-text leading-[1.25]">
              Pre každú ženu. S rôznymi príbehmi. S rôznymi cestami.
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div className="bg-[#FAF7F4] p-8 md:p-10 text-left">
              <h3 className="font-serif text-xl md:text-2xl font-medium text-halo-text mb-4">
                Pre ženy, ktoré stratili vlasy
              </h3>
              <p className="font-sans text-base leading-[1.8] text-halo-text/75">
                Či pre zdravotné dôvody, liečbu, alebo inú cestu — vieme, že strata vlasov je hlboký moment. Pripravíme pre vás parochňu, v ktorej sa znovu uvidíte. Bez nátlaku. V bezpečí a s trpezlivosťou.
              </p>
            </div>
            <div className="bg-[#FAF7F4] p-8 md:p-10 text-left">
              <h3 className="font-serif text-xl md:text-2xl font-medium text-halo-text mb-4">
                Pre ženy, ktoré túžia po zmene
              </h3>
              <p className="font-sans text-base leading-[1.8] text-halo-text/75">
                Nie každá parochňa je o náhrade. Niekedy je to nový pocit. Nový štýl. Nová vrstva sebaistoty. Pre ženy, ktoré majú svoje vlasy a chcú vyskúšať niečo iné — sme tu aj pre vás.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ContactFooter({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <footer id="kontakt" className="py-20 md:py-28 px-6 bg-[#4A403A]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <FadeIn>
            <div className="flex flex-col gap-6 items-start">
              <div className="w-full pb-3 border-b border-[#D6C1A3]/40">
                <p className="font-sans text-xs tracking-editorial uppercase text-[#D6C1A3]">KONTAKT</p>
              </div>
              <img src="/images/halo_logo_atelier_00.png" alt="Halo Atelier" className="h-16 w-auto" />
              <p className="font-sans text-xs text-[#FAF7F4]/60 leading-[1.6]">Prémiový ateliér parochní a vlasových diel.</p>
              <div className="flex flex-col gap-2">
                <p className="font-sans text-sm text-[#FAF7F4]/60">info@haloatelier.sk</p>
                <p className="font-sans text-sm text-[#FAF7F4]/60">+421 902 123 456</p>
                <p className="font-sans text-sm text-[#FAF7F4]/60">Bratislava, Slovensko</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col gap-6">
              <div className="w-full pb-3 border-b border-[#D6C1A3]/40">
                <p className="font-sans text-xs tracking-editorial uppercase text-[#D6C1A3]">OTVÁRACIE HODINY</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-sans text-sm text-[#FAF7F4]">Pondelok - Piatok: 10:00 - 18:00</p>
                <p className="font-sans text-sm text-[#FAF7F4]">Sobota: 10:00 - 14:00</p>
                <p className="font-sans text-sm text-[#FAF7F4]">Nedeľa: Zatvorené</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col gap-6">
              <div className="w-full pb-3 border-b border-[#D6C1A3]/40">
                <p className="font-sans text-xs tracking-editorial uppercase text-[#D6C1A3]">OBCHOD</p>
              </div>
              <p className="font-sans text-sm text-[#FAF7F4]/60 leading-[1.6]">
                Prémiové parochne a vlasové diely. Každý kus ako šperk.
              </p>
              <button
                onClick={() => onNavigate('shop')}
                className="self-start font-sans text-xs tracking-editorial uppercase bg-halo-button text-halo-text px-8 py-3.5 hover:bg-halo-hover hover:text-white transition-colors duration-300"
              >
                Zobraziť kolekciu
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[#FAF7F4]/10">
        <FadeIn delay={0.4}>
          <p className="font-sans text-xs text-[#FAF7F4]/30 text-center">&copy; 2025 Halo Atelier. Všetky práva vyhradené.</p>
        </FadeIn>
      </div>
    </footer>
  );
}

interface NavbarProps {
  onNavigate: (view: View) => void;
  onOpenCart: () => void;
  currentView: View;
}

function Navbar({ onNavigate, onOpenCart, currentView }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const isHome = currentView === 'home';

  const sectionLinks = [
    { label: 'Príbeh', id: 'pribeh' },
    { label: 'Filozofia', id: 'filozofia' },
    { label: 'Pre koho', id: 'pre-koho' },
    { label: 'Kontakt', id: 'kontakt' },
  ];

  const handleSectionClick = (id: string) => {
    setMenuOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('home');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#4A403A] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-3">
          <img src="/images/halo_logo_atelier_00.png" alt="Halo Atelier" className="h-16 w-auto" />
        </button>

        <div className="hidden md:flex items-center gap-8">
          {sectionLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleSectionClick(link.id)}
              className="font-sans text-[10px] tracking-editorial uppercase text-[#FAF7F4]/70 hover:text-[#D6C1A3] transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onNavigate('shop'); }}
            className={`font-sans text-[10px] tracking-editorial uppercase px-6 py-2.5 transition-colors duration-300 ${
              currentView === 'shop' || currentView === 'product'
                ? 'bg-halo-hover text-white'
                : 'bg-halo-button text-halo-text hover:bg-halo-hover hover:text-white'
            }`}
          >
            Obchod
          </button>
          <button
            onClick={onOpenCart}
            className="relative font-sans text-[10px] tracking-editorial uppercase text-[#FAF7F4]/70 hover:text-[#D6C1A3] transition-colors duration-300"
          >
            <ShoppingCart size={18} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-halo-button text-halo-text text-[9px] font-sans font-bold rounded-full">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onOpenCart}
            className="relative p-1 text-[#FAF7F4]/70"
          >
            <ShoppingCart size={18} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-halo-button text-halo-text text-[9px] font-sans font-bold rounded-full">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`block w-6 h-px bg-[#FAF7F4] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block w-6 h-px bg-[#FAF7F4] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-[#FAF7F4] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 flex flex-col gap-4">
          <button
            onClick={() => { setMenuOpen(false); onNavigate('home'); }}
            className="font-sans text-xs tracking-editorial uppercase text-[#FAF7F4]/70 py-2 text-left"
          >
            Domov
          </button>
          <button
            onClick={() => { setMenuOpen(false); onNavigate('shop'); }}
            className="font-sans text-xs tracking-editorial uppercase text-[#FAF7F4]/70 py-2 text-left"
          >
            Obchod
          </button>
          {sectionLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleSectionClick(link.id)}
              className="font-sans text-xs tracking-editorial uppercase text-[#FAF7F4]/70 py-2 text-left"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function AppInner() {
  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [miniCartOpen, setMiniCartOpen] = useState(false);

  const openCart = () => setMiniCartOpen(true);

  const navigate = (to: View, product?: Product) => {
    if (product) setSelectedProduct(product);
    setView(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-halo-bg text-halo-text font-sans overflow-x-hidden">
      <Navbar onNavigate={navigate} onOpenCart={openCart} currentView={view} />

      {view === 'home' && (
        <>
          <Hero onNavigate={navigate} />
          <BrandStory />
          <ProductsSection
            onQuickView={setQuickViewProduct}
            onViewProduct={(p) => navigate('product', p)}
            onViewAll={() => navigate('shop')}
            onAddedToCart={openCart}
          />
          <Philosophy />
          <ForWhom />
          <ContactFooter onNavigate={navigate} />
        </>
      )}

      {view === 'shop' && (
        <ShopPage
          onQuickView={setQuickViewProduct}
          onViewProduct={(p) => navigate('product', p)}
          onAddedToCart={openCart}
        />
      )}

      {view === 'product' && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          onBack={() => navigate('shop')}
          onAddedToCart={openCart}
        />
      )}

      {view === 'cart' && (
        <CartPage onBack={() => navigate('shop')} onCheckout={() => navigate('checkout')} />
      )}

      {view === 'checkout' && (
        <CheckoutPage onBack={() => navigate('shop')} />
      )}

      <Analytics />
      <SpeedInsights />

      <MiniCart
        open={miniCartOpen}
        onClose={() => setMiniCartOpen(false)}
        onViewCart={() => { setMiniCartOpen(false); navigate('cart'); }}
        onCheckout={() => { setMiniCartOpen(false); navigate('checkout'); }}
      />

      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddedToCart={openCart}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}
