"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { Button } from "@components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
import useFetchProfile from "./useFetchProfile"
import { useRouter } from "next/navigation"
import { clearAPIAuthToken } from "@utils/api"

export function UserNav() {
  const { data } = useFetchProfile();
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-9 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Avatar className="size-9">
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback>{data?.name?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem onClick={() => {
          clearAPIAuthToken()
          router.push('/auth/login')
        }}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}