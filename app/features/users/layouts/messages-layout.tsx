import { Outlet } from "react-router";
import { MessagesCard } from "~/features/users/components/messages-card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider,
} from "~/common/components/ui/sidebar";

export default function MessagesLayout() {
  return (
    <SidebarProvider className="max-h-[calc(100vh-14rem)] overflow-hidden h-full min-h-full">
      <Sidebar variant="floating" className="pt-16">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 20 }).map((_, index) => (
                <MessagesCard
                  key={`message-${index}`}
                  id={`message-${index}`}
                  avatarUrl="https://github.com/shadcn.png"
                  name="Nico"
                  lastMessage="Last Message"
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="h-full flex-1 ">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
