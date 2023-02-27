import './OuterLayout.css';

export default function OuterLayout({children}) {
    return (
        <div className="outer-layout">
            <div className="main-box">
                {children}
            </div>
        </div>
    );
}