import { useState } from "react";

const useListItem = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    return {
        openMenu,
        toggleMenu
    }
};

export default useListItem;