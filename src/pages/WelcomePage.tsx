import {useNavigate} from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
<div className="min-h-screen flex flex-col items-center justify-center gap-5">
    <h1 className="text-4xl font-bold text-center text-white">
        ادمین عزیز به پنل کارلینو خوش آمدی 👋🏼
    </h1>
    <p className="text-muted-foreground">
        برای ورود به پنل ابتدا وارد حساب کاربری خود شوید
    </p>
    <div className="flex gap-1">
        <button onClick={() => navigate('/login')}>
            ورود
        </button>
        <button onClick={() => navigate('/register')}>
            ثبت نام
        </button>
    </div>
</div>
    )
}
export default WelcomePage;