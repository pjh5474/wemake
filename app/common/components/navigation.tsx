import { Link } from "react-router";
import { Separator } from "./ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  BarChart3Icon,
  BellIcon,
  LogOutIcon,
  MessageCircleIcon,
  SettingsIcon,
  UserIcon,
  MenuIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const menus = [
  {
    name: "Products",
    to: "/products",
    items: [
      {
        name: "Leaderboards",
        description: "See the top performers in your community",
        to: "/products/leaderboards",
      },
      {
        name: "Categories",
        description: "See the top categories in your community",
        to: "/products/categories",
      },
      {
        name: "Search",
        description: "Search for a product",
        to: "/products/search",
      },
      {
        name: "Submit a product",
        description: "Submit a product to our community",
        to: "/products/submit",
      },
      {
        name: "Promote",
        description: "Promote a product to the community",
        to: "/products/promote",
      },
    ],
  },
  {
    name: "Jobs",
    to: "/jobs",
    items: [
      {
        name: "Remote Jobs",
        description: "Find a remote job in the community",
        to: "/jobs?location=remote",
      },
      {
        name: "Full-Time Jobs",
        description: "Find a full-time job in the community",
        to: "/jobs?type=full-time",
      },
      {
        name: "Freelance Jobs",
        description: "Find a freelance job in the community",
        to: "/jobs?type=freelance",
      },
      {
        name: "Internships",
        description: "Find an internship in the community",
        to: "/jobs?type=internship",
      },
      {
        name: "Post a job",
        description: "Post a job to the community",
        to: "/jobs/submit",
      },
    ],
  },
  {
    name: "Community",
    to: "/community",
    items: [
      {
        name: "All Posts",
        description: "See all posts in the community",
        to: "/community",
      },
      {
        name: "Top Posts",
        description: "See the top posts in the community",
        to: "/community?sort=top",
      },
      {
        name: "New Posts",
        description: "See the new posts in the community",
        to: "/community?sort=new",
      },
      {
        name: "Create a Post",
        description: "Create a post in the community",
        to: "/community/create",
      },
    ],
  },
  {
    name: "IdeasGPT",
    to: "/ideas",
  },
  {
    name: "Teams",
    to: "/teams",
    items: [
      {
        name: "All Teams",
        description: "See all teams in the community",
        to: "/teams",
      },
      {
        name: "Create a Team",
        description: "Create a team in the community",
        to: "/teams/create",
      },
    ],
  },
];

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
}: {
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menuName: string) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  return (
    <nav className="flex px-4 lg:px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div className="flex items-center">
        <Link to="/" className="font-bold tracking-tighter text-lg">
          wemake
        </Link>
        <Separator
          orientation="vertical"
          className="!h-6 mx-4 hidden lg:block"
        />
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList>
              {menus.map((menu) => (
                <NavigationMenuItem key={menu.name}>
                  {menu.items ? (
                    <>
                      <Link to={menu.to} prefetch="intent">
                        <NavigationMenuTrigger>
                          {menu.name}
                        </NavigationMenuTrigger>
                      </Link>
                      <NavigationMenuContent>
                        <ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
                          {menu.items?.map((item) => (
                            <NavigationMenuItem
                              key={item.name}
                              className={cn([
                                "select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
                                item.to === "/products/promote" &&
                                  "col-span-2 bg-primary/10 [&_a]:focus:bg-primary/20 [&_a]:hover:bg-primary/20",
                                item.to === "/jobs/submit" &&
                                  "col-span-2 bg-primary/10 [&_a]:focus:bg-primary/20 [&_a]:hover:bg-primary/20",
                              ])}
                            >
                              <NavigationMenuLink asChild>
                                <Link
                                  className="p-3 space-y-1 block leading-none no-underline outline-none"
                                  to={item.to}
                                >
                                  <span className="text-sm font-medium leading-none">
                                    {item.name}
                                  </span>
                                  <p className="text-sm leading-snug text-muted-foreground">
                                    {item.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </NavigationMenuItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link to={menu.to} className={navigationMenuTriggerStyle()}>
                      {menu.name}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-2">
        {isLoggedIn && (
          <>
            <Button
              size="icon"
              variant="ghost"
              asChild
              className="relative lg:hidden"
            >
              <Link to="/my/notifications">
                <BellIcon className="size-4" />
                {hasNotifications && (
                  <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
                )}
              </Link>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              asChild
              className="relative lg:hidden"
            >
              <Link to="/my/messages">
                <MessageCircleIcon className="size-4" />
                {hasMessages && (
                  <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
                )}
              </Link>
            </Button>
          </>
        )}

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="lg:hidden">
              <MenuIcon className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-left">메뉴</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {menus.map((menu) => (
                <div key={menu.name}>
                  {menu.items ? (
                    <div>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-4 h-auto"
                        onClick={() => toggleSubmenu(menu.name)}
                      >
                        <Link to={menu.to} className="flex-1 text-left">
                          {menu.name}
                        </Link>
                        <ChevronRightIcon
                          className={cn(
                            "size-4 transition-transform",
                            openSubmenu === menu.name && "rotate-90"
                          )}
                        />
                      </Button>
                      {openSubmenu === menu.name && (
                        <div className="pl-4 space-y-2">
                          {menu.items.map((item) => (
                            <Link
                              key={item.name}
                              to={item.to}
                              className="block p-3 rounded-md hover:bg-accent transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="font-medium text-sm">
                                {item.name}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {item.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={menu.to}
                      className="block p-4 rounded-md hover:bg-accent transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {menu.name}
                    </Link>
                  )}
                </div>
              ))}

              <Separator className="my-4" />

              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/pjh5474.png" />
                      <AvatarFallback>N</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Jane Doe</div>
                      <div className="text-sm text-muted-foreground">
                        @username
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/my/dashboard"
                    className="flex items-center gap-3 p-4 rounded-md hover:bg-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BarChart3Icon className="size-4" />
                    Dashboard
                  </Link>
                  <Link
                    to="/my/profile"
                    className="flex items-center gap-3 p-4 rounded-md hover:bg-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserIcon className="size-4" />
                    Profile
                  </Link>
                  <Link
                    to="/my/settings"
                    className="flex items-center gap-3 p-4 rounded-md hover:bg-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <SettingsIcon className="size-4" />
                    Settings
                  </Link>
                  <Link
                    to="/auth/logout"
                    className="flex items-center gap-3 p-4 rounded-md hover:bg-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogOutIcon className="size-4" />
                    Logout
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button variant="secondary" asChild className="w-full">
                    <Link
                      to="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link
                      to="/auth/join"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Join
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop User Menu */}
      {isLoggedIn ? (
        <div className="hidden lg:flex items-center gap-2">
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/notifications">
              <BellIcon className="size-4" />
              {hasNotifications && (
                <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
              )}
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/messages">
              <MessageCircleIcon className="size-4" />
              {hasMessages && (
                <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
              )}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/pjh5474.png" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-medium">Jane Doe</span>
                <span className="text-xs text-muted-foreground">@username</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/dashboard">
                    <BarChart3Icon className="size-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/profile">
                    <UserIcon className="size-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/settings">
                    <SettingsIcon className="size-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/auth/logout">
                  <LogOutIcon className="size-4 mr-2" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="secondary" asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/join">Join</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
