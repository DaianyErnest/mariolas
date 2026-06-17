import imgLogo from "../../imports/Logo.png";

const basketIcon = "M21 6.98H16.21L11.83 0.42C11.64 0.14 11.32 0 11 0C10.68 0 10.36 0.14 10.17 0.43L5.79 6.98H1C0.45 6.98 0 7.43 0 7.98C0 8.07 0.00999996 8.16 0.04 8.25L2.58 17.52C2.81 18.36 3.58 18.98 4.5 18.98H17.5C18.42 18.98 19.19 18.36 19.43 17.52L21.97 8.25L22 7.98C22 7.43 21.55 6.98 21 6.98ZM11 2.78L13.8 6.98H8.2L11 2.78ZM17.5 16.98L4.51 16.99L2.31 8.98H19.7L17.5 16.98ZM11 10.98C9.9 10.98 9 11.88 9 12.98C9 14.08 9.9 14.98 11 14.98C12.1 14.98 13 14.08 13 12.98C13 11.88 12.1 10.98 11 10.98Z";

interface NavbarProps {
  totalItems: number;
  onCartOpen: () => void;
  onScrollToProducts: () => void;
  onScrollToFeedback: () => void;
  onScrollToContato: () => void;
}

export function Navbar({
  totalItems,
  onCartOpen,
  onScrollToProducts,
  onScrollToFeedback,
  onScrollToContato,
}: NavbarProps) {
  return (
    <div className="bg-transparent max-md:bg-[#ac3022] content-stretch flex items-center justify-between px-[64px] max-md:px-[16px] py-[24px] max-md:pb-[16px] relative w-full">
      {/* Logo */}
      <div className="h-[48px] max-md:h-[36px] relative shrink-0 w-[251px] max-md:w-[180px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="Mariolas" className="absolute h-full left-0 max-w-none top-0 w-[100.01%]" src={imgLogo} />
        </div>
      </div>

      {/* Right side */}
      <div className="flex gap-[32px] items-center shrink-0">
        {/* Início */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="max-md:hidden"
        >
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '18px', color: 'white', lineHeight: '24px' }}>
            Início
          </span>
        </button>

        {/* Produtos */}
        <button onClick={onScrollToProducts} className="max-md:hidden">
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '18px', color: 'white', lineHeight: '24px' }}>
            Produtos
          </span>
        </button>

        {/* Feedback */}
        <button onClick={onScrollToFeedback} className="max-md:hidden">
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '18px', color: 'white', lineHeight: '24px' }}>
            Feedback
          </span>
        </button>

        {/* Contato */}
        <button onClick={onScrollToContato} className="max-md:hidden">
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '18px', color: 'white', lineHeight: '24px' }}>
            Contato
          </span>
        </button>

        {/* Cart icon + Badge */}
        <div className="relative shrink-0">
          <button
            onClick={onCartOpen}
            className="bg-[rgba(0,0,0,0.28)] flex items-center justify-center overflow-clip relative rounded-[16px]"
            aria-label="Abrir sacola"
          >
            <div className="flex items-center justify-center p-[12px]">
              <div className="relative shrink-0 size-[24px]">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 18.98">
                  <path d={basketIcon} fill="white" />
                </svg>
              </div>
            </div>
          </button>

          {totalItems > 0 && (
            <div className="absolute bg-white flex h-[24px] items-center justify-center min-w-[24px] px-[4px] right-[-4px] rounded-[9999px] top-[-4px] pointer-events-none">
              <span
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#141414', lineHeight: '18px', fontVariationSettings: "'opsz' 14" }}
              >
                {totalItems}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
