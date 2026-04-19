// Footer.jsx - place in frontend/src/components/Footer.jsx
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Smartphone,
  Download,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12">
      {/* Main Footer */}
      <div className="grid grid-cols-1 gap-10 px-6 py-10 mx-auto max-w-7xl md:grid-cols-2">
        {/* Useful Links */}
        <div>
          <h3 className="mb-4 text-sm font-bold text-gray-900">Useful Links</h3>
          <div className="grid grid-cols-3 gap-y-2 gap-x-4">
            {[
              "Blog",
              "Partner",
              "Recipes",
              "Privacy",
              "Franchise",
              "Bistro",
              "Terms",
              "Seller",
              "District",
              "FAQs",
              "Warehouse",
              "Blinkit Ambulance",
              "Security",
              "Deliver",
              "",
              "Contact",
              "Resources",
              "",
            ].map((link, i) =>
              link ? (
                <a
                  key={i}
                  href="#"
                  className="text-sm text-gray-500 transition-colors hover:text-blinkit-green"
                >
                  {link}
                </a>
              ) : (
                <span key={i} />
              ),
            )}
          </div>
        </div>

        {/* Categories */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-sm font-bold text-gray-900">Categories</h3>
            <a
              href="#"
              className="text-sm font-semibold text-blinkit-green hover:underline"
            >
              see all
            </a>
          </div>
          <div className="grid grid-cols-3 gap-y-2 gap-x-4">
            {[
              "Vegetables & Fruits",
              "Dairy & Breakfast",
              "Munchies",
              "Cold Drinks & Juices",
              "Instant & Frozen Food",
              "Tea, Coffee & Milk Drinks",
              "Bakery & Biscuits",
              "Sweet Tooth",
              "Atta, Rice & Dal",
              "Dry Fruits, Masala & Oil",
              "Sauces & Spreads",
              "Chicken, Meat & Fish",
              "Paan Corner",
              "Organic & Premium",
              "Baby Care",
              "Pharma & Wellness",
              "Cleaning Essentials",
              "Home Furnishing & Decor",
              "Personal Care",
              "Pet Care",
              "Beauty & Cosmetics",
              "Magazines",
              "Kitchen & Dining",
              "Fashion & Accessories",
              "Electronics & Electricals",
              "Stationery Needs",
              "Books",
              "Toys & Games",
              "Print Store",
              "E-Gift Cards",
              "Rakhi Gifts",
              "",
              "",
            ].map((cat, i) =>
              cat ? (
                <a
                  key={i}
                  href="#"
                  className="text-sm text-gray-500 truncate transition-colors hover:text-blinkit-green"
                >
                  {cat}
                </a>
              ) : (
                <span key={i} />
              ),
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="flex flex-col items-center justify-between gap-4 px-6 py-5 mx-auto max-w-7xl md:flex-row">
          {/* Copyright */}
          <p className="text-xs text-center text-gray-400 md:text-left">
            © Blink Commerce Private Limited, 2016–2026
          </p>

          {/* Download App */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs font-semibold text-gray-600">
              <Download size={13} /> Download App
            </span>
            <a
              href="#"
              className="flex items-center gap-1.5 bg-black text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Smartphone size={13} /> App Store
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 bg-black text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Smartphone size={13} /> Google Play
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {[
              { label: "Facebook", Icon: Facebook },
              { label: "Twitter / X", Icon: Twitter },
              { label: "Instagram", Icon: Instagram },
              { label: "LinkedIn", Icon: Linkedin },
            ].map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex items-center justify-center text-gray-500 transition-colors border border-gray-200 rounded-full w-9 h-9 hover:border-blinkit-green hover:text-blinkit-green"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="px-6 pb-5 mx-auto max-w-7xl">
          <p className="text-xs leading-relaxed text-gray-400">
            "Blinkit" is owned & managed by "Blink Commerce Private Limited" and
            is not related, linked or interconnected in whatsoever manner or
            nature, to "GROFFR.COM" which is a real estate services business
            operated by "Redstone Consultancy Services Private Limited".
          </p>
        </div>
      </div>
    </footer>
  );
}
