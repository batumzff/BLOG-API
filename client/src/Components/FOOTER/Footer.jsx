import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import footerStyle from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <main className={footerStyle.container}>
        <section className={footerStyle.message}>
          Express Yourself Freely
        </section>
        <div className={footerStyle["footer-icons"]}>
          <div>
            <IoLogoWhatsapp />
          </div>
          <div>
            <FaFacebook />
          </div>
          <div>
            <IoLogoInstagram />
          </div>
          <div>
            <FaTelegram />
          </div>
          <div>
            <FaXTwitter />
          </div>
        </div>
      </main>
    </footer>
  );
};

export default Footer;
