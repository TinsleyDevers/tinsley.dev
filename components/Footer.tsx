// footer.tsx
export default function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-gray-0">
      <div>© {new Date().getFullYear()} Tinsley Devers</div>
      <div className="flex text-xs justify-center space-x-2 mt-0">
        <a
          href="https://github.com/tinsleydevers"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block group hover:text-gray-50 transition-colors"
        >
          {`{Github}`}
          <span className="absolute left-1/2 -bottom-1 block h-[1px] w-0 underscore-glow transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
        </a>
        <a
          href="https://www.linkedin.com/in/tinsley-devers-40820a1b9/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block group hover:text-gray-50 transition-colors"
        >
          {`{LinkedIn}`}
          <span className="absolute left-1/2 -bottom-1 block h-[1px] w-0 underscore-glow transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
        </a>
        <a
          href="mailto:contact@tinsley.dev"
          className="relative inline-block group hover:text-gray-50 transition-colors"
        >
          {`{Email}`}
          <span className="absolute left-1/2 -bottom-1 block h-[1px] w-0 underscore-glow transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
        </a>
      </div>
    </footer>
  );
}
