import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useRef, useState } from "react";

interface MenuProps {
  title: string;
  children: ReactNode;
}
const FooterAccordion = ({ title, children }: MenuProps) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const el = contentRef.current;
    if (!el) return;

    if (open) {
      el.style.height = el.scrollHeight + "px";
      requestAnimationFrame(() => {
        el.style.height = "0px";
      });
    } else {
      el.style.height = el.scrollHeight + "px";
    }

    setOpen(!open);
  };

  return (
    <div className="menuLinksBox">
      <div className="ftrcmnheading" onClick={toggle}>
        {title}
        <span className="clickBtn">
            <FontAwesomeIcon icon={open ? faMinus : faPlus} />
        </span>
      </div>
      <div ref={contentRef} className="ftr_linkscmn">
        <ul>
            {children}
        </ul>
      </div>
    </div>
  );
};

export default FooterAccordion;