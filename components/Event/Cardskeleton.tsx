import Styles from "./style.module.css";
const Cardskeleton = () => {
    return (
        <div className={Styles.evlsbx}>
            <div className={Styles.evlsimg}>
                <div className="skeleton skeletonFill"></div>
            </div>
            <div className={Styles.evlstbx}>
                <div className={`skeleton w-100 mb-2 ${Styles.skeletonTitle}`}></div>
                <div className={`skeleton w-75 mb-3 ${Styles.skeletonTitle}`}></div>
                <div className={Styles.evlspara}>
                    <div className="skeleton skeletonText w-100 mb-2"></div>
                    <div className="skeleton skeletonText"></div>
                </div>
                <div className={Styles.evlsbtn}>
                    <div className={`skeleton ${Styles.skeletonBtn}`}></div>
                </div>
            </div>
        </div>
    )
}

export default Cardskeleton
