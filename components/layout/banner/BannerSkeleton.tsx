import Styles from './style.module.css';

const BannerSkeleton = () => {
    return (
        <div className={Styles.innerbanner_sec}>
            <div className="skeleton skeletonFill"></div>
        </div>
    )
}

export default BannerSkeleton
