export default function Logos() {
  const logos = [
    { alt: "McKinsey & Company", src: "McKinsey & Company.jpg" },
    { alt: "Boston Consulting Group", src: "Boston-consulting-group.png" },
    { alt: "Deloitte", src: "Deloitte.png" },
    { alt: "PwC", src: "pwc.jpg" },
    { alt: "Accenture", src: "accenture.png" },
    { alt: "KPMG", src: "kpmg2.png" },
  ];

  return (
    <div className=" py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <p className="text-gray-400 text-lg sm:text-xl font-medium mb-6">
          Trusted by
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 items-center justify-items-center">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              alt={logo.alt}
              src={logo.src}
              className="max-h-20 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
