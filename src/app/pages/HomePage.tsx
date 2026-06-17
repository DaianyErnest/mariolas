import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { Navbar } from '../components/Navbar';
import { HeroV2 } from '../components/HeroV2';
import { Section2V2 } from '../components/Section2V2';
import { FooterV2 } from '../components/FooterV2';

import imgMiuda from '../../imports/TelaPrincipalMariolas-2/3e868441aec6a674cf06ab7b9a97d54295a53e9e.png';
import imgMeiMundo from '../../imports/TelaPrincipalMariolas-2/9e8a50876785f76ce94798610a84a422550b9495.png';
import imgAbarrotada from '../../imports/TelaPrincipalMariolas-2/5fc6c9da91f4074be321f56d4ba93282fbf0510f.png';

const products = [
  {
    id: '3',
    name: 'Miúda (P)',
    price: 124.90,
    image: imgMiuda,
    itemCount: 7,
    tags: [
      'Bolo de rolo de goiaba',
      'Rapadura na palha',
      'Beijú',
      'Queijo coalho desidratado',
      'Doces Santa Terezinha',
      'Castanha (c/s sal - caramelo)',
      'Sequilhos',
    ],
  },
  {
    id: '1',
    name: 'Mei Mundo (M)',
    price: 209.90,
    image: imgMeiMundo,
    itemCount: 11,
    tags: [
      'Doce de jaca em calda',
      'Biscoito Garra Sertaneja',
      'Mel de cana brejeira',
      'Cocada no pote',
      'Beijú',
      'Biscoito de anjo',
      'Bolo de rolo de goiaba',
      'Sequilhos',
      'Queijo coalho desidratado',
      'Doces Santa Terezinha',
      'Castanha (c/s sal - caramelo)',
    ],
  },
  {
    id: '2',
    name: 'Abarrotada (G)',
    price: 289.90,
    image: imgAbarrotada,
    itemCount: 11,
    tags: [
      'Biscoito bolo de rolo',
      'Rapadura brejeira',
      'Doce de leite em tubo',
      'Vinho de caju long neck',
      'Mel abelha zumbi',
      'Mel de cana/melaço do sertão',
      'Biscoito Garra Sertaneja',
      'Cocada no pote',
      'Biscoito de anjo',
      'Bolo de rolo de goiaba',
      'Beijú',
      'Sequilhos',
      'Castanha (c/s sal - caramelo)',
      'Doces Santa Terezinha',
      'Queijo coalho desidratado',
    ],
  },
];

const plusPath = "M14 6H8V0H6V6H0V8H6V14H8V8H14V6Z";

