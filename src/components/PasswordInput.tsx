"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { forwardRef, useState } from "react"

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="relative">
  <Input
    type={showPassword ? "text" : "password"}
    className={cn("pr-10", className)} // Ensures padding to prevent overlap with the button
    ref={ref}
    {...props}
  />
  <Button
    type="button"
    variant="ghost"
    size="sm"
    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
    onClick={() => setShowPassword((prev) => !prev)}
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? (
      <EyeOffIcon className="h-4 w-4" />
    ) : (
      <EyeIcon className="h-4 w-4" />
    )}
  </Button>
</div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }

