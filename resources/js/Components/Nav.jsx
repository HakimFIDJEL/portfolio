import { Link } from "@inertiajs/react";
import { useState } from "react";


export default function Nav({ isOnHome, version }) {
  const [navOpen, setNavOpen] = useState(true);
  const [activeLink, setActiveLink] = useState(version);

  const toggleNav = () => setNavOpen(!navOpen);

  const handleLinkClick = (link) => setActiveLink(link);



  return (
    <>
        
      <nav className={`${navOpen ? "open" : "closed"}`}>

        {isOnHome ? (
          
          <div className="link-group">
            <a
              href="javascript:void(0);"
              className={`link ${activeLink === "graphic-design" ? "active" : ""}`}
              onClick={() => handleLinkClick("graphic-design")}
            >
              Graphic Design
            </a>
            <a
              href="javascript:void(0);"
              className={`link ${activeLink === "minimalist" ? "active" : ""}`}
              onClick={() => handleLinkClick("minimalist")}
            >
              Minimalist
            </a>
          </div>

        
        ) : (
          <Link
            href="/"
            preserveScroll
            className="back-button hover__effect"
          >
            <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 7H2.75003L8.00003 12.25L7.34003 13L0.840027 6.5L7.34003 0L8.00003 0.75L2.75003 6H15V7Z" fill="#C9D1D9"/>
            </svg>
            Go back
          </Link>
        )}

          <button onClick={toggleNav} className="close-button hover__effect">
              <svg
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.15182 11.0469L0.585419 10.4805L5.06542 6.0005L0.585419 1.5205L1.15182 0.954102L5.63182 5.4341L10.1118 0.954102L10.6782 1.5205L6.19822 6.0005L10.6782 10.4805L10.1118 11.0469L5.63182 6.5669L1.15182 11.0469Z"
                  fill="white"
                />
              </svg>
          </button>

      </nav>
    </>
  );
}
