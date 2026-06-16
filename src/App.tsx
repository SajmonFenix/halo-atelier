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

const features = [
  {
    icon: '/images/ikona-1-vlasy.png',
    title: '100% HUMAN HAIR',
    desc: 'Always real human hair. No synthetic blends.',
  },
  {
    icon: '/images/ikona-2-pierko.png',
    title: 'LIGHTWEIGHT COMFORT',
    desc: 'All-day wear. No compromise.',
  },
  {
    icon: '/images/ikona-3-srdce.png',
    title: 'DESIGNED FOR REAL LIFE',
    desc: 'From everyday life for every moment.',
  },
  {
    icon: '/images/ikona-4-lesk.png',
    title: 'LUXURY YOU CAN FEEL',
    desc: 'From the first touch to every detail.',
  },
];

const promises = [
  {
    icon: '/images/01-100-percent-human-hair-shield-check.png',
    title: '100% HUMAN HAIR',
    desc: 'Always real human hair. No synthetic blends.',
  },
  {
    icon: '/images/02-carefully-curated-search.png',
    title: 'CAREFULLY CURATED',
    desc: 'Every piece is selected with intention and quality in mind.',
  },
  {
    icon: '/images/03-personal-guidance-user.png',
    title: 'PERSONAL GUIDANCE',
    desc: 'We help you find the right piece for you.',
  },
  {
    icon: '/images/04-ongoing-care-heart.png',
    title: 'ONGOING CARE',
    desc: 'Re-fresh & care services coming soon.',
  },
];

const footerStripItems = [
  {
    icon: '/images/05-worldwide-shipping-globe.png',
    title: 'WORLDWIDE SHIPPING',
  },
  {
    icon: '/images/06-personalized-support-heart.png',
    title: 'PERSONALIZED SUPPORT',
  },
  {
    icon: '/images/07-secure-payments-lock.png',
    title: 'SECURE PAYMENTS',
  },
];

