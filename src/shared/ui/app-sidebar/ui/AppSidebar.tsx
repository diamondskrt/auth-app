import { Link } from 'react-router-dom'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/shared/ui/sidebar'
import { ThemeSwitcher } from '~/shared/ui/theme-switcher'
import { Typography } from '~/shared/ui/typography'

import { menuItems } from '../config'

import { Profile } from './Profile'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(({ link, label, Icon }) => (
                <SidebarMenuItem key={link}>
                  <SidebarMenuButton asChild>
                    {link ? (
                      <Link to={link}>
                        <Icon />
                        <Typography>{label}</Typography>
                      </Link>
                    ) : (
                      <Typography>{label}</Typography>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-2">
          <ThemeSwitcher />
          <Typography>Dark theme</Typography>
        </div>
        <Profile />
      </SidebarFooter>
    </Sidebar>
  )
}
