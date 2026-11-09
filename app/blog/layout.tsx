import "../plate.css";
import "./blog.css";
import { LyreSymbol, PlateBar, PlateFooter } from "@/components/PlateChrome";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mp blog">
      <LyreSymbol />
      <a className="skip" href="#content">Skip to content</a>
      <div className="page">
        <PlateBar />
        {children}
        <PlateFooter />
      </div>
    </div>
  );
}
