import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import logo from '@/assets/logo.svg'

export default function Logo({
  className,
  logoUrl = logo,
}: {
  className?: string
  logoUrl?: string
}) {
  return (
    <>
      <Link
        className={cn(
          'item-center flex px-2 pt-3',
          className
        )}
        to="/"
      >
        <img className="w-27" src={logoUrl} alt="logo" />
      </Link>
    </>
  )
}