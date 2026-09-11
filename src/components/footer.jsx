import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-[#27272a] bg-[#0e0e13] text-[#fffaea]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-sans text-[18px] font-bold tracking-tight text-[#fffaea]">
                SELLORA
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#62f6b5]" />
            </div>
            <p className="text-[13px] text-[#71717a] max-w-xs leading-relaxed font-sans">
              Decentralized marketplace for AI Agent Workflows and encrypted system prompts on Stellar.
            </p>
            <div className="text-[11px] font-mono text-[#62f6b5] tracking-console uppercase">
              STELLAR SOROBAN PROTOCOL
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-mono uppercase tracking-console text-[#71717a] mb-4">
              MARKETPLACE
            </h3>
            <ul className="space-y-2.5 text-[13px] text-[#71717a]">
              <li>
                <Link to="/browse" className="hover:text-[#fffaea] transition-colors">
                  Browse Catalog
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-[#fffaea] transition-colors">
                  Publish Prompt
                </Link>
              </li>
              <li>
                <Link to="/chat" className="hover:text-[#fffaea] transition-colors">
                  Agent Console
                </Link>
              </li>
              <li>
                <Link to="/status" className="hover:text-[#fffaea] transition-colors">
                  Network Telemetry
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-mono uppercase tracking-console text-[#71717a] mb-4">
              DEVELOPER DOCS
            </h3>
            <ul className="space-y-2.5 text-[13px] text-[#71717a]">
              <li>
                <a
                  href="https://developers.stellar.org/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#fffaea] transition-colors"
                >
                  Soroban Smart Contracts
                </a>
              </li>
              <li>
                <Link to="/browse" className="hover:text-[#fffaea] transition-colors">
                  AES-GCM Encryption Flow
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#fffaea] transition-colors">
                  Creator Verification
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-mono uppercase tracking-console text-[#71717a] mb-4">
              CONNECT
            </h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/Miss-shelby/Sellora-"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-[5.6px] border border-[#27272a] bg-[#09090b] text-[#71717a] hover:text-[#fffaea] hover:border-[#3f3f46] transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://stellar.org"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-[5.6px] border border-[#27272a] bg-[#09090b] text-[#71717a] hover:text-[#fffaea] hover:border-[#3f3f46] transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
            <p className="text-[11px] font-mono text-[#71717a] mt-4 tracking-console uppercase">
              FINALITY ~1.2s • STELLAR TESTNET
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-[#27272a] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-[#71717a] tracking-console uppercase">
          <p>© {new Date().getFullYear()} SELLORA PROTOCOL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <span>CONSOLE BUILD</span>
            <span>POWERED BY STELLAR SOROBAN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
