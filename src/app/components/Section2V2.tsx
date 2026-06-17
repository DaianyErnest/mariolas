import imgBackground from "../../imports/PersonalizacaoDeCestas/1a9c5ddb52db20c1843457cf8bea005d0d3ebe1f.png";
import imgLogoMariolas from "../../imports/image-6.png";
import imgImage2 from "../../imports/PersonalizacaoDeCestas/59d695d49909beb8ee6c473f48c2e32446b0251f.png";
import imgCesta from "../../imports/PersonalizacaoDeCestas/b9e405e3189192772b1ce010fad729ddfd61712b.png";
import imgImage1 from "../../imports/PersonalizacaoDeCestas/b9ceef205a7a9fc3e647707f0a315c8c830c1bc9.png";

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=8195018265&text=Ol%C3%A1%2C+visitei+o+mariolas.net+e+gostaria+de+montar+minha+cesta+personalizada&type=phone_number&app_absent=0';

const arrowPath = "M5.4 20L4 18.6L15.6 7H9V5H19V15H17V8.4L5.4 20Z";

export function Section2V2() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#b8392a',
        backgroundImage: `url(${imgBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >

      {/* Mariolas logo watermark — fixed left, vertically centered */}
      <div
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{
          left: '-120px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '520px',
          height: '520px',
          opacity: 0.18,
        }}
      >
        <img src={imgLogoMariolas} alt="" className="w-full h-full object-contain" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 lg:px-20 py-16 lg:py-20">

        {/* Title */}
        <div
          style={{
            fontFamily: "'Bahiana', sans-serif",
            fontSize: 'clamp(60px, 8.5vw, 130px)',
            lineHeight: '0.855',
            color: '#b8392a',
            letterSpacing: '-0.01em',
            textAlign: 'center',
          }}
        >
          <div>Do seu jeito,</div>
          <div>do seu gosto!</div>
        </div>

        {/* Subtitle */}
        <p
          className="mt-5 max-w-[560px]"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(16px, 1.6vw, 22px)',
            fontWeight: 500,
            lineHeight: '1.45',
            color: '#000',
          }}
        >
          Misture, combine e personalize cada detalhe da sua cesta com os produtos que você escolher.
        </p>

        {/* Card + basket container
            Figma ratios (all relative to card width 1275px):
              paddingTop  = 73.55 / 1275 = 5.77%  (space for basket to extend above red card)
              red card h  = 355   / 1275 = 27.84%
              button h    ≈ 68px fixed
              basket w    = 621   / 1275 = 48.7%
              basket h    = 429px (auto from aspect ratio 621:429)
        */}
        {/* paddingTop reserves space for the basket overflow above the red card.
            Mobile: basket = 100% card width → overflow = 41.25% of card width.
            Desktop md+: basket = 48.7% card width → overflow = 5.77% of card width. */}
        <div
          className="relative mt-16 md:mt-8 w-full pt-[41.25%] md:pt-[5.77%]"
          style={{ maxWidth: '1275px' }}
        >
          {/* Red card area — overflow:visible so basket can break out at the top */}
          <div
            className="relative"
            style={{
              background: '#ac3022',
              borderRadius: '35px 35px 0 0',
              paddingBottom: '27.84%',
              overflow: 'visible',
            }}
          >
            {/* imgCesta — left portion of card, mix-blend-soft-light */}
            <div
              className="absolute rounded-[35px] opacity-80 overflow-hidden"
              style={{
                left: '8%',
                bottom: '15%',
                width: '24%',
                aspectRatio: '302 / 198',
                mixBlendMode: 'soft-light',
              }}
            >
              <img src={imgCesta} alt="" className="w-full h-full object-cover" />
            </div>

            {/* imgImage2 — right portion of card, mix-blend-soft-light */}
            <div
              className="absolute rounded-[35px] opacity-80 overflow-hidden"
              style={{
                left: '67%',
                bottom: '15%',
                width: '24%',
                aspectRatio: '301 / 208',
                mixBlendMode: 'soft-light',
              }}
            >
              <img src={imgImage2} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Bottom gradient overlay */}
            <div
              className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(173,71,60,0), #ad473c)',
                mixBlendMode: 'multiply',
              }}
            />

            {/* Basket image — mobile: 100% card width; desktop: 48.7% card width.
                Bottom-anchored so the top always breaks above the red card. */}
            <img
              src={imgImage1}
              alt="Cesta Mariolas personalizada"
              className="absolute z-20 pointer-events-none select-none object-contain object-bottom w-full md:w-[48.7%]"
              style={{
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                height: 'auto',
              }}
            />
          </div>

          {/* CTA button — full-width, fully clickable */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-[10px] py-[19px] hover:opacity-85 transition-opacity cursor-pointer"
            style={{
              background: '#fde7cc',
              borderRadius: '0 0 35px 35px',
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(18px, 2.2vw, 28px)',
                fontWeight: 700,
                color: '#0f4827',
                lineHeight: '30px',
                whiteSpace: 'nowrap',
              }}
            >
              Montar minha cesta
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d={arrowPath} fill="#0F4827" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
