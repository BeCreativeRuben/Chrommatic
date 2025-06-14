function Hero() {
    return (
        <div className="h-[80vh] flex flex-col justify-center items-center text-center">
            <img
                src="/images/logo.jpg"
                alt="Chromattic logo"
                className="w-72 h-auto mb-6"
            />
            <h1 className="text-5xl font-bold">CHROMATTIC</h1>
        </div>
    );
}

export default Hero;
