export default function Hero() {
    return (<main>
        <div className="pt-10 bg-special-blue sm:pt-16 lg:pt-8 lg:pb-0 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                    <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                        <div className="lg:py-24">
                            <h1 className="mt-4 text-lg tracking-tight font-extrabold text-blue-400 sm:mt-5 sm:text-2xl lg:mt-6 xl:text-4xl">
                                <span className="block">G'day I'm [name]</span>
                                <span className="block text-indigo-600">& I'm a [blah] at [company]</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-lg">
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt
                                amet fugiat veniam occaecat fugiat.
                            </p>
                        </div>
                    </div>
                    <div className="mt-12 mb-0 sm:-mb-48 lg:m-0 lg:relative">
                        <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                            {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                            <img
                                className="w-1/2 lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                src="/images/trasnparent-profile-eric.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}