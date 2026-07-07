import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
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
import DarkMode from '@/DarkMode'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '@/features/api/authapi'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'



const Navbar = () => {

  const { user } = useSelector(store => store.auth)

  // const user = true;
  const navigate = useNavigate()
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser()

  }


  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User Logged Out")
      navigate("/login")
    }

  }, [isSuccess])



  return (

    <div className='h-16 dark:bg-[#020817] bg-white border-b dark:border-b-ray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10 ' >

      {/* desktop */}
      <div className=' max-w-7xl mx-auto hidden md:flex justify-between items-center gap-2 h-full' >
        <div className='flex items-center gap-2' >
          <School size={"30"} />
          <Link>
            <h1 className=' hidden md:block font-extrabold text-2xl  ' >E-Learing</h1>
          </Link>

        </div>
        {/* User icons and dark mode icon  */}
        <div className='flex gap-8 items-center justify-center' >
          {
            user ? (<DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 " align="start">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className={"font-bold mb-1"} >My Account</DropdownMenuLabel>
                  <DropdownMenuItem> <Link to={"my-learning"} >My Learning</Link>


                  </DropdownMenuItem>
                  <DropdownMenuItem> <Link to="profile" >Edit Profile</Link>


                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler} >
                    Logout

                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className={"bg-black"} />


                <DropdownMenuGroup>
                  {user?.role === "instructor" && (
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>

                  )}

                </DropdownMenuGroup>


              </DropdownMenuContent>
            </DropdownMenu>) : (
              <div className='flex items-center gap-2' >
                <Button className={"border border-gray-300 p-4"} onClick={() => navigate("/login")} variant="outline">Login</Button>
                <Button className={"bg-black text-white p-4"} onClick={() => navigate("/login")} >Signup</Button>
              </div>
            )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile Device  */}
      <div className='flex md:hidden items-center justify-between px-4 h-full ' >
        <h1 className='font-extrabold text-2xl ml-8' >E-Learning</h1>
        <MobileNavbar user={user} />
      </div>

    </div>
  )
}

export default Navbar



const MobileNavbar = ({user}) => {
  const navigate = useNavigate()
  const role = "instructor";
  return (

    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' className="rounded-full bg-gray-200 hover:bg-gray-200 " variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex  flex-col">
        <SheetHeader className="flex flex-row mt-5 items-center justify-between">
          <SheetTitle> <Link to={"/"}>E-Learning</Link> </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="bg-gray-400 mr-2" />
        <nav className='flex ml-1 flex-col space-y-4'>
          <Link to={"/my-learning"}>My Learning</Link>
          <Link to={"/profile"}>Edit Profile</Link>
          <span>Log out</span>
        </nav>
        {
          user?.role === "instructor" && (
            <SheetFooter>
              <SheetClose asChild>
                <Button onClick={() => navigate("/admin/dashboard")} variant="outline">Dashboard</Button>
              </SheetClose>
            </SheetFooter>
          )
        }


      </SheetContent>
    </Sheet>

  )
}


