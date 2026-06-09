import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { ArrowLeft, Check } from 'lucide-react';

interface CheckoutPageProps {
  onBack: () => void;
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  street: string;
  city: string;
  postcode: string;
  phone: string;
  shipToDifferent: boolean;
  sFirstName: string;
  sLastName: string;
  sCountry: string;
  sStreet: string;
  sCity: string;
  sPostcode: string;
  paymentMethod: 'dobierka' | 'prevod';
  note: string;
}

const initialForm: FormData = {
  email: '',
  firstName: '',
  lastName: '',
  company: '',
  country: 'Slovensko',
  street: '',
  city: '',
  postcode: '',
  phone: '',
  shipToDifferent: false,
  sFirstName: '',
  sLastName: '',
  sCountry: 'Slovensko',
  sStreet: '',
  sCity: '',
  sPostcode: '',
  paymentMethod: 'dobierka',
  note: '',
};

export function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState<FormData>(initialForm);
  const [placed, setPlaced] = useState(false);

  const update = (field: keyof FormData, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <section className="py-20 px-6 bg-halo-section min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-[#4A403A] flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-[#FAF7F4]" />
          </div>
          <h1 className="font-serif text-3xl font-medium text-halo-text mb-4">Objednávka odoslaná</h1>
          <p className="font-sans text-sm text-halo-text/60 mb-8 leading-[1.7]">
            Ďakujeme za vašu objednávku. Potvrdzujúci email s detailami odošleme na <strong>{form.email}</strong>.
          </p>
          <button
            onClick={onBack}
            className="font-sans text-xs tracking-editorial uppercase bg-halo-button text-halo-text px-8 py-3.5 hover:bg-halo-hover hover:text-white transition-colors duration-300"
          >
            Pokračovať v nákupe
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-halo-section min-h-screen">
      <div className="max-w-5xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 font-sans text-xs tracking-editorial uppercase text-halo-text/60 hover:text-halo-text transition-colors mb-8">
          <ArrowLeft size={14} />
          Späť do obchodu
        </button>

        <h1 className="font-serif text-3xl md:text-4xl font-medium text-halo-text mb-12">Pokladňa</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h3 className="font-sans text-xs tracking-editorial uppercase text-halo-text mb-4">Kontakt</h3>
                <input
                  type="email"
                  required
                  placeholder="Email *"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  className="w-full font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text placeholder:text-halo-text/30 focus:outline-none focus:border-halo-text"
                />
              </div>

              <div>
                <h3 className="font-sans text-xs tracking-editorial uppercase text-halo-text mb-4">Fakturačná adresa</h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Meno *"
                    value={form.firstName}
                    onChange={e => update('firstName', e.target.value)}
                    className="col-span-2 md:col-span-1 font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text placeholder:text-halo-text/30 focus:outline-none focus:border-halo-text"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Priezvisko *"
                    value={form.lastName}
                    onChange={e => update('lastName', e.target.value)}
                    className="col-span-2 md:col-span-1 font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text placeholder:text-halo-text/30 focus:outline-none focus:border-halo-text"
                  />
                  <input
                    type="text"
                    placeholder="Spoločnosť (nepovinné)"
                    value={form.company}
                    onChange={e => update('company', e.target.value)}
                    className="col-span-2 font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text placeholder:text-halo-text/30 focus:outline-none focus:border-halo-text"
                  />
                  <select
                    value={form.country}
                    onChange={e => update('country', e.target.value)}
                    className="col-span-2 font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text focus:outline-none focus:border-halo-text"
                  >
                    <option>Slovensko</option>
                    <option>Česká republika</option>
                  </select>
                  <input
                    type="text"
                    required
                    placeholder="Ulica a číslo *"
                    value={form.street}
                    onChange={e => update('street', e.target.value)}
                    className="col-span-2 font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text placeholder:text-halo-text/30 focus:outline-none focus:border-halo-text"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Mesto *"
                    value={form.city}
                    onChange={e => update('city', e.target.value)}
                    className="col-span-2 md:col-span-1 font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text placeholder:text-halo-text/30 focus:outline-none focus:border-halo-text"
                  />
                  <input
                    type="text"
                    required
                    placeholder="PSČ *"
                    value={form.postcode}
                    onChange={e => update('postcode', e.target.value)}
                    className="col-span-2 md:col-span-1 font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text placeholder:text-halo-text/30 focus:outline-none focus:border-halo-text"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Telefón *"
                    value={form.phone}
                    onChange={e => update('phone', e.target.value)}
                    className="col-span-2 font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text placeholder:text-halo-text/30 focus:outline-none focus:border-halo-text"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.shipToDifferent}
                    onChange={e => update('shipToDifferent', e.target.checked)}
                    className="w-4 h-4 border-halo-button/50 text-halo-text focus:ring-halo-text"
                  />
                  <span className="font-sans text-sm text-halo-text">Doručiť na inú adresu</span>
                </label>

                {form.shipToDifferent && (
                  <div className="mt-4">
                    <h3 className="font-sans text-xs tracking-editorial uppercase text-halo-text mb-4">Dodacia adresa</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Meno *"
                        value={form.sFirstName}
                        onChange={e => update('sFirstName', e.target.value)}
                        className="col-span-2 md:col-span-1 font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text placeholder:text-halo-text/30 focus:outline-none focus:border-halo-text"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Priezvisko *"
                        value={form.sLastName}
                        onChange={e => update('sLastName', e.target.value)}
                        className="col-span-2 md:col-span-1 font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text placeholder:text-halo-text/30 focus:outline-none focus:border-halo-text"
                      />
                      <select
                        value={form.sCountry}
                        onChange={e => update('sCountry', e.target.value)}
                        className="col-span-2 font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text focus:outline-none focus:border-halo-text"
                      >
                        <option>Slovensko</option>
                        <option>Česká republika</option>
                      </select>
                      <input
                        type="text"
                        required
                        placeholder="Ulica a číslo *"
                        value={form.sStreet}
                        onChange={e => update('sStreet', e.target.value)}
                        className="col-span-2 font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text placeholder:text-halo-text/30 focus:outline-none focus:border-halo-text"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Mesto *"
                        value={form.sCity}
                        onChange={e => update('sCity', e.target.value)}
                        className="col-span-2 md:col-span-1 font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text placeholder:text-halo-text/30 focus:outline-none focus:border-halo-text"
                      />
                      <input
                        type="text"
                        required
                        placeholder="PSČ *"
                        value={form.sPostcode}
                        onChange={e => update('sPostcode', e.target.value)}
                        className="col-span-2 md:col-span-1 font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text placeholder:text-halo-text/30 focus:outline-none focus:border-halo-text"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-sans text-xs tracking-editorial uppercase text-halo-text mb-4">Spôsob platby</h3>
                <div className="space-y-2">
                  <label className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${form.paymentMethod === 'dobierka' ? 'border-halo-text bg-halo-bg' : 'border-halo-button/50 hover:border-halo-button'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="dobierka"
                      checked={form.paymentMethod === 'dobierka'}
                      onChange={e => update('paymentMethod', e.target.value)}
                      className="text-halo-text focus:ring-halo-text"
                    />
                    <div>
                      <span className="font-sans text-sm text-halo-text">Dobierka</span>
                      <p className="font-sans text-xs text-halo-text/50 mt-0.5">Zaplaťte pri prevzatí tovaru</p>
                    </div>
                  </label>
                  <label className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${form.paymentMethod === 'prevod' ? 'border-halo-text bg-halo-bg' : 'border-halo-button/50 hover:border-halo-button'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="prevod"
                      checked={form.paymentMethod === 'prevod'}
                      onChange={e => update('paymentMethod', e.target.value)}
                      className="text-halo-text focus:ring-halo-text"
                    />
                    <div>
                      <span className="font-sans text-sm text-halo-text">Bankový prevod</span>
                      <p className="font-sans text-xs text-halo-text/50 mt-0.5">Zaplaťte prevodom na účet</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-sans text-xs tracking-editorial uppercase text-halo-text mb-4">Poznámka k objednávke</h3>
                <textarea
                  placeholder="Poznámky k objednávke, napr. špeciálne pokyny na doručenie..."
                  value={form.note}
                  onChange={e => update('note', e.target.value)}
                  rows={4}
                  className="w-full font-sans text-sm bg-transparent border border-halo-button/50 px-4 py-3 text-halo-text placeholder:text-halo-text/30 focus:outline-none focus:border-halo-text resize-none"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-halo-bg p-6 sticky top-28">
                <h3 className="font-serif text-lg font-medium text-halo-text mb-4">Vaša objednávka</h3>
                <div className="space-y-3 mb-4">
                  {items.map(item => {
                    const key = `${item.product.id}-${item.variation.sku}`;
                    return (
                      <div key={key} className="flex items-center gap-3 pb-3 border-b border-halo-button/20">
                        <div className="w-14 h-16 bg-halo-section flex-shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-sm text-halo-text">{item.product.name} × {item.quantity}</p>
                          <p className="font-sans text-xs text-halo-text/50">{item.variation.attributes.farba}, {item.variation.attributes.dĺžka}</p>
                        </div>
                        <span className="font-sans text-sm text-halo-text flex-shrink-0">{formatPrice(item.variation.price * item.quantity)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mb-3 pb-3 border-b border-halo-button/20">
                  <span className="font-sans text-sm text-halo-text/60">Medzisúčet</span>
                  <span className="font-sans text-sm text-halo-text">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between mb-3 pb-3 border-b border-halo-button/20">
                  <span className="font-sans text-sm text-halo-text/60">Doprava</span>
                  <span className="font-sans text-sm text-halo-text/50">Bude vypočítané</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="font-sans text-sm text-halo-text font-semibold">Spolu</span>
                  <span className="font-sans text-base font-semibold text-halo-text">{formatPrice(subtotal)}</span>
                </div>
                <button
                  type="submit"
                  className="w-full font-sans text-xs tracking-editorial uppercase bg-halo-text text-[#FAF7F4] py-4 hover:bg-halo-text/90 transition-colors duration-300"
                >
                  Odoslať objednávku
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
