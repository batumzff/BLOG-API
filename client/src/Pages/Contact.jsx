import { Link } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { BsFillEnvelopeAtFill } from "react-icons/bs";

const Contact = () => {
  return (
    <main>
      <section>
        <h3>
          Illuminate Your <span>Thoughts</span> Your <span>Dreams</span>
        </h3>
        <div>
          <a href="tel:123456789">Phone</a>
          <a href="mailto:pyscript@gmail.com">
            <BsFillEnvelopeAtFill />
            Mail Us:
            <h4>pyscript@gmail.com</h4>
          </a>
        </div>
        <div className="contact-footer">
          <div className="icons">
            <div className="whatsapp">
              <IoLogoWhatsapp />
            </div>
            <div className="facebook">
              <FaFacebook />
            </div>
            <div className="instagram">
              <IoLogoInstagram />
            </div>
            <div className="telegram">
              <FaTelegram />
            </div>
            <div>
              <FaXTwitter />
            </div>
          </div>
          {/* <div className="arrow">
            <FaArrowAltCircleUp />
          </div> */}
        </div>
      </section>
    </main>
  );
};

export default Contact;
