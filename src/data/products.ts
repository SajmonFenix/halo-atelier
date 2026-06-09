export interface CartItemVariation {
  attributes: Record<string, string>;
  sku: string;
  price: number;
  stock_status: 'instock' | 'outofstock';
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description: string;
  short_description: string;
  regular_price: number;
  sale_price: number | null;
  on_sale: boolean;
  stock_status: 'instock' | 'outofstock';
  image: string;
  categories: string[];
  attributes: {
    name: string;
    options: string[];
    variation: boolean;
  }[];
  variations: CartItemVariation[];
}

const colorOptions = ['Prirodzená blond', 'Popolavá blond', 'Gaštanová hnedá', 'Tmavá hnedá', 'Čierna', 'Medená'];
const lengthOptions = [
  { label: 'Krátka (35cm)', premium: 0 },
  { label: 'Stredná (45cm)', premium: 20 },
  { label: 'Dlhá (55cm)', premium: 40 },
];

function buildVariations(basePrice: number, baseSku: string, salePrice: number | null): CartItemVariation[] {
  const result: CartItemVariation[] = [];
  for (const color of colorOptions) {
    for (const length of lengthOptions) {
      const price = salePrice !== null ? salePrice + length.premium : basePrice + length.premium;
      result.push({
        attributes: { farba: color, dĺžka: length.label },
        sku: `${baseSku}-${color.toLowerCase().replace(/\s+/g, '-')}-${length.label.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, '-')}`,
        price,
        stock_status: Math.random() > 0.15 ? 'instock' : 'outofstock',
      });
    }
  }
  return result;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Nežnosť',
    slug: 'neznost',
    sku: 'HALO-001',
    description: 'Plný veniec s mäkkou hustotou a prirodzeným leskom. Ručne viazaný na jemnej sieťke, ktorá sa prispôsobí tvaru hlavy. Vlasy sú česané do jemného pohybu, vďaka čomu pôsobia neuveriteľne prirodzene aj zblízka. Vhodná pre každodenné nosenie aj špeciálne príležitosti.',
    short_description: 'Plný veniec s mäkkou hustotou a prirodzeným leskom.',
    regular_price: 299,
    sale_price: null,
    on_sale: false,
    stock_status: 'instock',
    image: '/images/generated-1780910641845.png',
    categories: ['Parochne', 'Klasické'],
    attributes: [
      { name: 'Farba', options: colorOptions, variation: true },
      { name: 'Dĺžka', options: lengthOptions.map(l => l.label), variation: true },
    ],
    variations: buildVariations(299, 'HALO-001', null),
  },
  {
    id: 2,
    name: 'Ľahkosť',
    slug: 'lahkost',
    sku: 'HALO-002',
    description: 'Vzdušný strih pre odľahčenie bez straty objemu. Perfektná voľba pre teplejšie dni alebo ženy, ktoré preferujú ľahší pocit na hlave. Napriek nízkej hmotnosti si parochňa zachováva plný tvar a prirodzený pád vlasov.',
    short_description: 'Vzdušný strih pre odľahčenie bez straty objemu.',
    regular_price: 349,
    sale_price: 299,
    on_sale: true,
    stock_status: 'instock',
    image: '/images/generated-1780910641512.png',
    categories: ['Parochne', 'Ľahké'],
    attributes: [
      { name: 'Farba', options: colorOptions, variation: true },
      { name: 'Dĺžka', options: lengthOptions.map(l => l.label), variation: true },
    ],
    variations: buildVariations(349, 'HALO-002', 299),
  },
  {
    id: 3,
    name: 'Línia',
    slug: 'linia',
    sku: 'HALO-003',
    description: 'Dlhší strih s čistou líniou a vrstvenou textúrou. Vlasy sú strihané do jemne vrstveného tvaru, ktorý dodáva objem a pohyb. Ideálna voľba pre ženy, ktoré túžia po dlhších vlasoch s prirodzeným vzhľadom.',
    short_description: 'Dlhší strih s čistou líniou a vrstvenou textúrou.',
    regular_price: 399,
    sale_price: null,
    on_sale: false,
    stock_status: 'instock',
    image: '/images/generated-1780910640114.png',
    categories: ['Parochne', 'Dlhé'],
    attributes: [
      { name: 'Farba', options: colorOptions, variation: true },
      { name: 'Dĺžka', options: lengthOptions.map(l => l.label), variation: true },
    ],
    variations: buildVariations(399, 'HALO-003', null),
  },
  {
    id: 4,
    name: 'Ticho',
    slug: 'ticho',
    sku: 'HALO-004',
    description: 'Krátky strih s jemnými vlnami pre každodenný look. Moderný a praktický strih, ktorý vyžaduje minimálnu údržbu. Vlny dodávajú parochni prirodzený objem a ženský nádych. Ideálna pre aktívne ženy.',
    short_description: 'Krátky strih s jemnými vlnami pre každodenný look.',
    regular_price: 279,
    sale_price: 249,
    on_sale: true,
    stock_status: 'instock',
    image: '/images/generated-1780910641563.png',
    categories: ['Parochne', 'Krátke'],
    attributes: [
      { name: 'Farba', options: colorOptions, variation: true },
      { name: 'Dĺžka', options: lengthOptions.map(l => l.label), variation: true },
    ],
    variations: buildVariations(279, 'HALO-004', 249),
  },
  {
    id: 5,
    name: 'Žiar',
    slug: 'ziar',
    sku: 'HALO-005',
    description: 'Teplý tónovaný strih s lesklým povrchom a ľahkosťou. Špeciálna úprava vlasových vlákien dodáva parochni jemný lesk, ktorý pôsobí prirodzene a zdravo. Teplé tóny rozžiaria tvár a dodajú jej mladistvý vzhľad.',
    short_description: 'Teplý tónovaný strih s lesklým povrchom a ľahkosťou.',
    regular_price: 369,
    sale_price: null,
    on_sale: false,
    stock_status: 'instock',
    image: '/images/generated-1780910642979.png',
    categories: ['Parochne', 'Tónované'],
    attributes: [
      { name: 'Farba', options: colorOptions, variation: true },
      { name: 'Dĺžka', options: lengthOptions.map(l => l.label), variation: true },
    ],
    variations: buildVariations(369, 'HALO-005', null),
  },
  {
    id: 6,
    name: 'Dotyk',
    slug: 'dotyk',
    sku: 'HALO-006',
    description: 'Mikrovláknový diel s prirodzeným rámom tváre. Vyrobený z najjemnejších mikrovlákien, ktoré sú takmer nerozoznateľné od vlastných vlasov. Špeciálne tvarovaný rám tváre zaručuje, že parochňa vyzerá prirodzene z každej strany.',
    short_description: 'Mikrovláknový diel s prirodzeným rámom tváre.',
    regular_price: 449,
    sale_price: 379,
    on_sale: true,
    stock_status: 'instock',
    image: '/images/generated-1780910640271.png',
    categories: ['Parochne', 'Prémiové'],
    attributes: [
      { name: 'Farba', options: colorOptions, variation: true },
      { name: 'Dĺžka', options: lengthOptions.map(l => l.label), variation: true },
    ],
    variations: buildVariations(449, 'HALO-006', 379),
  },
];

export function formatPrice(price: number): string {
  return price.toFixed(2).replace('.', ',') + ' €';
}

export function getDefaultVariation(product: Product): CartItemVariation {
  return product.variations.find(v => v.stock_status === 'instock') || product.variations[0];
}
