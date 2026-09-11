import { Link, NavLink } from "react-router-dom";
import {
  Activity,
  LibraryBig,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import DisplayWallet from "./DisplayWallet";
import { ThemeToggle } from "./ThemeToggle";
import { BuyerNotificationCenter } from "./BuyerNotificationCenter";
import { SellerNotificationCenter } from "./SellerNotificationCenter";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    "font-mono text-[12px] uppercase tracking-console transition-colors px-2 py-1",
    isActive
      ? "text-[#fffaea] font-medium"
      : "text-[#71717a] hover:text-[#fffaea]",
  ].join(" ");

export function Navigation() {
  const { t } = useTranslation();

  const navItems = [
    { to: "/browse", label: "CATALOG" },
    { to: "/sell", label: "PUBLISH" },
    { to: "/chat", label: "AGENT TESTER" },
    { to: "/profile", label: "VAULT" },
    { to: "/status", label: "TELEMETRY" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#27272a] bg-[#0e0e13]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-sans text-[18px] font-bold tracking-tight text-[#fffaea]">
              SELLORA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#62f6b5]" />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClasses}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <BuyerNotificationCenter />
          <SellerNotificationCenter />

          <Link
            to="/sell"
            className="hidden sm:inline-flex items-center gap-1 bg-[#e96b34] text-[#fffaea] rounded-full px-4 py-1.5 font-mono text-[11px] font-medium tracking-console uppercase hover:bg-[#d45823] transition-colors"
          >
            Publish Prompt →
          </Link>

          <span data-tour="connect-wallet">
            <DisplayWallet />
          </span>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="border border-[#27272a] text-[#fffaea] rounded-[5.6px] hover:bg-[#18181b]"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-[#27272a] bg-[#0e0e13] text-[#fffaea]">
            <div className="mt-8 space-y-4">
              <div className="font-mono text-[11px] uppercase tracking-console text-[#71717a]">
                CONSOLE NAVIGATION
              </div>
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className="block py-2 font-mono text-[13px] tracking-console uppercase text-[#fffaea] hover:text-[#e96b34]">
                  {item.label}
                </NavLink>
              ))}
              <div className="flex items-center gap-2 border-t border-[#27272a] pt-4">
                <BuyerNotificationCenter />
                <SellerNotificationCenter />
                <DisplayWallet />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
