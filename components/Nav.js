import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
function index({ className = "" }) {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", {}, false);
    };
  }, []);
  return (
    <div className={`nav_full_width ${scroll && "bg_black"} ${className}`}>
      <nav className="netflix_nav">
        <div className="netflix_logo">
          <Link href="/">
            <a>
              <Image src="/img/logo.png" width={120} height={32.4} />
            </a>
          </Link>
        </div>
        <div className="netflix_user_avatar">
          <Image src="/img/user_avatar.png" width={35} height={35} />
        </div>
      </nav>
    </div>
  );
}

export default index;
