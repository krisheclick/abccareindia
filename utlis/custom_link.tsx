"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, MouseEvent } from "react";

interface MenuLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClass?: string;
}

const MenuLink = ({ href, children, className = "", activeClass = "active" }: MenuLinkProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === href) {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      router.push(href);

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${className} ${isActive ? activeClass : ""}`}
    >
      {children}
    </Link>
  );
};

export default MenuLink;