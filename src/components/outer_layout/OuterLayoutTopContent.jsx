import './OuterLayoutTopContent.css';

export default function OuterLayoutTopContent({children}) {
    return (
        <div className='outer-layout-top-component'>
            {children}
        </div>
    );
}