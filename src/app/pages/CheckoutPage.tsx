import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { FooterV2 } from '../components/FooterV2';
import imgLogo from 'figma:asset/0412c8dd466b08682d6f6d486ac74f82b838c178.png';

/* ─── Mask helpers ──────────────────────────────────────────────── */
function maskCPF(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0,3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6)}`;
  return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9,11)}`;
}
function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (!d) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7,11)}`;
}
function maskCEP(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 8);
  return d.length <= 5 ? d : `${d.slice(0,5)}-${d.slice(5)}`;
}

const streets = ['Rua das Flores','Av. Boa Viagem','Rua do Sol','Av. Conselheiro Aguiar','Rua da Aurora'];
const hoods   = ['Boa Viagem','Pina','Piedade','Casa Forte','Espinheiro','Graças'];

/* ─── Field for modal form ──────────────────────────────────────── */
function ModalField({
  label, value, onChange, placeholder, readOnly = false, maxLength,
}: {
  label: string; value: string;
  onChange?: (v: string) => void;
  placeholder?: string; readOnly?: boolean; maxLength?: number;
}) {
  return (
    <div
      className="relative w-full"
      style={{
        background: readOnly ? 'rgba(249,237,216,0.5)' : '#f9edd8',
        borderRadius: '6px',
        border: '1px solid #e0d5c8',
        opacity: readOnly ? 0.5 : 1,
      }}
    >
      <input
        type="text"
        value={value}
        readOnly={readOnly}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-transparent outline-none border-none px-[12px] py-[11px]"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13.8px',
          color: readOnly ? '#320d08' : '#1a1a1a',
          caretColor: '#b8392a',
        }}
      />
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 700, color: '#42130d', lineHeight: '14px', marginBottom: '10px' }}>
      {children}
    </p>
  );
}

/* ─── Address Modal ─────────────────────────────────────────────── */
interface AddressData {
  nome: string; cpf: string; email: string; telefone: string;
  cep: string; logradouro: string; numero: string; complemento: string;
  bairro: string; cidade: string; estado: string;
}

function AddressModal({ onClose, onSave, initial }: {
  onClose: () => void;
  onSave: (d: AddressData) => void;
  initial: AddressData;
}) {
  const [form, setForm] = useState<AddressData>(initial);

  const set = (key: keyof AddressData) => (v: string) =>
    setForm(prev => ({ ...prev, [key]: v }));

  const handleCEP = (raw: string) => {
    const masked = maskCEP(raw);
    set('cep')(masked);
    if (raw.replace(/\D/g, '').length === 8) {
      setTimeout(() => {
        setForm(prev => ({
          ...prev,
          logradouro: streets[Math.floor(Math.random() * streets.length)],
          numero: String(Math.floor(Math.random() * 9000) + 100),
          bairro: hoods[Math.floor(Math.random() * hoods.length)],
        }));
      }, 400);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center sm:px-4 sm:py-8"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onClick={onClose}
    >
      <div
        className="w-full overflow-y-auto sm:rounded-[28px] rounded-t-[28px]"
        style={{
          maxWidth: '700px',
          maxHeight: '92dvh',
          background: '#fff6ea',
          padding: 'clamp(24px, 5vw, 40px) clamp(16px, 5vw, 32px)',
          boxShadow: '0px 1px 2px rgba(0,0,0,0.06), 0px 16px 48px rgba(0,0,0,0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <p style={{ fontFamily: "'Bahiana', sans-serif", fontSize: 'clamp(40px, 8vw, 56px)', lineHeight: '1', color: '#42130d', textTransform: 'lowercase' }}>
            Endereço de envio
          </p>
          <button
            onClick={onClose}
            className="shrink-0 flex items-center justify-center hover:opacity-70 transition-opacity ml-4 mt-1"
            style={{ width: '32px', height: '32px' }}
            aria-label="Fechar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="#B8392A" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3">
          {/* Nome + CPF */}
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[180px]">
              <FieldLabel>Nome completo</FieldLabel>
              <ModalField value={form.nome} onChange={set('nome')} placeholder="Digite o seu nome completo" />
            </div>
            <div className="w-full sm:w-[201px] shrink-0">
              <FieldLabel>CPF</FieldLabel>
              <ModalField value={form.cpf} onChange={(v) => set('cpf')(maskCPF(v))} placeholder="Digite o seu CPF" maxLength={14} />
            </div>
          </div>

          {/* Email + Telefone */}
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[180px]">
              <FieldLabel>Email</FieldLabel>
              <ModalField value={form.email} onChange={set('email')} placeholder="Digite o seu email" />
            </div>
            <div className="w-full sm:w-[201px] shrink-0">
              <FieldLabel>Número de telefone</FieldLabel>
              <ModalField value={form.telefone} onChange={(v) => set('telefone')(maskPhone(v))} placeholder="Digite o seu telefone" maxLength={15} />
            </div>
          </div>

          {/* CEP */}
          <div>
            <FieldLabel>CEP</FieldLabel>
            <ModalField value={form.cep} onChange={handleCEP} placeholder="Digite o seu CEP" maxLength={9} />
          </div>

          {/* Logradouro + Número + Complemento */}
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[140px]">
              <FieldLabel>Logradouro</FieldLabel>
              <ModalField value={form.logradouro} onChange={set('logradouro')} placeholder="Logradouro" />
            </div>
            <div className="w-full sm:w-[92px] shrink-0">
              <FieldLabel>Número</FieldLabel>
              <ModalField value={form.numero} onChange={set('numero')} placeholder="Nº" />
            </div>
            <div className="flex-1 min-w-[140px]">
              <FieldLabel>Complemento</FieldLabel>
              <ModalField value={form.complemento} onChange={set('complemento')} placeholder="Apto, bloco..." />
            </div>
          </div>

          {/* Bairro + Cidade + Estado */}
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[120px]">
              <FieldLabel>Bairro</FieldLabel>
              <ModalField value={form.bairro} onChange={set('bairro')} placeholder="Bairro" />
            </div>
            <div className="flex-1 min-w-[100px]">
              <FieldLabel>Cidade</FieldLabel>
              <ModalField value={form.cidade} readOnly />
            </div>
            <div className="w-[80px] shrink-0">
              <FieldLabel>Estado</FieldLabel>
              <ModalField value={form.estado} readOnly />
            </div>
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={() => onSave(form)}
          className="mt-6 w-full flex items-center justify-center hover:opacity-90 transition-opacity"
          style={{
            background: '#0f5b35',
            borderRadius: '9999px',
            padding: '14px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: '16.8px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

/* ─── Thank-you Modal ───────────────────────────────────────────── */
function ThankYouModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center px-5"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onClick={onClose}
    >
      <div
        className="bg-[#FFF6EA] rounded-[24px] w-full max-w-[480px] flex flex-col items-center gap-6 px-6 sm:px-10 pt-12 pb-10 relative"
        style={{ boxShadow: '0px 24px 64px rgba(0,0,0,0.2)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 bg-[rgba(212,212,216,0.4)] rounded-[12px] w-10 h-10 flex items-center justify-center hover:bg-[rgba(212,212,216,0.7)] transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 1L1 13M1 1L13 13" stroke="#141414" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="bg-[#0f5b35] rounded-full w-[72px] h-[72px] flex items-center justify-center shrink-0">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <p style={{ fontFamily: "'Bahiana', sans-serif", fontSize: '44px', lineHeight: 'normal', color: '#141414' }}>
            Teste encerrado!
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: '26px', color: '#52525b', maxWidth: '360px' }}>
            Obrigado por explorar o protótipo da <span style={{ fontWeight: 600, color: '#6c251d' }}>Mariola's</span>.
            Este é um ambiente de demonstração — seu pedido não foi processado.
          </p>
        </div>
        <div className="bg-[rgba(17,17,17,0.12)] h-px w-full" />
        <button onClick={onClose} className="bg-[#0f5b35] hover:bg-[#0d4d2d] transition-colors h-[52px] w-full rounded-[100px] flex items-center justify-center text-white" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '18px' }}>
          Voltar para a loja
        </button>
      </div>
    </div>
  );
}

/* ─── Qty button ─────────────────────────────────────────────────── */
function QtyBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-full hover:opacity-80 transition-opacity shrink-0"
      style={{ background: '#0f5b35', width: '28px', height: '28px', border: 'none', cursor: 'pointer' }}
    >
      {children}
    </button>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
const emptyAddress: AddressData = {
  nome: '', cpf: '', email: '', telefone: '',
  cep: '', logradouro: '', numero: '', complemento: '',
  bairro: '', cidade: 'Recife', estado: 'PE',
};

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, subtotal, messageCard, setMessageCard } = useCart();

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [address, setAddress] = useState<AddressData>(emptyAddress);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const hasAddress = address.logradouro.trim() !== '';

  const frete = useMemo(() => {
    const d = address.cep.replace(/\D/g, '');
    if (d.length < 8) return 0;
    const seed = parseInt(d.slice(0, 2));
    const bases = [9.9, 14.9, 19.9, 24.9, 29.9, 34.9, 39.9];
    return bases[seed % bases.length];
  }, [address.cep]);

  const total = subtotal + frete;
  const fmt = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;

  const minusSvg = (
    <svg width="10" height="2" viewBox="0 0 10 2" fill="none"><path d="M10 1.5H0V0H10V1.5Z" fill="white" /></svg>
  );
  const plusSvg = (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M10 4.5H5.5V0H4.5V4.5H0V5.5H4.5V10H5.5V5.5H10V4.5Z" fill="white" /></svg>
  );
  const trashSvg = (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
      <path d="M1 4.5H17M7 8.5V15.5M11 8.5V15.5M2 4.5L3 17.5C3 18.6 3.9 19.5 5 19.5H13C14.1 19.5 15 18.6 15 17.5L16 4.5M6 4.5V2.5C6 1.9 6.4 1.5 7 1.5H11C11.6 1.5 12 1.9 12 2.5V4.5" stroke="#ac3022" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F9EDD8' }}>

      {/* Modals */}
      {showAddressModal && (
        <AddressModal
          initial={address}
          onClose={() => setShowAddressModal(false)}
          onSave={(d) => { setAddress(d); setShowAddressModal(false); }}
        />
      )}
      {showThankYou && (
        <ThankYouModal onClose={() => { setShowThankYou(false); navigate('/'); }} />
      )}

      {/* ── Navbar ── */}
      <nav style={{ background: '#ac3022', width: '100%', flexShrink: 0 }}>
        <div className="flex items-center justify-between px-16 max-md:px-5 py-6 max-md:py-4">
          <button
            onClick={() => navigate('/')}
            className="relative shrink-0"
            style={{ height: 'clamp(32px, 5vw, 48px)', width: 'clamp(140px, 30vw, 226px)' }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundColor: 'white',
                WebkitMaskImage: `url(${imgLogo})`,
                maskImage: `url(${imgLogo})`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'left center',
                maskPosition: 'left center',
              }}
            />
          </button>

          <button
            onClick={() => navigate('/')}
            aria-label="Fechar"
            className="flex items-center justify-center hover:bg-[rgba(0,0,0,0.4)] transition-colors"
            style={{ background: 'rgba(0,0,0,0.28)', borderRadius: '16px', padding: '12px' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M16 1.61143L14.3886 0L8 6.38857L1.61143 0L0 1.61143L6.38857 8L0 14.3886L1.61143 16L8 9.61143L14.3886 16L16 14.3886L9.61143 8L16 1.61143Z" fill="white" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Body ── */}
      <div className="flex-1 px-16 max-md:px-4 py-10 max-md:py-6 pb-[80px]">

        {/* Title */}
        <div className="flex items-center mb-6 max-md:mb-5">
          <p style={{ fontFamily: "'Bahiana', sans-serif", fontSize: 'clamp(48px, 8vw, 72px)', lineHeight: '1', color: '#b8392a', textTransform: 'lowercase' }}>
            Sua sacola
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-8 max-lg:flex-col items-start w-full">

          {/* ═══ Left column ═══ */}
          <div className="flex flex-col gap-5 flex-1 min-w-0">

            {/* Address card */}
            <div
              className="w-full flex items-center justify-between gap-4 px-4 py-4 flex-wrap"
              style={{ background: '#fff6ea', border: '1px solid #e8d5bc', borderRadius: '8px' }}
            >
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '14px', color: '#b8392a' }}>
                  Endereço de envio
                </p>
                <p className="truncate" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#6b6b6b' }}>
                  {hasAddress
                    ? `${address.logradouro}, ${address.numero} — ${address.bairro}, ${address.cidade}`
                    : 'Nenhum endereço informado. Calcule o frete abaixo.'}
                </p>
              </div>
              <button
                onClick={() => setShowAddressModal(true)}
                className="shrink-0 flex items-center justify-center hover:opacity-85 transition-opacity"
                style={{ background: '#ac3022', borderRadius: '9999px', padding: '6px 18px', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '14px', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Editar
              </button>
            </div>

            {/* ── Cart table (desktop md+) ── */}
            <div className="hidden md:block w-full rounded-[12px]" style={{ border: '1px solid #e8d5bc' }}>
              <div
                className="grid px-5 py-3"
                style={{ gridTemplateColumns: '1fr 180px 120px 48px', background: '#ac3022', borderRadius: '12px 12px 0 0' }}
              >
                {['Produto', 'Quantidade', 'Valor', 'Retirar'].map((h) => (
                  <p key={h} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '13px', color: 'white' }}>{h}</p>
                ))}
              </div>

              {items.length === 0 ? (
                <div className="px-5 py-8 flex items-center justify-center" style={{ background: '#F9EDD8', borderRadius: '0 0 8px 8px' }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#6b6b6b' }}>Nenhum produto na sacola</p>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div
                    key={item.id}
                    className="grid px-5 py-4 items-center"
                    style={{
                      gridTemplateColumns: '1fr 180px 120px 48px',
                      borderTop: idx === 0 ? 'none' : '1px solid #f0e4d0',
                      background: '#FFF6EA',
                      borderRadius: idx === items.length - 1 ? '0 0 8px 8px' : undefined,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-[48px] h-[48px] rounded-[8px] object-cover shrink-0" />
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#1a1a1a' }}>{item.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <QtyBtn onClick={() => updateQuantity(item.id, item.quantity - 1)}>{minusSvg}</QtyBtn>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: '#1a1a1a', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <QtyBtn onClick={() => updateQuantity(item.id, item.quantity + 1)}>{plusSvg}</QtyBtn>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#1a1a1a' }}>{fmt(item.price * item.quantity)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="flex items-center justify-center hover:opacity-60 transition-opacity" aria-label="Remover">{trashSvg}</button>
                  </div>
                ))
              )}
            </div>

            {/* ── Cart cards (mobile) ── */}
            <div className="flex flex-col gap-3 md:hidden">
              {items.length === 0 ? (
                <div className="px-5 py-8 flex items-center justify-center rounded-[12px]" style={{ background: '#FFF6EA', border: '1px solid #e8d5bc' }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#6b6b6b' }}>Nenhum produto na sacola</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[12px] p-4 flex flex-col gap-3"
                    style={{ background: '#FFF6EA', border: '1px solid #e8d5bc' }}
                  >
                    {/* Top row: image + name + trash */}
                    <div className="flex items-start gap-3">
                      <img src={item.image} alt={item.name} className="w-[56px] h-[56px] rounded-[8px] object-cover shrink-0" />
                      <p className="flex-1 min-w-0" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#1a1a1a', lineHeight: '1.4' }}>
                        {item.name}
                      </p>
                      <button onClick={() => removeFromCart(item.id)} className="flex items-center justify-center hover:opacity-60 transition-opacity shrink-0 mt-1" aria-label="Remover">
                        {trashSvg}
                      </button>
                    </div>

                    {/* Bottom row: qty + price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <QtyBtn onClick={() => updateQuantity(item.id, item.quantity - 1)}>{minusSvg}</QtyBtn>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: '#1a1a1a', minWidth: '22px', textAlign: 'center' }}>{item.quantity}</span>
                        <QtyBtn onClick={() => updateQuantity(item.id, item.quantity + 1)}>{plusSvg}</QtyBtn>
                      </div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: '#1a1a1a' }}>
                        {fmt(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ═══ Right column ═══ */}
          <div className="flex flex-col gap-4 w-full max-w-[520px] max-lg:max-w-full shrink-0">

            {/* Cartão de mensagem */}
            <div className="w-full" style={{ background: '#fff6ea', borderRadius: '8px', boxShadow: '0px 1px 2px rgba(0,0,0,0.06)', padding: '20px 20px 24px' }}>
              <div className="flex items-center justify-between mb-3">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '17px', color: '#b8392a', lineHeight: '1.2' }}>
                  Cartão de Mensagem
                </p>
                <div className="flex items-center justify-center shrink-0" style={{ width: '26px', height: '26px' }}>
                  <svg width="26" height="20.485" viewBox="0 0 26 20.4848" fill="none">
                    <g clipPath="url(#clip-cartao)">
                      <path d="M0.984848 4.92424C0.984848 3.87945 1.39989 2.87745 2.13867 2.13867C2.87745 1.39989 3.87945 0.984849 4.92424 0.984849H20.6818C21.7266 0.984849 22.7286 1.39989 23.4674 2.13867C24.2062 2.87745 24.6212 3.87945 24.6212 4.92424V15.4293C24.6212 16.4741 24.2062 17.4761 23.4674 18.2149C22.7286 18.9537 21.7266 19.3687 20.6818 19.3687H4.92424C3.87945 19.3687 2.87745 18.9537 2.13867 18.2149C1.39989 17.4761 0.984848 16.4741 0.984848 15.4293V4.92424Z" stroke="#B8392A" strokeWidth="1.9697" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.23723 15.4289L10.1766 11.4895M10.1766 11.4895L14.116 15.4289M10.1766 11.4895C9.62118 9.08645 8.37499 7.52379 6.8938 7.55005C5.85774 7.55005 4.9241 8.43251 4.9241 9.51978C4.9241 10.6071 6.5143 11.4895 7.55036 11.4895H12.8029C13.8389 11.4895 15.4292 10.6071 15.4292 9.51978C15.4292 8.43251 14.4956 7.55005 13.4595 7.55005C11.9783 7.52379 10.7321 9.08645 10.1766 11.4895Z" stroke="#B8392A" strokeWidth="1.9697" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip-cartao">
                        <rect fill="white" height="20.4848" width="26" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="relative w-full rounded-[6px]" style={{ minHeight: '90px', background: '#F9EDD8', border: '1px solid #e0d5c8' }}>
                <textarea
                  value={messageCard}
                  onChange={(e) => setMessageCard(e.target.value)}
                  placeholder="Escreva uma mensagem junto com a cesta"
                  className="w-full h-full resize-none outline-none border-none bg-transparent px-[14px] py-[12px]"
                  rows={4}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#1a1a1a', minHeight: '90px' }}
                />
              </div>
            </div>

            {/* Cupom */}
            <div className="w-full flex flex-col gap-[10px]" style={{ background: '#fff6ea', borderRadius: '8px', boxShadow: '0px 1px 2px rgba(0,0,0,0.06)', padding: '18px 20px' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '15px', color: '#b8392a', lineHeight: '1.2' }}>
                Cupom
              </p>
              <div className="relative w-full rounded-[6px]" style={{ background: '#f9edd8', border: '1px solid #e0d5c8' }}>
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => { setCoupon(e.target.value); setCouponApplied(false); }}
                  placeholder="Digite seu cupom"
                  className="w-full outline-none border-none bg-transparent px-[12px] py-[11px]"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#1a1a1a' }}
                />
              </div>
              <button
                onClick={() => coupon.trim() && setCouponApplied(true)}
                className="w-full flex items-center justify-center hover:opacity-85 transition-opacity"
                style={{ background: '#d2a297', borderRadius: '9999px', height: '40px', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '14px', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                {couponApplied ? 'Aplicado!' : 'Aplicar'}
              </button>
            </div>

            {/* Resumo da compra */}
            <div className="w-full flex flex-col gap-4" style={{ background: '#fff6ea', borderRadius: '8px', boxShadow: '0px 1px 2px rgba(0,0,0,0.06)', padding: '18px 20px' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '15px', color: '#b8392a' }}>
                Resumo da compra ({items.length})
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#1a1a1a' }}>
                  <span>Subtotal</span><span>{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#1a1a1a' }}>
                  <span>Frete</span>
                  <span>{frete > 0 ? fmt(frete) : 'R$ 0,00'}</span>
                </div>
              </div>
              <div className="h-px" style={{ background: '#f0e8de' }} />
              <div className="flex items-center justify-between px-4 py-3 rounded-[6px]" style={{ background: '#f9e0be' }}>
                <div className="flex flex-col gap-[1px]">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '15px', color: '#222', lineHeight: '1.5' }}>Total</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#666', lineHeight: '1.5' }}>Alguma descrição (Parcelamento, OBS)</span>
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '17px', color: '#222', whiteSpace: 'nowrap' }}>{fmt(total)}</span>
              </div>
              <button
                onClick={() => items.length > 0 && setShowThankYou(true)}
                disabled={items.length === 0}
                className="w-full py-3 rounded-[100px] flex items-center justify-center transition-colors"
                style={{
                  background: items.length > 0 ? '#0f5b35' : '#b3ccb3',
                  cursor: items.length > 0 ? 'pointer' : 'not-allowed',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '16px',
                  color: 'white',
                  border: 'none',
                }}
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <FooterV2 />
    </div>
  );
}
