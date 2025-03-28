import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-1vw h-lvh flex justify-center items-center">
      {children}
    </div>
  )
}
