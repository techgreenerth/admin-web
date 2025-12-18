// // SidebarNavItem.tsx
// import { ReactNode } from "react";
// import { NavLink } from "@/components/NavLink";
// import { useSidebar } from "@/components/ui/sidebar";

// interface SidebarNavItemProps {
//   to: string;
//   children: ReactNode;
//   className?: string;
//   activeClassName?: string;
// }

// export function SidebarNavItem({
//   to,
//   children,
//   className,
//   activeClassName,
// }: SidebarNavItemProps) {
//   const { setOpen, isMobile } = useSidebar();

//   const handleClick = () => {
//     if (isMobile) {
//       setOpen(false);
//     }
//   };

//   return (
//     <NavLink
//       to={to}
//       onClick={handleClick}
//       className={className}
//       activeClassName={activeClassName}
//     >
//       {children}
//     </NavLink>
//   );
// }

// SidebarNavItem.tsx
import { ReactNode } from "react";
import { NavLink } from "@/components/NavLink";
import { useSidebar } from "@/components/ui/sidebar";

interface SidebarNavItemProps {
  to: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

export function SidebarNavItem({
  to,
  children,
  className,
  activeClassName,
}: SidebarNavItemProps) {
  // Use setOpen (for desktop/collapsible) or setOpenMobile (for the mobile sheet)
  const { setOpen, setOpenMobile, isMobile } = useSidebar();

  const handleClick = () => {
    // If you want it to close on mobile specifically:
    if (isMobile) {
      setOpenMobile(false);
    } 
    
    // If you also want the desktop sidebar to collapse/close on click:
    // setOpen(false); 
  };

  return (
    <NavLink
      to={to}
      onClick={handleClick}
      className={className}
      activeClassName={activeClassName}
    >
      {children}
    </NavLink>
  );
}