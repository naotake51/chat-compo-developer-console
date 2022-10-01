import { useCallback, useState } from "react";

type UseModalParam = {
    beforeOpen?: () => void
    beforeClose?: () => void
}

export const useModal = function ({ beforeOpen, beforeClose }: UseModalParam) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const open = useCallback(() => {
        beforeOpen && beforeOpen()
        setIsOpen(true)
    }, [beforeOpen]);

    const close = useCallback(() => {
        beforeClose && beforeClose()
        setIsOpen(false)
    }, [beforeClose]);

    return { isOpen, open, close };
};

