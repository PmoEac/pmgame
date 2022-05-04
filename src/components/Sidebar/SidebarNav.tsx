import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiFileList3Line, RiGift2Line, RiGitMergeLine, RiInputMethodLine, RiMedalLine } from "react-icons/ri"
;
import useSWR from "swr";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";



export function SidebarNav() {
  const fetcher = (url) => fetch(url).then((r) => r.json());

const { data: user, mutate: mutateUser } = useSWR('/api/user', fetcher);
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
        {user?.role == 'pmo' && <NavLink icon={RiContactsLine} href="/users">Usuários</NavLink>}
        {user?.role == 'pmo' && <NavLink icon={RiGift2Line} href="/rewards">Recompensas</NavLink>}
        {user?.role == 'pmo' && <NavLink icon={RiMedalLine} href="/badges">Conquistas</NavLink>}
        {user?.role == 'pmo' && <NavLink icon={RiFileList3Line} href="/tasks">Entregas</NavLink>}
      </NavSection>
      <NavSection title="AUTOMAÇÃO">
        <NavLink icon={RiInputMethodLine} href="/forms">Formulários</NavLink>
        <NavLink icon={RiGitMergeLine} href="/automation">Automação</NavLink>
      </NavSection>
    </Stack>
  );
}