import { SidebarDesktop } from './desktop';
import { useMediaQuery } from 'usehooks-ts';
import { SidebarMobile } from './mobile';

export function Sidebar() {
    const isDesktop = useMediaQuery('(min-width: 640px)', {
        initializeWithValue: false,
    });

    if (isDesktop) {
        return <SidebarDesktop />;
    }

    return <SidebarMobile />;
}
