import Aside from "./components/Aside";
import RightPanel from "./components/RightPanel";
import "./globals.css";

export default function RootLayout({ children }) {
  const isLoggedIn = false;
  return (
    <html lang="pt-br">
      <body className="conteudo">
        {isLoggedIn ? (<><Aside /> <RightPanel /></>): null}
        
        {children}
      </body>
    </html>
  );
}
