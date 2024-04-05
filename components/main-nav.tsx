"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { HiOutlineMenu } from "react-icons/hi"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <div>
          <img
            src="/logo.png"
            alt="Icon"
            className="block dark:hidden w-8 h-6"
          />
          <img
            src="/logo-light.png"
            alt="Icon"
            className="hidden dark:block w-8 h-6"
          />
        </div>

        <span className="inline-block font-bold text-xs md:text-base">
          {siteConfig.name}
        </span>
      </Link>

      <>
        {items?.length ? (
          <nav className="flex gap-6">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    target={item.target}
                    className={cn(
                      "flex items-center text-sm font-medium text-muted-foreground",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}
      </>
    </div>
  )
}
