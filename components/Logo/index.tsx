import React from 'react'


const Logo: React.FC = () => {
    return <a className="flex items-center" href="/">
        <img src="/images/transparent-eric-profile.png" className="h-12 w-12 rounded-full" />
        <div className="hidden sm:block ml-2 text-lg font-bold">Eric Jiang</div>
    </a>
}

export default Logo