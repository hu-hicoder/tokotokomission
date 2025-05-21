import Link from "next/link"

const Header = () => {
  return (
    <header>
      <div className="container mx-auto h-[75px]">
        <div className="flex justify-between h-full items-center">
          <Link href="/">
            <span className="text-lg font-bold">トコトコミッション</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header