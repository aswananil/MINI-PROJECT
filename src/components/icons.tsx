import type { SVGProps } from "react";

export const MetalCanIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 8h16" />
    <path d="M4 16h16" />
    <path d="M6 8v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8" />
  </svg>
);
