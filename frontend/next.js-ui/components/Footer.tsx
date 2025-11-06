const Footer = () => {
  return (
    <footer>
      {/* Bottom Line */}
      <div className="border-t border-slate-200 dark:border-slate-800 text-center py-4 text-xs text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} VideoChat AI — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
