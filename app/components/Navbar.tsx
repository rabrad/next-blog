"use client"

import Link from "next/link"
import { ModeToggle } from "./ModeToggle"

export default function Navbar() {
  return (
    <nav className="  flex items-center justify-between flex-row">
      <Link href="/" className="font-extrabold text-4xl">
        Next<span className="text-primary">Blog</span>
      </Link>
      <ModeToggle />
    </nav>
  )
}
