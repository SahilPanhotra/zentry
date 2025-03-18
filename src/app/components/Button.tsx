import React from 'react'

const Button = ({ id, title, leftIcon ,rightIcon, containerClass, textClass, onClick }: { id: string, title: string, leftIcon?: React.ReactNode, rightIcon?: React.ReactNode, containerClass?: string, textClass?: string, onClick?: () => void }) => {
    return (
        <button id={id} className={`${containerClass} group realtive z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black`} onClick={onClick}>
            {leftIcon}
            <span className={`${textClass} relative inline-flex overflow-hidden font-general text-xs uppercase`}>
                <div>

                {title}
                </div>
            </span>
            {rightIcon}
        </button>
    )
}

export default Button