export function HomePage() {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, items, totalItems } = useCart();

  const getQty = (id: string) => items.find((i) => i.id === id)?.quantity || 0;

  const handleAddToCart = (product: (typeof products)[0]) => {
    const current = getQty(product.id);
    if (current === 0) {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    } else {
      updateQuantity(product.id, current + 1);
    }
  };

  const handleDecrement = (id: string) => {
    updateQuantity(id, Math.max(0, getQty(id) - 1));
  };

  const handleComprar = (product: (typeof products)[0]) => {
    if (getQty(product.id) === 0) {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
    navigate('/checkout');
  };

  const scrollToProducts = () =>
    document.getElementById('nossas-cestas')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen" style={{ background: '#fde7cc' }}>

      {/* ── Hero V2 ── */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-30">
          <Navbar
            totalItems={totalItems}
            onCartOpen={() => navigate('/checkout')}
            onScrollToProducts={scrollToProducts}
            onScrollToFeedback={() =>
              document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' })
            }
            onScrollToContato={() =>
              document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
            }
          />
        </div>
        <HeroV2 onScrollToProducts={scrollToProducts} />
      </div>

      {/* ── Wave divider – top of products section ── */}
      <div style={{ lineHeight: 0, background: '#fde7cc' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 390 70"
          preserveAspectRatio="none"
          style={{ width: '100%', display: 'block', height: '70px' }}
        >
          <path d="M0 0V31.4519C158.463 -18.7391 281.31 147.638 389.992 21.8943L390 0H0Z" fill="#AC3022" />
        </svg>
      </div>

      {/* ── Nossas Cestas ── */}
      <section id="nossas-cestas" style={{ background: '#fde7cc' }} className="px-[64px] max-md:px-[20px] pt-[40px] pb-[80px] max-md:pb-[56px]">
        {/* Section title */}
        <h2
          className="text-center uppercase mb-[56px] max-md:mb-[40px]"
          style={{
            fontFamily: "'Bahiana', sans-serif",
            fontSize: 'clamp(48px, 6vw, 100px)',
            color: '#42130d',
          }}
        >
          Nossas Cestas
        </h2>

        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-[32px] max-md:gap-[48px] max-w-[1280px] mx-auto">
          {products.map((product) => {
            const quantity = getQty(product.id);
            return (
              <div key={product.id} className="flex flex-col items-center">

                {/* ── Pill card ── */}
                <div className="relative w-full" style={{ marginTop: '112px' }}>
                  {/* Basket image – floats above the pill */}
                  <div
                    className="absolute left-1/2 z-10 pointer-events-none drop-shadow-xl"
                    style={{
                      top: '-112px',
                      transform: 'translateX(-50%)',
                      width: 'min(95%, 380px)',
                      aspectRatio: '369/293',
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Wine pill base */}
                  <div
                    className="w-full text-center"
                    style={{
                      background: '#ac3022',
                      borderRadius: '160px 160px 40px 40px',
                      paddingTop: '185px',
                      paddingBottom: '28px',
                      paddingLeft: '20px',
                      paddingRight: '20px',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Bahiana', sans-serif",
                        fontSize: '42px',
                        color: 'white',
                        lineHeight: '1',
                      }}
                    >
                      {product.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '28px',
                        fontWeight: 800,
                        color: 'white',
                        marginTop: '6px',
                        lineHeight: '1.1',
                      }}
                    >
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>

                {/* ── Quantity selector ── */}
                <div
                  className="relative w-full mt-[16px]"
                  style={{
                    background: 'rgba(110,36,27,0.12)',
                    border: '3px solid #6e241b',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                  }}
                >
                  <button
                    onClick={() => handleDecrement(product.id)}
                    className="flex items-center justify-center size-[24px] hover:opacity-70 transition-opacity"
                    aria-label="Diminuir"
                  >
                    <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                      <path d="M14 2H0V0H14V2Z" fill="#6E241B"/>
                    </svg>
                  </button>

                  <span
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 600,
                      fontSize: '22px',
                      color: '#6e241b',
                    }}
                  >
                    {quantity}
                  </span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center justify-center size-[24px] hover:opacity-70 transition-opacity"
                    aria-label="Aumentar"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d={plusPath} fill="#6E241B"/>
                    </svg>
                  </button>
                </div>

                {/* ── Comprar + cart buttons ── */}
                <div className="flex gap-[8px] mt-[8px] w-full">
                  <button
                    onClick={() => handleComprar(product)}
                    className="flex-1 hover:opacity-90 transition-opacity"
                    style={{
                      background: '#0f4827',
                      borderRadius: '39px',
                      padding: '13px 0',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '22px',
                      color: 'white',
                    }}
                  >
                    Comprar
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    aria-label="Adicionar ao carrinho"
                    className="flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity shrink-0"
                    style={{
                      background: '#0f4827',
                      borderRadius: '16px',
                      padding: '20px',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M20 15V18H23V20H20V23H18V20H15V18H18V15H20ZM12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13ZM13.35 21H5.5C4.58 21 3.81 20.38 3.58 19.54L1.04 10.27C1 10.18 1 10.09 1 10C1 9.45 1.45 9 2 9H6.79L11.17 2.45C11.36 2.16 11.68 2 12 2C12.32 2 12.64 2.16 12.83 2.44L17.21 9H22C22.55 9 23 9.45 23 10L22.97 10.27L22 13.81C21.43 13.5 20.79 13.24 20.12 13.11L20.7 11H3.31L5.5 19H13C13 19.7 13.13 20.37 13.35 21ZM9.2 9H14.8L12 4.8L9.2 9Z" fill="white" />
                    </svg>
                  </button>
                </div>

                {/* ── Items count + chips ── */}
                <p
                  className="self-start mt-[14px]"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 500, color: '#141414' }}
                >
                  Esta cesta contém {product.itemCount} itens:
                </p>
                <div className="flex flex-wrap gap-[6px_4px] mt-[6px] self-start">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-[8px] rounded-full border border-[#6e241b]"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '16px',
                        color: '#6e241b',
                        height: '32px',
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Section 2 V2 ── */}
      <Section2V2 />

      {/* ── Footer V2 ── */}
      <FooterV2 />

    </div>
  );
}