function Hero({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <section className="relative overflow-hidden bg-halo-bg" style={{ height: 600 }}>
      <div className="absolute inset-0">
        <img
          src="/images/fotka pre hlavny banner 2.png"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>
      <div className="relative z-10 h-full max-w-[1440px] mx-auto flex items-center" style={{ paddingLeft: 66 }}>
        <div className="max-w-xs flex flex-col gap-2">
          <FadeIn>
            <p className="font-serif text-[42px] italic leading-none text-[#211A16]">Seen.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="font-serif text-[42px] italic leading-none text-[#211A16]">Not staged.</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p
              className="font-sans text-[10px] font-medium leading-[1.4] text-[#211A16] mt-1"
              style={{ maxWidth: 300 }}
            >
              Designed to feel like your own.
            </p>
          </FadeIn>
          <div className="h-3" />
          <FadeIn delay={0.45}>
            <button
              onClick={() => onNavigate('shop')}
              className="inline-flex items-center gap-2 border border-[#211A16] px-[18px] py-[10px]"
            >
              <span className="font-sans text-[8px] font-semibold tracking-[0.7px] uppercase text-[#211A16]">
                DISCOVER COLLECTIONS
              </span>
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function PremiumSection() {
  return (
    <section className="bg-halo-bg px-[54px] py-9">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-4">
        <FadeIn>
          <p className="font-serif text-[12px] font-medium tracking-[3.8px] text-halo-dark text-center">
            PREMIUM HUMAN HAIR WIGS
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="font-serif text-[21px] italic text-halo-dark text-center" style={{ maxWidth: 560 }}>
            Designed to be felt, not just seen.
          </p>
        </FadeIn>
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-4"
          style={{ maxWidth: 1100, width: '100%' }}
        >
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={0.2 + i * 0.1}>
              <div className="flex flex-col items-center gap-2 px-4">
                <img src={f.icon} alt={f.title} className="w-7 h-7 object-contain" />
                <p className="font-serif text-[9px] font-medium tracking-[1.8px] text-halo-dark text-center">
                  {f.title}
                </p>
                <p className="font-sans text-[11px] leading-[1.42] text-halo-muted text-center">
                  {f.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CraftedSection() {
  return (
    <section className="bg-halo-bg">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className="h-[300px]">
          <img
            src="/images/fotka pre sekciu 3.png"
            alt="Crafted with intention"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-halo-section h-[300px] flex flex-col justify-center gap-3 px-14 py-[38px]">
          <FadeIn>
            <p className="font-serif text-[12px] font-medium tracking-[3.8px] text-halo-dark">
              CRAFTED WITH INTENTION
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-serif text-[23px] italic text-halo-dark">
              Every piece deserves<br />to be cared for.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-sans text-[11px] leading-[1.45] text-[#4F4944]" style={{ maxWidth: 400 }}>
              Your wig is an investment in confidence. Our future atelier services are designed to extend the beauty, comfort and longevity of every piece.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <button className="self-start inline-flex items-center gap-2 border border-halo-dark px-[22px] py-[10px]">
              <span className="font-sans text-[9px] font-semibold tracking-[0.7px] uppercase text-halo-dark">
                DISCOVER ATELIER {'\u2727'}
              </span>
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function PromiseSection() {
  return (
    <section className="bg-halo-promise px-[54px] py-[42px]">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-[26px]">
        <FadeIn>
          <p
            className="font-serif text-[12px] tracking-[3px] text-halo-dark text-center"
            style={{ maxWidth: 520 }}
          >
            THE HALO PROMISE
          </p>
        </FadeIn>
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full"
          style={{ maxWidth: 1100 }}
        >
          {promises.map((p, i) => (
            <FadeIn key={p.title} delay={0.15 + i * 0.1}>
              <div className="flex flex-col items-center gap-[7px] px-[18px]">
                <img src={p.icon} alt={p.title} className="w-7 h-7 object-contain" />
                <p
                  className="font-serif text-[8px] tracking-[1.5px] text-halo-dark text-center"
                  style={{ maxWidth: 136 }}
                >
                  {p.title}
                </p>
                <p
                  className="font-sans text-[10px] leading-[1.35] text-halo-text text-center"
                  style={{ maxWidth: 132 }}
                >
                  {p.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterStrip() {
  return (
    <section className="bg-halo-promise px-[54px] py-[18px]">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-center gap-[52px]">
        {footerStripItems.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.1}>
            <div className="flex items-center gap-2">
              <img src={item.icon} alt={item.title} className="w-[17px] h-[17px] object-contain" />
              <span className="font-serif text-[8px] tracking-[1.4px] text-halo-dark">
                {item.title}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ContactFooter({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <footer id="kontakt" className="py-20 md:py-28 px-6 bg-halo-dark">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <FadeIn>
            <div className="flex flex-col gap-6 items-start">
              <div className="w-full pb-3 border-b border-halo-accent/40">
                <p className="font-sans text-xs tracking-[3px] uppercase text-halo-accent">KONTAKT</p>
              </div>
              <img src="/images/halo_logo_atelier_00.png" alt="Halo Atelier" className="h-16 w-auto brightness-0 invert" />
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
              <div className="w-full pb-3 border-b border-halo-accent/40">
                <p className="font-sans text-xs tracking-[3px] uppercase text-halo-accent">OTVÁRACIE HODINY</p>
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
              <div className="w-full pb-3 border-b border-halo-accent/40">
                <p className="font-sans text-xs tracking-[3px] uppercase text-halo-accent">OBCHOD</p>
              </div>
              <p className="font-sans text-sm text-[#FAF7F4]/60 leading-[1.6]">
                Prémiové parochne a vlasové diely. Každý kus ako šperk.
              </p>
              <button
                onClick={() => onNavigate('shop')}
                className="self-start font-sans text-xs tracking-[3px] uppercase bg-halo-button text-halo-text px-8 py-3.5 hover:bg-halo-hover hover:text-white transition-colors duration-300"
              >
                Zobraziť kolekciu
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-[#FAF7F4]/10">
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

  const navItems = [
    { label: 'HOME', id: 'home' },
    { label: 'COLLECTIONS', id: 'collections' },
    { label: 'ABOUT US', id: 'about' },
    { label: 'JOURNAL', id: 'journal' },
    { label: 'ATELIER ◇', id: 'atelier' },
    { label: 'CONTACT', id: 'kontakt' },
  ];

  const handleNavClick = (item: { label: string; id: string }) => {
    setMenuOpen(false);
    if (item.id === 'collections') {
      onNavigate('shop');
    } else if (item.id === 'home') {
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.id === 'kontakt') {
      if (isHome) {
        document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate('home');
        setTimeout(() => {
          document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else if (item.id && isHome) {
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-halo-bg transition-all duration-300" style={{ height: 58 }}>
      <div className="h-full max-w-[1440px] mx-auto flex items-center justify-between px-6">
        <button onClick={() => { setMenuOpen(false); onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex flex-col gap-px">
          <span className="font-serif text-[17px] font-bold tracking-[1.6px] text-halo-dark leading-none">
            HALO ATELIER
          </span>
          <span className="font-sans text-[7px] tracking-[1.6px] text-halo-dark leading-none">
            PREMIUM WIG HOUSE
          </span>
        </button>

        <div className="hidden md:flex items-center gap-[22px]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className="font-sans text-[8px] font-semibold tracking-[0.7px] text-halo-dark hover:opacity-60 transition-opacity uppercase"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => onNavigate('shop')}
            className="font-sans text-[8px] font-semibold tracking-[0.7px] text-halo-dark uppercase border border-halo-dark px-[14px] py-2 hover:bg-halo-dark hover:text-white transition-colors"
          >
            DISCOVER
          </button>
          <button
            onClick={onOpenCart}
            className="relative text-halo-dark"
          >
            <ShoppingCart size={16} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-halo-dark text-white text-[9px] font-bold rounded-full">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onOpenCart}
            className="relative p-1 text-halo-dark"
          >
            <ShoppingCart size={16} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-halo-dark text-white text-[9px] font-bold rounded-full">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-halo-dark transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block w-5 h-px bg-halo-dark transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-halo-dark transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-halo-bg border-t border-halo-dark/10 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className="font-sans text-[10px] font-semibold tracking-[0.7px] text-halo-dark py-2 text-left uppercase"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onNavigate('shop'); }}
            className="font-sans text-[10px] font-semibold tracking-[0.7px] text-halo-dark uppercase border border-halo-dark px-[14px] py-2 self-start"
          >
            DISCOVER
          </button>
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
    <div className="min-h-screen bg-halo-bg text-halo-dark font-sans overflow-x-hidden">
      <Navbar onNavigate={navigate} onOpenCart={openCart} currentView={view} />

      {view === 'home' && (
        <>
          <div className="pt-[58px]">
            <Hero onNavigate={navigate} />
            <PremiumSection />
            <CraftedSection />
            <PromiseSection />
            <FooterStrip />
          </div>
          <ContactFooter onNavigate={navigate} />
        </>
      )}

      {view === 'shop' && (
        <div className="pt-[58px]">
          <ShopPage
            onQuickView={setQuickViewProduct}
            onViewProduct={(p) => navigate('product', p)}
            onAddedToCart={openCart}
          />
        </div>
      )}

      {view === 'product' && selectedProduct && (
        <div className="pt-[58px]">
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => navigate('shop')}
            onAddedToCart={openCart}
          />
        </div>
      )}

      {view === 'cart' && (
        <div className="pt-[58px]">
          <CartPage onBack={() => navigate('shop')} onCheckout={() => navigate('checkout')} />
        </div>
      )}

      {view === 'checkout' && (
        <div className="pt-[58px]">
          <CheckoutPage onBack={() => navigate('shop')} />
        </div>
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
