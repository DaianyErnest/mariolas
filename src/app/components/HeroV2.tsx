import imgBackground from "../../imports/image.png";
import imgBackground2 from "../../imports/image-7.png";
import imgSun from "../../imports/sun-assets.svg";
import imgCactus from "../../imports/cactus-assets.svg";
import imgSanfona from "../../imports/sanfona-assets.svg";

/* ─── Sanfona (accordion) ─── */
function SanfonaDecor() {
  return (
    <>
      {/* Mobile: bottom-right of hero */}
      <img
        src={imgSanfona}
        alt=""
        className="absolute pointer-events-none select-none md:hidden"
        style={{
          right: '16px',
          top: '451px',
          width: '146px',
          height: '164px',
        }}
      />
      {/* Desktop: far right */}
      <img
        src={imgSanfona}
        alt=""
        className="absolute pointer-events-none select-none max-md:hidden"
        style={{
          left: 'calc(50% + 378px)',
          top: 'calc(50% + 53px)',
          transform: 'translateY(-50%)',
          width: '436px',
          height: '488px',
          opacity: 0.8,
        }}
      />
    </>
  );
}

interface HeroV2Props {
  onScrollToProducts: () => void;
}

export function HeroV2({ onScrollToProducts }: HeroV2Props) {
  return (
    <section className="relative overflow-hidden bg-[#ac3022]" style={{ minHeight: '680px' }}>
      {/* Background image */}
      <img
        src={imgBackground}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none max-md:opacity-20 md:opacity-10"
      />
      <img
        src={imgBackground2}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* Sun/Rosa – mobile: top-left visible; desktop: far left */}
      <img
        src={imgSun}
        alt=""
        className="absolute pointer-events-none select-none md:hidden"
        style={{
          top: '75px',
          left: '15px',
          width: '62px',
        }}
      />
      <img
        src={imgSun}
        alt=""
        className="absolute pointer-events-none select-none max-md:hidden"
        style={{
          top: '88px',
          left: 'calc(50% - 635px)',
          width: '231px',
          height: '220px',
          opacity: 0.8,
        }}
      />

      {/* Cactus – mobile: bottom-left; desktop: far left */}
      <img
        src={imgCactus}
        alt=""
        className="absolute pointer-events-none select-none md:hidden"
        style={{
          bottom: '0',
          left: '-15px',
          width: '130px',
        }}
      />
      <img
        src={imgCactus}
        alt=""
        className="absolute pointer-events-none select-none max-md:hidden"
        style={{
          bottom: '42px',
          left: 'calc(50% - 757px)',
          width: '260px',
          height: '351px',
          opacity: 0.8,
        }}
      />

      {/* Sanfona/Accordion – right side */}
      <SanfonaDecor />

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-[40px] max-md:px-[24px] pt-[160px] md:pt-[270px] pb-[120px]"
      >
        <h1
          className="uppercase"
          style={{
            fontFamily: "'Bahiana', sans-serif",
            fontSize: 'clamp(56px, 8vw, 120px)',
            lineHeight: '0.9',
            color: '#fde7cc',
            letterSpacing: '0.01em',
          }}
        >
          AS MELHORES CESTAS<br />DO NORDESTE!
        </h1>

        <p
          className="mt-[24px] max-w-[560px] max-md:text-[15px]"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '20px', lineHeight: '1.5', color: 'rgba(253,231,204,0.9)' }}
        >
          Garanta agora sua cesta e presenteie alguém com um pedacinho da nossa terra!
        </p>

        <p
          className="mt-[10px]"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'rgba(253,231,204,0.6)' }}
        >
          Pronta entrega para Recife e região.
        </p>

        <button
          onClick={onScrollToProducts}
          className="mt-[36px] hover:opacity-90 transition-opacity"
          style={{
            background: '#0f5b35',
            borderRadius: '100px',
            width: '260px',
            height: '54px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '20px',
            fontWeight: 600,
            color: 'white',
          }}
        >
          Confira
        </button>
      </div>

    </section>
  );
}
