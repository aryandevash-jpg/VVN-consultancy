const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background text-foreground py-16 border-t-2 border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-black mb-4">
              VVN <span className="text-primary">Consultancy</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Empowering traders with data-driven strategies and expert education for consistent
              market success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-muted-foreground hover:text-primary font-semibold transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground hover:text-primary font-semibold transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("process")}
                  className="text-muted-foreground hover:text-primary font-semibold transition-colors"
                >
                  Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-muted-foreground hover:text-primary font-semibold transition-colors"
                >
                  Testimonials
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-black mb-4">Services</h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground font-semibold">Technical Analysis</li>
              <li className="text-muted-foreground font-semibold">Options Trading</li>
              <li className="text-muted-foreground font-semibold">Intraday Strategies</li>
              <li className="text-muted-foreground font-semibold">Risk Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-black mb-4">Contact Us</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="font-semibold">info@vvnconsultancy.com</li>
              <li className="font-semibold">+91 123-456-7890</li>
              <li className="font-semibold">Mumbai, Maharashtra, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-border text-center">
          <p className="text-muted-foreground font-semibold">
            © {new Date().getFullYear()} VVN Consultancy. All rights reserved. | Empowering Traders
            Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
