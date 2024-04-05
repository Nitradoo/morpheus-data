"use client"

import { useEffect, useState } from "react"
import * as React from "react"
import Link from "next/link"
import { HiOutlineMenu } from "react-icons/hi"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="bg-white dark:text-white text-black dark:bg-background sticky top-0  z-40 w-full border-b border-white dark:border-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 ">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1  items-center justify-end space-x-4">
          <nav className="flex items-center justify-end space-x-1">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
