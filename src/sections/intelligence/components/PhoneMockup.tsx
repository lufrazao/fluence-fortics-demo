interface PhoneMockupProps {
  children: React.ReactNode
}

export default function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <div className="phone-frame flex-shrink-0">
      <div className="phone-screen">
        <div className="phone-notch" />
        <div className="w-full h-full bg-whatsapp-bg flex flex-col overflow-hidden">
          {children}
        </div>
        <div className="phone-home-indicator" />
      </div>
    </div>
  )
}
