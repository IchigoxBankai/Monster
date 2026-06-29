import './Footer.css'

const FOOTER_LINKS = {
  Products: ['Zero Ultra', 'Mango Loco', 'Pipeline Punch', 'Ultra Sunrise', 'Ultra Violet', 'Ultra Paradise'],
  Company: ['About Monster', 'Sustainability', 'Press Room', 'Careers'],
  Support: ['Store Locator', 'FAQ', 'Contact Us', 'Nutrition Info'],
  Social: ['Instagram', 'Twitter / X', 'TikTok', 'YouTube'],
}

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        {/* Top */}
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-m">M</span>ONSTER
            </div>
            <p className="footer-tagline">
              Unleash the Ultra.<br />
              Zero sugar. Maximum energy.
            </p>
            <div className="footer-social-icons">
              {['IG', 'TW', 'TK', 'YT'].map(s => (
                <a key={s} href="#" className="social-icon" id={`footer-social-${s.toLowerCase()}`} aria-label={s}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links-grid">
            {Object.entries(FOOTER_LINKS).map(([cat, links]) => (
              <div key={cat} className="footer-col">
                <h4 className="footer-col-title">{cat}</h4>
                <ul>
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" className="footer-link" id={`footer-link-${link.toLowerCase().replace(/\s/g,'-')}`}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div className="footer-divider" />
          <div className="footer-bottom-inner">
            <p className="footer-legal">
              © 2024 Monster Beverage Corporation. All rights reserved.
              Monster Energy® is a registered trademark. Not recommended for children,
              pregnant women, or those sensitive to caffeine.
            </p>
            <div className="footer-bottom-links">
              {['Privacy Policy', 'Terms of Use', 'Cookie Settings'].map(l => (
                <a key={l} href="#" className="footer-bottom-link">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
