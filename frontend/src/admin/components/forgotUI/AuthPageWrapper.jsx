import Navbar from "../../../Components/Navbar";
import { cardStyle } from "../styles/authLoginStyles";

function AuthPageWrapper({ navItems, children }) {
  return (
    <div
      style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }}
      className="min-h-screen w-full flex flex-col"
    >
      <Navbar navItems={navItems} />
      <div className="flex-1 flex items-center justify-center px-4 py-12 pt-24 dm">
        <div style={cardStyle} className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthPageWrapper;