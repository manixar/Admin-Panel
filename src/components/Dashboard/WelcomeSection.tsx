export const WelcomeSection = () => {
    return (
        <div className="bg-gradient-primary rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
                <h1 className="text-center text-3xl font-bold mb-2">welcome</h1>
                <p className="text-center text-white/90 text-lg">
ادمین کارلینو                </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/20 -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-white/15 translate-y-24 translate-x-24"></div>
        </div>
    );
};
